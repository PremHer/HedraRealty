import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiDownloadCloud,
  FiEdit3,
  FiFileText,
  FiGrid,
  FiHash,
  FiLayers,
  FiMap,
  FiDollarSign,
  FiMapPin,
  FiPlus,
  FiMove,
  FiSearch,
  FiTool,
  FiTrash,
  FiTrendingUp,
  FiUser,
  FiX
} from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { projects } from '../../mocks/data';
import type { ProjectTimelineStatus, ProjectUpdate, ProjectDetail } from '../../mocks/projectDetails';
import { projectDetails } from '../../mocks/projectDetails';

import styles from './ProjectDetailPage.module.css';

type DetailTab = 'overview' | 'blocks' | 'sales' | 'documents' | 'blueprint';

type BlockEntry = ProjectDetail['blocks'][number];

type BlockLot = {
  id: string;
  price: number;
  measurements: { frente: number; fondo: number; izquierda: number; derecha: number };
  boundaries: { frente: string; fondo: string; izquierda: string; derecha: string };
  coordinates: string;
  area: number;
};

type BlockWithLots = BlockEntry & {
  lotsDetails: BlockLot[];
};

type LotFormData = {
  price: string;
  measurements: { frente: string; fondo: string; izquierda: string; derecha: string };
  boundaries: { frente: string; fondo: string; izquierda: string; derecha: string };
  coordinates: string;
};

const emptyLotForm: LotFormData = {
  price: "",
  measurements: { frente: "", fondo: "", izquierda: "", derecha: "" },
  boundaries: { frente: "", fondo: "", izquierda: "", derecha: "" },
  coordinates: ""
};

const calculateLotArea = (data: LotFormData): number => {
  const frente = Number.parseFloat(data.measurements.frente);
  const fondo = Number.parseFloat(data.measurements.fondo);
  const izquierda = Number.parseFloat(data.measurements.izquierda);
  const derecha = Number.parseFloat(data.measurements.derecha);
  const hasHorizontal = Number.isFinite(frente) && Number.isFinite(fondo);
  const hasVertical = Number.isFinite(izquierda) && Number.isFinite(derecha);
  if (!hasHorizontal || !hasVertical) {
    return 0;
  }
  const promedioHorizontal = (frente + fondo) / 2;
  const promedioVertical = (izquierda + derecha) / 2;
  const area = promedioHorizontal * promedioVertical;
  return Number.isFinite(area) ? Number(area) : 0;
};




const tabs: { id: DetailTab; label: string }[] = [
  { id: 'overview', label: 'Resumen' },
  { id: 'blocks', label: 'Manzanas y lotes' },
  { id: 'sales', label: 'Ventas' },
  { id: 'documents', label: 'Documentacion' },
  { id: 'blueprint', label: 'Plano del proyecto' }
];

const timelineTone: Record<ProjectTimelineStatus, 'success' | 'warning' | 'info'> = {
  completed: 'success',
  inProgress: 'warning',
  planned: 'info'
};

const timelineLabel: Record<ProjectTimelineStatus, string> = {
  completed: 'Completado',
  inProgress: 'En curso',
  planned: 'Planificado'
};

const updateTone: Record<ProjectUpdate['category'], 'success' | 'warning' | 'info'> = {
  obra: 'info',
  comercial: 'success',
  legal: 'warning'
};

const updateCategoryLabel: Record<ProjectUpdate['category'], string> = {
  obra: 'Obra',
  comercial: 'Comercial',
  legal: 'Legal'
};

const lotStatusTone = {
  available: 'success',
  reserved: 'warning',
  sold: 'info'
} as const;

const lotStatusLabel = {
  available: 'Disponible',
  reserved: 'Reservado',
  sold: 'Vendido'
} as const;

const sanitizeBlockName = (name: string, fallbackIndex: number) => {
  const cleaned = name.replace(/[^A-Za-z]/g, '').toUpperCase();
  if (cleaned.length > 0) {
    return cleaned;
  }
  return indexToBlockName(fallbackIndex);
};

const blockNameToIndex = (name: string): number => {
  const letters = name.toUpperCase();
  let value = 0;
  for (let i = 0; i < letters.length; i += 1) {
    const charCode = letters.charCodeAt(i);
    if (charCode < 65 || charCode > 90) {
      continue;
    }
    value = value * 26 + (charCode - 64);
  }
  return value - 1;
};

const indexToBlockName = (index: number): string => {
  let value = index;
  let result = '';
  while (value >= 0) {
    const remainder = value % 26;
    result = String.fromCharCode(65 + remainder) + result;
    value = Math.floor(value / 26) - 1;
  }
  return result;
};

