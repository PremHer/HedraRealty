import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiDownloadCloud, FiLayers, FiMap, FiTrendingUp } from "react-icons/fi";

import { PageHeader } from "../../components/common/PageHeader";
import { StatusBadge } from "../../components/common/StatusBadge";
import { projects } from "../../mocks/data";

import styles from "./ProjectsPage.module.css";

const statusFilters = ["Todos", "En comercializaci��n", "En planificaci��n", "En obra"];

const iconMap = {
  trend: FiTrendingUp,
  plan: FiMap,
  build: FiLayers
} as const;

type ProjectIconKey = keyof typeof iconMap;

export function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "Todos" || project.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title="Proyectos inmobiliarios"
        subtitle="Resumen por proyecto con avance comercial, operaci��n y lotes"
        actions={
          <button className={styles.cta} type="button" aria-label="Nuevo proyecto">
            +
          </button>
        }
      />

      <div className={styles.filters}>
        <input
          type="search"
          placeholder="Buscar proyecto o gerente"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          {statusFilters.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <section className={styles.grid}>
        {filteredProjects.map((project) => {
          const IconComponent = iconMap[project.icon as ProjectIconKey] ?? FiTrendingUp;

          return (
            <article key={project.id} className={styles.card}>
              <header className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <IconComponent />
                </div>
                <div className={styles.titleGroup}>
                  <h3>{project.name}</h3>
                  <p>{project.location}</p>
                </div>
                <StatusBadge label={project.status} status="info" />
              </header>

              <div className={styles.metrics}>
                <div>
                  <span className={styles.metricLabel}>Avance comercial</span>
                  <strong>{Math.round(project.progressSales * 100)}%</strong>
                  <small>{project.stage}</small>
                </div>
                <div>
                  <span className={styles.metricLabel}>Avance obra</span>
                  <strong>{Math.round(project.progressWorks * 100)}%</strong>
                  <small>Supervisor: {project.manager}</small>
                </div>
                <div>
                  <span className={styles.metricLabel}>Inventario</span>
                  <strong>
                    {project.lotsAvailable}/{project.lotsTotal}
                  </strong>
                  <small>Lotes disponibles</small>
                </div>
              </div>

              <footer className={styles.cardFooter}>
                <button
                  type="button"
                  className={styles.iconButtonSecondary}
                  aria-label="Descargar ficha"
                >
                  <FiDownloadCloud />
                </button>
                <Link
                  to={`/projects/${project.id}`}
                  className={styles.iconButtonPrimary}
                  aria-label={`Ver detalle de ${project.name}`}
                >
                  <FiArrowRight />
                </Link>
              </footer>
            </article>
          );
        })}

        {filteredProjects.length === 0 && (
          <div className={styles.empty}>No se encontraron proyectos con los filtros seleccionados.</div>
        )}
      </section>
    </div>
  );
}
