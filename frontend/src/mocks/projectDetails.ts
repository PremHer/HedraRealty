export type ProjectTimelineStatus = 'completed' | 'inProgress' | 'planned';

export type ProjectTimelineItem = {
  id: string;
  title: string;
  date: string;
  status: ProjectTimelineStatus;
  owner?: string;
};

export type ProjectHighlight = {
  label: string;
  value: string;
  helper?: string;
};

export type ProjectTeamMember = {
  role: string;
  name: string;
  contact?: string;
};

export type ProjectDocument = {
  id: string;
  name: string;
  updatedAt: string;
};

export type ProjectUpdate = {
  id: string;
  date: string;
  summary: string;
  owner: string;
  category: 'obra' | 'comercial' | 'legal';
};

export type ProjectBlockSummary = {
  id: string;
  name: string;
  lots: {
    total: number;
    available: number;
    reserved: number;
    sold: number;
  };
  progress: number;
  nextRelease?: string;
};

export type ProjectLotTypeBreakdown = {
  type: string;
  total: number;
  price: string;
  status: 'available' | 'reserved' | 'sold';
};

export type ProjectSalesStage = {
  id: string;
  stage: string;
  count: number;
  conversion: string;
  helper?: string;
};

export type ProjectActionItem = {
  id: string;
  title: string;
  owner: string;
  date: string;
  status: 'scheduled' | 'completed' | 'delayed';
};

export type ProjectBlueprintInfo = {
  version: string;
  updatedAt: string;
  notes: string[];
  downloadUrl?: string;
  preview?: string;
};

export interface ProjectDetail {
  launchDate: string;
  estimatedDelivery: string;
  description: string;
  tags: string[];
  highlights: ProjectHighlight[];
  inventory: {
    available: number;
    reserved: number;
    sold: number;
  };
  salesBreakdown: {
    label: string;
    value: string;
    helper?: string;
  }[];
  timeline: ProjectTimelineItem[];
  team: ProjectTeamMember[];
  documents: ProjectDocument[];
  updates: ProjectUpdate[];
  blocks: ProjectBlockSummary[];
  lotTypes: ProjectLotTypeBreakdown[];
  salesFunnel: ProjectSalesStage[];
  upcomingActions: ProjectActionItem[];
  blueprint: ProjectBlueprintInfo;
}