const normalizeBlocks = (blocks: ProjectDetail['blocks']): BlockWithLots[] => {
  return blocks
    .map((block, idx) => {
      const normalizedName = sanitizeBlockName(block.name, idx);
      return {
        ...block,
        id: block.id ?? `block-${normalizedName.toLowerCase()}`,
        name: normalizedName,
        lotsDetails: [],
      };
    })
    .sort((a, b) => blockNameToIndex(a.name) - blockNameToIndex(b.name));
};

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [blocksState, setBlocksState] = useState<BlockWithLots[]>([]);
  const [deletedBlocks, setDeletedBlocks] = useState<string[]>([]);
  const [addMode, setAddMode] = useState<'sequence' | 'reuse'>('sequence');
  const [activeLotForm, setActiveLotForm] = useState<string | null>(null);
  const [lotForm, setLotForm] = useState<LotFormData>(emptyLotForm);
  const [isAddingBlocks, setIsAddingBlocks] = useState(false);
  const [blocksQuantity, setBlocksQuantity] = useState(1);

  const project = useMemo(() => projects.find((item) => item.id === projectId), [projectId]);
  const detail = projectId ? projectDetails[projectId] : undefined;

  useEffect(() => {
    if (detail) {
      setBlocksState(normalizeBlocks(detail.blocks));
      setDeletedBlocks([]);
      setAddMode('sequence');
      setIsAddingBlocks(false);
      setBlocksQuantity(1);
    }
  }, [detail]);

  useEffect(() => {
    if (deletedBlocks.length === 0 && addMode === 'reuse') {
      setAddMode('sequence');
    }
  }, [deletedBlocks, addMode]);

  if (!project || !detail) {
    return (
      <div className={styles.wrapper}>
        <button type='button' className={styles.backButton} onClick={() => navigate('/projects')}>
          <FiArrowLeft />
          Volver al listado
        </button>

        <div className={styles.emptyState}>
          <h3>No encontramos el proyecto</h3>
          <p>Verifica el enlace o selecciona un registro disponible en la lista de proyectos.</p>
          <button type='button' className={styles.primaryAction} onClick={() => navigate('/projects')}>
            Ir a proyectos
          </button>
        </div>
      </div>
    );
  }

  const salesProgress = Math.round(project.progressSales * 100);
  const worksProgress = Math.round(project.progressWorks * 100);
  const soldLots = detail.inventory.sold;
  const reservedLots = detail.inventory.reserved;
  const availableLots = detail.inventory.available;
  const totalLots = project.lotsTotal;
  const soldPercentage = Math.round((soldLots / totalLots) * 100);
  const salesLead = detail.team.find((member) => member.role.toLowerCase().includes('comercial'))?.name ?? project.manager;
  const supervisor = detail.team.find((member) => member.role.toLowerCase().includes('obra'))?.name ?? project.manager;
  const sortedDeletedNames = useMemo(
    () => [...deletedBlocks].sort((a, b) => blockNameToIndex(a) - blockNameToIndex(b)),
    [deletedBlocks]
  );
  const reusePreview = sortedDeletedNames.slice(0, blocksQuantity).join(', ');
  const highestExistingIndex = useMemo(
    () => blocksState.reduce((max, block) => Math.max(max, blockNameToIndex(block.name)), -1),
    [blocksState]
  );
  const nextSequenceName = indexToBlockName(Math.max(0, highestExistingIndex + 1));

  const handleStartAddBlocks = () => {
    setBlocksQuantity(1);
    setAddMode(deletedBlocks.length > 0 ? 'reuse' : 'sequence');
    setIsAddingBlocks(true);
  };

  const handleCancelAddBlocks = () => {
    setIsAddingBlocks(false);
    setBlocksQuantity(1);
    setAddMode(deletedBlocks.length > 0 ? 'reuse' : 'sequence');
  };

  const handleConfirmAddBlocks = () => {
    if (blocksQuantity < 1) {
      return;
    }

    const sortedDeleted = [...deletedBlocks].sort((a, b) => blockNameToIndex(a) - blockNameToIndex(b));
    const effectiveMode = sortedDeleted.length === 0 ? 'sequence' : addMode;
    const reuseCount = effectiveMode === 'reuse' ? Math.min(blocksQuantity, sortedDeleted.length) : 0;
    const reuseNames = sortedDeleted.slice(0, reuseCount);
    const remainingCount = Math.max(0, blocksQuantity - reuseCount);

    setBlocksState((current) => {
      const sorted = [...current].sort((a, b) => blockNameToIndex(a.name) - blockNameToIndex(b.name));
      const usedIds = new Set(sorted.map((block) => block.id));
      const usedNames = new Set(sorted.map((block) => block.name));
      let highestIndex = sorted.reduce((max, block) => {
        const blockIndex = blockNameToIndex(block.name);
        return blockIndex > max ? blockIndex : max;
      }, -1);

      const newBlocks: BlockWithLots[] = [];

      reuseNames.forEach((name) => {
        let candidateId = `block-${name.toLowerCase()}`;
        let counter = 1;
        while (usedIds.has(candidateId)) {
          candidateId = `block-${name.toLowerCase()}-${counter}`;
          counter += 1;
        }
        usedIds.add(candidateId);
        usedNames.add(name);
        highestIndex = Math.max(highestIndex, blockNameToIndex(name));
        newBlocks.push({
          id: candidateId,
          name,
          lots: { total: 0, available: 0, reserved: 0, sold: 0 },
          progress: 0,
          lotsDetails: [],
        });
      });

      for (let position = 0; position < remainingCount; position += 1) {
        let nextIndex = highestIndex + 1;
        let name = indexToBlockName(nextIndex);
        while (usedNames.has(name)) {
          nextIndex += 1;
          name = indexToBlockName(nextIndex);
        }
        highestIndex = blockNameToIndex(name);
        let candidateId = `block-${name.toLowerCase()}`;
        let counter = 1;
        while (usedIds.has(candidateId)) {
          candidateId = `block-${name.toLowerCase()}-${counter}`;
          counter += 1;
        }
        usedIds.add(candidateId);
        usedNames.add(name);
        newBlocks.push({
          id: candidateId,
          name,
          lots: { total: 0, available: 0, reserved: 0, sold: 0 },
          progress: 0,
          lotsDetails: [],
        });
      }

      const updated = [...sorted, ...newBlocks];
      return updated.sort((a, b) => blockNameToIndex(a.name) - blockNameToIndex(b.name));
    });

    const remainingDeleted = sortedDeleted.slice(reuseCount);
    setDeletedBlocks(remainingDeleted);
    setBlocksQuantity(1);
    setIsAddingBlocks(false);
    setAddMode(remainingDeleted.length > 0 ? 'reuse' : 'sequence');
    setActiveLotForm(null);
    setLotForm(emptyLotForm);
  };

  const handleDeleteBlock = (blockId: string) => {
    const target = blocksState.find((block) => block.id === blockId);
    if (!target) {
      return;
    }

    const confirmMessage = `Eliminar manzana ${target.name}?`;
    if (typeof window !== 'undefined' && !window.confirm(confirmMessage)) {
      return;
    }

    setBlocksState((current) => current.filter((block) => block.id !== blockId));
    if (activeLotForm === blockId) {
      setActiveLotForm(null);
      setLotForm(emptyLotForm);
    }
    setDeletedBlocks((current) => {
      if (current.includes(target.name)) {
        return current;
      }
      const next = [...current, target.name];
      return next.sort((a, b) => blockNameToIndex(a) - blockNameToIndex(b));
    });
  };

  const handleOpenLotForm = (blockId: string) => {
    setActiveLotForm(blockId);
    setLotForm(emptyLotForm);
  };

  const handleCancelLotForm = () => {
    setActiveLotForm(null);
    setLotForm(emptyLotForm);
  };

  const handleLotMeasurementChange = (key: keyof LotFormData['measurements'], value: string) => {
    setLotForm((current) => ({
      ...current,
      measurements: { ...current.measurements, [key]: value },
    }));
  };

  const handleLotBoundaryChange = (key: keyof LotFormData['boundaries'], value: string) => {
    setLotForm((current) => ({
      ...current,
      boundaries: { ...current.boundaries, [key]: value },
    }));
  };

  const handleLotBaseChange = (value: Partial<Pick<LotFormData, 'price' | 'coordinates'>>) => {
    setLotForm((current) => ({ ...current, ...value }));
  };

  const lotArea = useMemo(() => calculateLotArea(lotForm), [lotForm]);

  const handleSubmitLot = (event: FormEvent<HTMLFormElement>, blockId: string) => {
    event.preventDefault();
    const targetBlock = blocksState.find((block) => block.id === blockId);
    if (!targetBlock) {
      return;
    }

    const priceValue = Number.parseFloat(lotForm.price);
    const frente = Number.parseFloat(lotForm.measurements.frente);
    const fondo = Number.parseFloat(lotForm.measurements.fondo);
    const izquierda = Number.parseFloat(lotForm.measurements.izquierda);
    const derecha = Number.parseFloat(lotForm.measurements.derecha);

    if (!Number.isFinite(priceValue) || priceValue <= 0 || lotArea <= 0) {
      return;
    }

    const newLot: BlockLot = {
      id: `${blockId}-lot-${targetBlock.lotsDetails.length + 1}`,
      price: priceValue,
      measurements: {
        frente: Number.isFinite(frente) ? frente : 0,
        fondo: Number.isFinite(fondo) ? fondo : 0,
        izquierda: Number.isFinite(izquierda) ? izquierda : 0,
        derecha: Number.isFinite(derecha) ? derecha : 0,
      },
      boundaries: lotForm.boundaries,
      coordinates: lotForm.coordinates,
      area: Number(lotArea.toFixed(2)),
    };

    setBlocksState((current) =>
      current.map((block) => {
        if (block.id !== blockId) {
          return block;
        }
        return {
          ...block,
          lots: {
            ...block.lots,
            total: block.lots.total + 1,
            available: block.lots.available + 1,
          },
          lotsDetails: [...block.lotsDetails, newLot],
        };
      })
    );
    setActiveLotForm(null);
    setLotForm(emptyLotForm);
  };

  return (
    <div className={styles.wrapper}>
      <button type='button' className={styles.backButton} onClick={() => navigate(-1)}>
        <FiArrowLeft />
        Volver
      </button>

      <PageHeader
        title={project.name}
        subtitle={`${project.location} - ${detail.launchDate}`}
        actions={
          <div className={styles.headerActions}>
            <button type='button' className={styles.secondaryAction} aria-label='Descargar ficha del proyecto'>
              <FiDownloadCloud />
              Descargar ficha
            </button>
            <button type='button' className={styles.primaryAction} aria-label='Editar informacion del proyecto'>
              <FiEdit3 />
              Editar
            </button>
          </div>
        }
      />

      <div className={styles.metaRow}>
        <StatusBadge label={project.status} />
        <div className={styles.metaItem}>
          <FiUser />
          {project.manager}
        </div>
        <div className={styles.metaItem}>
          <FiMapPin />
          {project.stage}
        </div>
        <div className={styles.metaItem}>
          <FiCalendar />
          Entrega estimada: {detail.estimatedDelivery}
        </div>
      </div>

      <div className={styles.tabs} role='tablist'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type='button'
            role='tab'
            aria-selected={activeTab === tab.id}
            className={[styles.tabButton, activeTab === tab.id ? styles.tabButtonActive : undefined]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <section className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <header>
                <div className={styles.summaryIcon}>
                  <FiTrendingUp />
                </div>
                <div>
                  <span className={styles.summaryLabel}>Avance comercial</span>
                  <strong>{salesProgress}%</strong>
                </div>
              </header>
              <div className={styles.progress} aria-hidden='true'>
                <div className={styles.progressValue} style={{ width: `${salesProgress}%` }} />
              </div>
              <small>Lead comercial: {salesLead}</small>
            </article>

            <article className={styles.summaryCard}>
              <header>
                <div className={styles.summaryIcon}>
                  <FiTool />
                </div>
                <div>
                  <span className={styles.summaryLabel}>Avance de obra</span>
                  <strong>{worksProgress}%</strong>
                </div>
              </header>
              <div className={styles.progress} aria-hidden='true'>
                <div className={styles.progressValue} style={{ width: `${worksProgress}%` }} />
              </div>
              <small>Supervisor responsable: {supervisor}</small>
            </article>

            <article className={styles.summaryCard}>
              <header>
                <div className={styles.summaryIcon}>
                  <FiGrid />
                </div>
                <div>
                  <span className={styles.summaryLabel}>Inventario</span>
                  <strong>{soldPercentage}% vendido</strong>
                </div>
              </header>
              <div className={styles.inventoryBreakdown}>
                <div>
                  <span>Disponibles</span>
                  <strong>{availableLots}</strong>
                </div>
                <div>
                  <span>Reservados</span>
                  <strong>{reservedLots}</strong>
                </div>
                <div>
                  <span>Vendidos</span>
                  <strong>{soldLots}</strong>
                </div>
              </div>
              <small>Total lotes: {totalLots}</small>
            </article>
          </section>

          <div className={styles.layout}>
            <div className={styles.mainColumn}>
              <article className='card'>
                <h3>Sobre el proyecto</h3>
                <p className={styles.paragraph}>{detail.description}</p>
                <div className={styles.tags}>
                  {detail.tags.map((tag) => (
                    <span key={tag} className='chip'>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.highlights}>
                  {detail.highlights.map((highlight) => (
                    <div key={highlight.label} className={styles.highlightItem}>
                      <span>{highlight.label}</span>
                      <strong>{highlight.value}</strong>
                      {highlight.helper && <small>{highlight.helper}</small>}
                    </div>
                  ))}
                </div>
              </article>

              <article className='card'>
                <h3>Linea de tiempo</h3>
                <ul className={styles.timeline}>
                  {detail.timeline.map((item) => (
                    <li key={item.id} className={styles.timelineItem}>
                      <div className={styles.timelineMarker} data-status={item.status} />
                      <div className={styles.timelineBody}>
                        <div className={styles.timelineHeader}>
                          <span className={styles.timelineTitle}>{item.title}</span>
                          <StatusBadge label={timelineLabel[item.status]} status={timelineTone[item.status]} />
                        </div>
                        <div className={styles.timelineMeta}>
                          <span>
                            <FiCalendar /> {item.date}
                          </span>
                          {item.owner && (
                            <span>
                              <FiUser /> {item.owner}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>

              <article className='card'>
                <h3>Actualizaciones recientes</h3>
                <ul className={styles.updates}>
                  {detail.updates.map((update) => (
                    <li key={update.id} className={styles.updateItem}>
                      <div className={styles.updateHeader}>
                        <StatusBadge label={updateCategoryLabel[update.category]} status={updateTone[update.category]} />
                        <span>{update.date}</span>
                      </div>
                      <p>{update.summary}</p>
                      <small>{update.owner}</small>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <aside className={styles.sidebar}>
              <article className='card'>
                <h3>Desempeno comercial</h3>
                <ul className={styles.list}>
                  {detail.salesBreakdown.map((item) => (
                    <li key={item.label}>
                      <div>
                        <span className={styles.listLabel}>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                      {item.helper && <small>{item.helper}</small>}
                    </li>
                  ))}
                </ul>
              </article>

              <article className='card'>
                <h3>Equipo responsable</h3>
                <ul className={styles.list}>
                  {detail.team.map((member) => (
                    <li key={member.role}>
                      <div>
                        <span className={styles.listLabel}>{member.role}</span>
                        <strong>{member.name}</strong>
                      </div>
                      {member.contact && <small>{member.contact}</small>}
                    </li>
                  ))}
                </ul>
              </article>

              <article className='card'>
                <h3>Documentos clave</h3>
                <ul className={styles.documents}>
                  {detail.documents.map((document) => (
                    <li key={document.id}>
                      <div className={styles.documentIcon}>
                        <FiFileText />
                      </div>
                      <div>
                        <span className={styles.documentName}>{document.name}</span>
                        <small>Actualizado: {document.updatedAt}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </aside>
          </div>
        </>
      )}

      {activeTab === 'blocks' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionHeader}>
            <div>
              <h3>Gestion de manzanas y lotes</h3>
              <p>Monitorea disponibilidad y avance fisico por manzana.</p>
            </div>
            <div className={styles.tabActions}>
              {isAddingBlocks ? (
                <div className={styles.inlineForm}>
                  <div className={styles.inlineField}>
                    <label htmlFor='new-blocks-quantity'>Cantidad</label>
                    <input
                      id='new-blocks-quantity'
                      type='number'
                      min={1}
                      value={blocksQuantity}
                      onChange={(event) => {
                        const value = Number.parseInt(event.target.value, 10);
                        setBlocksQuantity(Number.isNaN(value) ? 1 : Math.max(1, value));
                      }}
                    />
                  </div>
                  {sortedDeletedNames.length > 0 ? (
                    <div className={styles.inlineField}>
                      <span>Orden</span>
                      <div className={styles.radioGroup}>
                        <label className={styles.radioOption}>
                          <input
                            type='radio'
                            name='block-add-mode'
                            value='reuse'
                            checked={addMode === 'reuse'}
                            onChange={() => setAddMode('reuse')}
                          />
                          Reutilizar{reusePreview ? ` (${reusePreview})` : ''}
                        </label>
                        <label className={styles.radioOption}>
                          <input
                            type='radio'
                            name='block-add-mode'
                            value='sequence'
                            checked={addMode === 'sequence'}
                            onChange={() => setAddMode('sequence')}
                          />
                          Continuar con {nextSequenceName}
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.inlineField}>
                      <span>Orden</span>
                      <p className={styles.inlineHint}>Se continuara con la siguiente manzana disponible.</p>
                    </div>
                  )}
                  <div className={styles.inlineFormActions}>
                    <button type='button' className={styles.secondaryAction} onClick={handleCancelAddBlocks}>
                      Cancelar
                    </button>
                    <button
                      type='button'
                      className={styles.primaryAction}
                      onClick={handleConfirmAddBlocks}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              ) : (
                <button type='button' className={styles.secondaryAction} onClick={handleStartAddBlocks}>
                  <FiLayers />
                  Registrar manzanas
                </button>
              )}
            </div>
          </div>

          <div className={styles.blocksGrid}>
            {blocksState.map((block) => {
              const availability = block.lots.total > 0
                ? Math.round((block.lots.available / block.lots.total) * 100)
                : 0;
              const progressTone = block.progress >= 70 ? 'success' : block.progress >= 40 ? 'warning' : 'info';

              const blockMetrics = [
                { label: 'Total', value: block.lots.total },
                { label: 'Disponibles', value: block.lots.available },
                { label: 'Reservados', value: block.lots.reserved },
                { label: 'Vendidos', value: block.lots.sold }
              ];
              const nextLotNumber = block.lotsDetails.length + 1;
              const measurementFields: Array<{ key: keyof LotFormData['measurements']; label: string }> = [
                { key: 'frente', label: 'Frente' },
                { key: 'fondo', label: 'Fondo' },
                { key: 'izquierda', label: 'Izquierda' },
                { key: 'derecha', label: 'Derecha' }
              ];
              const boundaryFields: Array<{ key: keyof LotFormData['boundaries']; label: string }> = [
                { key: 'frente', label: 'Frente' },
                { key: 'fondo', label: 'Fondo' },
                { key: 'izquierda', label: 'Izquierda' },
                { key: 'derecha', label: 'Derecha' }
              ];
              return (

                <article key={block.id} className={[styles.blockCard, 'card'].join(' ')}>
                  <header className={styles.blockHeader}>
                    <div className={styles.blockTitleGroup}>
                      <div className={styles.blockTitle}>
                        <div className={styles.blockTitleRow}>
                          <span className={styles.blockLabel}>Manzana</span>
                          <strong>{block.name}</strong>
                          <ul className={styles.blockSummaryInline}>
                            {blockMetrics.map((metric) => (
                              <li key={metric.label}>
                                <span>{metric.label}</span>
                                <strong>{metric.value}</strong>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {block.nextRelease && <span className={styles.blockNote}>{block.nextRelease}</span>}
                    </div>
                    <div className={styles.blockTagGroup}>
                      <StatusBadge label={`Avance ${block.progress}%`} status={progressTone} />
                      <span className={styles.blockAvailability}>Disponibilidad {availability}%</span>
                      <button
                        type='button'
                        className={styles.blockAction}
                        onClick={() => handleOpenLotForm(block.id)}
                        disabled={activeLotForm === block.id}
                      >
                        <FiPlus /> Registrar lote
                      </button>
                      <button
                        type='button'
                        className={styles.blockDelete}
                        onClick={() => handleDeleteBlock(block.id)}
                        aria-label={`Eliminar manzana ${block.name}`}
                      >
                        <FiTrash />
                      </button>
                    </div>
                  </header>

                  <div className={styles.blockProgress} aria-hidden='true'>
                    <div className={styles.blockProgressValue} style={{ width: `${block.progress}%` }} />
                  </div>

                  <div className={styles.blockBody}>
                    <div
                      className={[
                        styles.blockMain,
                        activeLotForm === block.id ? styles.blockMainCompressed : undefined
                      ].filter(Boolean).join(' ')}
                    >
                      {block.lotsDetails.length > 0 ? (
                        <div className={styles.lotTableWrapper}>
                          <table className={styles.lotTable}>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Precio</th>
                                <th>Area (m2)</th>
                                <th>Medidas (m)</th>
                                <th>Linderos</th>
                                <th>Coordenadas</th>
                              </tr>
                            </thead>
                            <tbody>
                              {block.lotsDetails.map((lot, index) => (
                                <tr key={lot.id}>
                                  <td>{index + 1}</td>
                                  <td>{lot.price.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</td>
                                  <td>{lot.area.toFixed(2)}</td>
                                  <td>{`Fr ${lot.measurements.frente} / Fo ${lot.measurements.fondo} / Iz ${lot.measurements.izquierda} / De ${lot.measurements.derecha}`}</td>
                                  <td>{`Fr ${lot.boundaries.frente || '-'} / Fo ${lot.boundaries.fondo || '-'} / Iz ${lot.boundaries.izquierda || '-'} / De ${lot.boundaries.derecha || '-'}`}</td>
                                  <td>{lot.coordinates || '-'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className={styles.blockEmpty}>
                          <span className={styles.blockEmptyTitle}>Sin lotes registrados</span>
                          <small>Usa 'Registrar lote' para agregar la primera unidad.</small>
                        </div>
                      )}
                    </div>
                    <aside
                      className={[
                        styles.lotDrawer,
                        activeLotForm === block.id ? styles.lotDrawerOpen : undefined
                      ].filter(Boolean).join(' ')}
                      aria-hidden={activeLotForm !== block.id}
                    >
                      {activeLotForm === block.id && (
                        <form
                          className={styles.lotForm}
                          onSubmit={(event) => handleSubmitLot(event, block.id)}
                        >
                          <div className={styles.lotFormHeader}>
                            <div className={styles.lotHeading}>
                              <h4>Registrar lote</h4>
                              <div className={styles.lotMeta}>
                                <span className={styles.lotMetaBadge}>Lote #{nextLotNumber}</span>
                                <span className={styles.lotMetaText}>Manzana {block.name}</span>
                              </div>
                            </div>
                            <button
                              type='button'
                              className={styles.lotClose}
                              onClick={handleCancelLotForm}
                              aria-label='Cerrar formulario'
                            >
                              <FiX />
                            </button>
                          </div>

                          <div className={styles.lotSection}>
                            <h5>Datos comerciales</h5>
                            <div className={styles.lotGrid}>
                              <div className={styles.lotField}>
                                <label className={styles.lotLabel} htmlFor={`lot-sequence-${block.id}`}>
                                  Numero de lote
                                </label>
                                <div className={[styles.lotInput, styles.lotInputReadonly].join(' ')}>
                                  <FiHash />
                                  <input
                                    id={`lot-sequence-${block.id}`}
                                    value={`#${nextLotNumber}`}
                                    readOnly
                                    aria-readonly='true'
                                  />
                                </div>
                                <small className={styles.lotHint}>Asignado en orden correlativo.</small>
                              </div>
                              <div className={styles.lotField}>
                                <label className={styles.lotLabel} htmlFor={`lot-price-${block.id}`}>
                                  Precio (S/)
                                </label>
                                <div className={styles.lotInput}>
                                  <FiDollarSign />
                                  <input
                                    id={`lot-price-${block.id}`}
                                    type='number'
                                    min={0}
                                    step='0.01'
                                    value={lotForm.price}
                                    onChange={(event) => handleLotBaseChange({ price: event.target.value })}
                                    required
                                  />
                                </div>
                              </div>
                              <div className={styles.lotField}>
                                <label className={styles.lotLabel} htmlFor={`lot-coordinates-${block.id}`}>
                                  Coordenadas
                                </label>
                                <div className={styles.lotInput}>
                                  <FiMapPin />
                                  <input
                                    id={`lot-coordinates-${block.id}`}
                                    value={lotForm.coordinates}
                                    onChange={(event) => handleLotBaseChange({ coordinates: event.target.value })}
                                    placeholder='Ej. UTM 123456 / 8456123'
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.lotSection}>
                            <h5>Medidas (m)</h5>
                            <div className={styles.lotHighlight}>
                              <span>Área calculada</span>
                              <strong>{lotArea > 0 ? lotArea.toFixed(2) : '0.00'} m2</strong>
                            </div>
                            <div className={styles.lotMeasurements}>
                              {measurementFields.map((field) => (
                                <div key={field.key} className={styles.lotField}>
                                  <label className={styles.lotLabel}>{field.label}</label>
                                  <div className={styles.lotInput}>
                                    <FiMove />
                                    <input
                                      type='number'
                                      min={0}
                                      step='0.01'
                                      value={lotForm.measurements[field.key]}
                                      onChange={(event) => handleLotMeasurementChange(field.key, event.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className={styles.lotSection}>
                            <h5>Linderos</h5>
                            <div className={styles.lotBoundaries}>
                              {boundaryFields.map((field) => (
                                <div key={field.key} className={styles.lotField}>
                                  <label className={styles.lotLabel}>{field.label}</label>
                                  <div className={styles.lotInput}>
                                    <input
                                      value={lotForm.boundaries[field.key]}
                                      onChange={(event) => handleLotBoundaryChange(field.key, event.target.value)}
                                      placeholder='Colinda con ...'
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className={styles.lotFooter}>
                            <div className={styles.lotActions}>
                              <button type='button' className={styles.secondaryAction} onClick={handleCancelLotForm}>
                                Cancelar
                              </button>
                              <button type='submit' className={styles.primaryAction} disabled={lotArea <= 0}>
                                Guardar lote
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </aside>
                  </div>
                </article>
              );
            })}
          </div>

          <div className='card'>
            <div className={styles.tableHeader}>
              <div>
                <h4>Inventario por tipologia</h4>
                <p>Detalle de lotes por tipo comercial y estado.</p>
              </div>
              <div className={styles.tableFilters}>
                <div className={styles.inputInline}>
                  <FiSearch />
                  <input type='search' placeholder='Buscar tipologia o estado' />
                </div>
                <button type='button' className={styles.secondaryAction}>
                  Exportar
                </button>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>Tipologia</th>
                    <th>Precio referencia</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.lotTypes.map((item) => (
                    <tr key={item.type}>
                      <td>{item.type}</td>
                      <td>{item.price}</td>
                      <td>{item.total}</td>
                      <td>
                        <StatusBadge label={lotStatusLabel[item.status]} status={lotStatusTone[item.status]} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sales' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionHeader}>
            <div>
              <h3>Control comercial</h3>
              <p>Embudo de ventas y proximas actividades del equipo.</p>
            </div>
            <div className={styles.tabActions}>
              <button type='button' className={styles.secondaryAction}>
                <FiDownloadCloud />
                Exportar reporte
              </button>
              <button type='button' className={styles.primaryAction}>
                <FiPlus />
                Nueva actividad
              </button>
            </div>
          </div>

          <div className={styles.funnelGrid}>
            {detail.salesFunnel.map((stage) => (
              <article key={stage.id} className='card'>
                <span className={styles.funnelStage}>{stage.stage}</span>
                <strong>{stage.count}</strong>
                <small>Conversion {stage.conversion}</small>
                {stage.helper && <p className={styles.paragraph}>{stage.helper}</p>}
              </article>
            ))}
          </div>

          <div className='card'>
            <div className={styles.tableHeader}>
              <div>
                <h4>Agenda de gestion</h4>
                <p>Tareas proximas por responsable.</p>
              </div>
              <button type='button' className={styles.secondaryAction}>
                <FiCalendar />
                Calendario
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>Actividad</th>
                    <th>Responsable</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.upcomingActions.map((action) => (
                    <tr key={action.id}>
                      <td>{action.title}</td>
                      <td>{action.owner}</td>
                      <td>{action.date}</td>
                      <td>
                        <StatusBadge
                          label={action.status === 'completed' ? 'Completado' : action.status === 'delayed' ? 'En riesgo' : 'Programado'}
                          status={action.status === 'completed' ? 'success' : action.status === 'delayed' ? 'warning' : 'info'}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionHeader}>
            <div>
              <h3>Documentacion del proyecto</h3>
              <p>Centraliza contratos, planos y reportes operativos.</p>
            </div>
            <div className={styles.tabActions}>
              <button type='button' className={styles.secondaryAction}>
                <FiSearch />
                Buscar
              </button>
              <button type='button' className={styles.primaryAction}>
                <FiPlus />
                Subir documento
              </button>
            </div>
          </div>

          <div className={styles.documentsLayout}>
            <article className='card'>
              <h4>Repositorio reciente</h4>
              <ul className={styles.documentsList}>
                {detail.documents.map((document) => (
                  <li key={document.id}>
                    <div className={styles.documentIcon}>
                      <FiFileText />
                    </div>
                    <div>
                      <span className={styles.documentName}>{document.name}</span>
                      <small>Actualizado: {document.updatedAt}</small>
                    </div>
                    <button type='button' className={styles.iconGhost} aria-label={`Descargar ${document.name}`}>
                      <FiDownloadCloud />
                    </button>
                  </li>
                ))}
              </ul>
            </article>

            <article className='card'>
              <h4>Carpetas operativas</h4>
              <div className={styles.folderGrid}>
                <button type='button' className={styles.folderCard}>
                  <FiTool />
                  Obra
                </button>
                <button type='button' className={styles.folderCard}>
                  <FiTrendingUp />
                  Comercial
                </button>
                <button type='button' className={styles.folderCard}>
                  <FiFileText />
                  Legal
                </button>
                <button type='button' className={styles.folderCard}>
                  <FiLayers />
                  Planos
                </button>
              </div>
            </article>
          </div>
        </div>
      )}

      {activeTab === 'blueprint' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionHeader}>
            <div>
              <h3>Plano maestro y avances</h3>
              <p>Version vigente del plano con notas y tareas pendientes.</p>
            </div>
            <div className={styles.tabActions}>
              <button type='button' className={styles.secondaryAction}>
                <FiDownloadCloud />
                Descargar plano
              </button>
              <button type='button' className={styles.primaryAction}>
                <FiPlus />
                Agregar marcador
              </button>
            </div>
          </div>

          <div className={styles.blueprintLayout}>
            <div className={styles.blueprintPreview}>
              <div className={styles.blueprintPlaceholder}>
                <FiMap />
                <span>Vista de plano interactivo</span>
              </div>
            </div>

            <aside className={styles.blueprintSide}>
              <article className='card'>
                <h4>{detail.blueprint.version}</h4>
                <p className={styles.paragraph}>Ultima actualizacion: {detail.blueprint.updatedAt}</p>
                <ul className={styles.notesList}>
                  {detail.blueprint.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </article>

              <article className='card'>
                <h4>Historial rapido</h4>
                <ul className={styles.notesList}>
                  {detail.timeline.slice(0, 3).map((item) => (
                    <li key={item.id}>
                      <strong>{item.date}:</strong> {item.title}
                    </li>
                  ))}
                </ul>
              </article>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}