export const projectDetails: Record<string, ProjectDetail> = {
  'proj-luna-azul': {
    launchDate: 'Q2 2024',
    estimatedDelivery: 'Jun 2026',
    description:
      'Conjunto residencial orientado a familias que combina lotes unifamiliares con parque central y zona comercial ligera.',
    tags: ['Vivienda social', 'Etapa 2 activa', 'Financiamiento MiVivienda'],
    highlights: [
      { label: 'Ticket promedio', value: 'S/ 230,000', helper: 'Incluye acabados base' },
      { label: 'Precio m2', value: 'S/ 1,450' },
      { label: 'ROI proyectado', value: '18.5%' }
    ],
    inventory: {
      available: 128,
      reserved: 32,
      sold: 80
    },
    salesBreakdown: [
      { label: 'Separaciones vigentes', value: '48', helper: 'Pendientes de contrato en 15 dias' },
      { label: 'Reservas activas', value: '32', helper: '8 vencen esta semana' },
      { label: 'Creditos aprobados', value: '64', helper: '54 en proceso notarial' }
    ],
    timeline: [
      { id: 'tl-1', title: 'Habilitacion urbana completada', date: 'Jul 2024', status: 'completed', owner: 'Operaciones' },
      { id: 'tl-2', title: 'Entrega etapa 1', date: 'Mar 2025', status: 'completed', owner: 'Operaciones' },
      { id: 'tl-3', title: 'Inicio obra etapa 2', date: 'Nov 2025', status: 'inProgress', owner: 'Construccion' },
      { id: 'tl-4', title: 'Entrega total proyecto', date: 'Jun 2026', status: 'planned', owner: 'Operaciones' }
    ],
    team: [
      { role: 'Gerente de proyecto', name: 'Carolina Leon' },
      { role: 'Lider comercial', name: 'Franco Espinoza' },
      { role: 'Supervisor de obra', name: 'Luis Beltran' }
    ],
    documents: [
      { id: 'doc-1', name: 'Plan maestro actualizado', updatedAt: '12/09/2025' },
      { id: 'doc-2', name: 'Valorizacion obra septiembre', updatedAt: '24/09/2025' },
      { id: 'doc-3', name: 'Reporte comercial Q3', updatedAt: '05/09/2025' }
    ],
    updates: [
      {
        id: 'up-1',
        date: '25/09/2025',
        summary: 'Valorizacion No. 12 aprobada e ingresada a SAP.',
        owner: 'Construccion',
        category: 'obra'
      },
      {
        id: 'up-2',
        date: '22/09/2025',
        summary: 'Campana digital genero 40 leads calificados en la semana.',
        owner: 'Marketing',
        category: 'comercial'
      },
      {
        id: 'up-3',
        date: '18/09/2025',
        summary: 'Observaciones municipales levantadas para etapa 3.',
        owner: 'Legal',
        category: 'legal'
      }
    ],
    blocks: [
      {
        id: 'block-a',
        name: 'A',
        lots: { total: 60, available: 22, reserved: 18, sold: 20 },
        progress: 68,
        nextRelease: 'Entrega lotes A-40 al A-60 en nov'
      },
      {
        id: 'block-b',
        name: 'B',
        lots: { total: 58, available: 34, reserved: 10, sold: 14 },
        progress: 42
      },
      {
        id: 'block-c',
        name: 'C',
        lots: { total: 70, available: 44, reserved: 8, sold: 18 },
        progress: 55
      },
      {
        id: 'block-d',
        name: 'D',
        lots: { total: 52, available: 28, reserved: 12, sold: 12 },
        progress: 38,
        nextRelease: 'Habilitacion vial pendiente de aprobacion'
      }
    ],
    lotTypes: [
      { type: 'Residencial 120 m2', total: 80, price: 'S/ 198,000', status: 'available' },
      { type: 'Residencial 150 m2', total: 52, price: 'S/ 236,000', status: 'reserved' },
      { type: 'Comercial esquina', total: 8, price: 'S/ 320,000', status: 'sold' }
    ],
    salesFunnel: [
      { id: 'sf-1', stage: 'Leads calificados', count: 210, conversion: '100%', helper: 'Campanas digitales y referidos' },
      { id: 'sf-2', stage: 'Visitas agendadas', count: 94, conversion: '45%', helper: 'Fin de semana en sala de ventas' },
      { id: 'sf-3', stage: 'Separaciones', count: 48, conversion: '23%', helper: 'Validar financiamiento' },
      { id: 'sf-4', stage: 'Contratos firmados', count: 36, conversion: '17%', helper: 'Firma con notaria San Isidro' }
    ],
    upcomingActions: [
      { id: 'act-1', title: 'Actualizar planos de servicios basicos', owner: 'Operaciones', date: '04/10/2025', status: 'scheduled' },
      { id: 'act-2', title: 'Cierre convenios banca regional', owner: 'Comercial', date: '07/10/2025', status: 'scheduled' },
      { id: 'act-3', title: 'Entrega etapa 1 familias', owner: 'Postventa', date: '30/09/2025', status: 'completed' }
    ],
    blueprint: {
      version: 'Plano vial v3.2',
      updatedAt: '15/09/2025',
      notes: [
        'Se incorporan estacionamientos de visitas en manzana C.',
        'Remplazo de via secundaria por boulevard peatonal.',
        'Coordinacion con proveedores de alumbrado en curso.'
      ],
      downloadUrl: '#'
    }
  },
  'proj-sol-andino': {
    launchDate: 'Q4 2025',
    estimatedDelivery: 'Dic 2027',
    description:
      'Proyecto eco-turistico con lotes semiurbanos cerca del Valle Sagrado pensado para segunda vivienda y alquiler vacacional.',
    tags: ['Planificacion', 'Lotes premium', 'Componentes sostenibles'],
    highlights: [
      { label: 'Ticket promedio', value: 'S/ 310,000' },
      { label: 'Inversion inicial', value: 'S/ 42 MM' },
      { label: 'Cierres comprometidos', value: '28 preventas' }
    ],
    inventory: {
      available: 168,
      reserved: 12,
      sold: 0
    },
    salesBreakdown: [
      { label: 'Leads activos', value: '96', helper: '12 en visitas programadas' },
      { label: 'Separaciones', value: '12', helper: 'Se firma contrato marco en octubre' },
      { label: 'Alianzas', value: '3', helper: 'Operadores hoteleros' }
    ],
    timeline: [
      { id: 'tl-1', title: 'Estudios de suelo', date: 'Ago 2025', status: 'completed', owner: 'Ingenieria' },
      { id: 'tl-2', title: 'Masterplan entregado', date: 'Oct 2025', status: 'inProgress', owner: 'Arquitectura' },
      { id: 'tl-3', title: 'Permisos municipales', date: 'Feb 2026', status: 'planned', owner: 'Legal' },
      { id: 'tl-4', title: 'Lanzamiento comercial', date: 'Mar 2026', status: 'planned', owner: 'Comercial' }
    ],
    team: [
      { role: 'Gerente de proyecto', name: 'Jose Palacios' },
      { role: 'Coordinadora legal', name: 'Paola Najarro' },
      { role: 'Planner comercial', name: 'Lucia Torres' }
    ],
    documents: [
      { id: 'doc-4', name: 'Masterplan preliminar', updatedAt: '18/09/2025' },
      { id: 'doc-5', name: 'Estudio de impacto ambiental', updatedAt: '06/09/2025' }
    ],
    updates: [
      {
        id: 'up-4',
        date: '26/09/2025',
        summary: 'Se reciben comentarios de comunidad local sobre accesos vehiculares.',
        owner: 'Relacion comunitaria',
        category: 'legal'
      },
      {
        id: 'up-5',
        date: '20/09/2025',
        summary: 'Propuesta de alianza con operador boutique en evaluacion.',
        owner: 'Desarrollo de negocios',
        category: 'comercial'
      }
    ],
    blocks: [
      {
        id: 'block-norte',
        name: 'A',
        lots: { total: 64, available: 52, reserved: 12, sold: 0 },
        progress: 28,
        nextRelease: 'Cierre de trazado eco trail Q1 2026'
      },
      {
        id: 'block-sur',
        name: 'B',
        lots: { total: 72, available: 64, reserved: 8, sold: 0 },
        progress: 18
      },
      {
        id: 'block-central',
        name: 'C',
        lots: { total: 44, available: 36, reserved: 8, sold: 0 },
        progress: 32,
        nextRelease: 'Permisos de cabañas boutique en tramite'
      }
    ],
    lotTypes: [
      { type: 'Lote bosque 500 m2', total: 84, price: 'S/ 420,000', status: 'available' },
      { type: 'Lote vista valle 650 m2', total: 72, price: 'S/ 540,000', status: 'reserved' },
      { type: 'Eco lodge', total: 24, price: 'S/ 860,000', status: 'available' }
    ],
    salesFunnel: [
      { id: 'sf-1', stage: 'Interesados web', count: 420, conversion: '100%', helper: 'Campana inbound' },
      { id: 'sf-2', stage: 'Precalificacion financiera', count: 128, conversion: '30%', helper: 'Aliado Banco Cusco' },
      { id: 'sf-3', stage: 'Visitas guiadas', count: 44, conversion: '10%', helper: 'Experiencia in situ cada 15 dias' },
      { id: 'sf-4', stage: 'Preventas firmes', count: 28, conversion: '7%', helper: 'Entrega de memorando entendimiento' }
    ],
    upcomingActions: [
      { id: 'act-4', title: 'Socializar ajustes EIA con comunidad', owner: 'Relacion comunitaria', date: '02/10/2025', status: 'scheduled' },
      { id: 'act-5', title: 'Definir branding proyecto', owner: 'Marketing', date: '18/10/2025', status: 'scheduled' },
      { id: 'act-6', title: 'Entrega masterplan definitivo', owner: 'Arquitectura', date: '28/09/2025', status: 'delayed' }
    ],
    blueprint: {
      version: 'Masterplan eco v0.9',
      updatedAt: '18/09/2025',
      notes: [
        'Pendiente validar ubicacion de biodigestores.',
        'Agregar zona de glamping premium en borde del rio.',
        'Senderos interpretativos definidos en 80%.'
      ],
      downloadUrl: '#'
    }
  },
  'proj-vista-mar': {
    launchDate: 'Q1 2023',
    estimatedDelivery: 'Sep 2025',
    description:
      'Condominio de playa frente al mar con amenidades premium orientado a inversionistas de Lima y extranjeros.',
    tags: ['Etapa 3', 'Alta demanda', 'Entrega 2025'],
    highlights: [
      { label: 'Ticket promedio', value: 'S/ 410,000', helper: 'Marina y club incluidos' },
      { label: 'Ventas acumuladas', value: '68%' },
      { label: 'Margen proyectado', value: '22%' }
    ],
    inventory: {
      available: 140,
      reserved: 24,
      sold: 156
    },
    salesBreakdown: [
      { label: 'Contratos firmados', value: '156', helper: '54 por escriturar' },
      { label: 'Reservas activas', value: '24', helper: 'Refuerzos comerciales en curso' },
      { label: 'Demanda semanal', value: '28 leads', helper: 'Campanas Lima Norte' }
    ],
    timeline: [
      { id: 'tl-5', title: 'Entrega clubhouse', date: 'Abr 2025', status: 'completed', owner: 'Construccion' },
      { id: 'tl-6', title: 'Instalacion marina privada', date: 'Sep 2025', status: 'inProgress', owner: 'Construccion' },
      { id: 'tl-7', title: 'Entrega etapa 3', date: 'Dic 2025', status: 'planned', owner: 'Operaciones' }
    ],
    team: [
      { role: 'Gerente de proyecto', name: 'Silvia Paredes' },
      { role: 'Jefe de ventas', name: 'Martin Cabrera' },
      { role: 'Coordinador de obra', name: 'Erick Salazar' }
    ],
    documents: [
      { id: 'doc-6', name: 'Reporte obra agosto', updatedAt: '30/08/2025' },
      { id: 'doc-7', name: 'Plan comercial Q4', updatedAt: '10/09/2025' },
      { id: 'doc-8', name: 'Acta comite tecnico', updatedAt: '15/09/2025' }
    ],
    updates: [
      {
        id: 'up-6',
        date: '23/09/2025',
        summary: 'Avance marina al 65%, se refuerzan cuadrillas nocturnas.',
        owner: 'Construccion',
        category: 'obra'
      },
      {
        id: 'up-7',
        date: '19/09/2025',
        summary: 'Campana referidos generara preventa de 8 lotes premium.',
        owner: 'Comercial',
        category: 'comercial'
      },
      {
        id: 'up-8',
        date: '16/09/2025',
        summary: 'Se firma convenio con operador de seguridad perimetral.',
        owner: 'Legal',
        category: 'legal'
      }
    ],
    blocks: [
      {
        id: 'block-marina',
        name: 'A',
        lots: { total: 44, available: 6, reserved: 8, sold: 30 },
        progress: 82,
        nextRelease: 'Entrega muelles privados diciembre'
      },
      {
        id: 'block-club',
        name: 'B',
        lots: { total: 38, available: 10, reserved: 10, sold: 18 },
        progress: 74
      },
      {
        id: 'block-condos',
        name: 'C',
        lots: { total: 72, available: 38, reserved: 12, sold: 22 },
        progress: 61
      },
      {
        id: 'block-villas',
        name: 'D',
        lots: { total: 62, available: 30, reserved: 8, sold: 24 },
        progress: 58,
        nextRelease: 'Inicio acabados interiores en octubre'
      }
    ],
    lotTypes: [
      { type: 'Villa frente al mar', total: 48, price: 'US$ 350,000', status: 'sold' },
      { type: 'Villa vista lateral', total: 74, price: 'US$ 285,000', status: 'reserved' },
      { type: 'Condo 2 dormitorios', total: 96, price: 'US$ 185,000', status: 'available' }
    ],
    salesFunnel: [
      { id: 'sf-1', stage: 'Prospectos activos', count: 320, conversion: '100%', helper: 'Campanas en Lima y extranjero' },
      { id: 'sf-2', stage: 'Visitas virtuales', count: 188, conversion: '59%', helper: 'Tour 360 disponible' },
      { id: 'sf-3', stage: 'Reservas con deposito', count: 92, conversion: '29%', helper: 'Aplica bono verano' },
      { id: 'sf-4', stage: 'Contratos notariales', count: 68, conversion: '21%', helper: 'Firma en curso con BBVA' }
    ],
    upcomingActions: [
      { id: 'act-7', title: 'Coordinacion entrega club house', owner: 'Operaciones', date: '08/10/2025', status: 'scheduled' },
      { id: 'act-8', title: 'Activacion campana verano', owner: 'Marketing', date: '01/11/2025', status: 'scheduled' },
      { id: 'act-9', title: 'Auditoria seguridad marina', owner: 'Construccion', date: '22/09/2025', status: 'completed' }
    ],
    blueprint: {
      version: 'Masterplan costero 2025',
      updatedAt: '05/09/2025',
      notes: [
        'Se agrega area de muelle secundario.',
        'Ajustes en circulaciones para carros de golf.',
        'Validar iluminacion nocturna de boardwalk.'
      ],
      downloadUrl: '#'
    }
  }
};
