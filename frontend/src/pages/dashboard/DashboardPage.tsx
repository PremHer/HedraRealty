import { KpiCard } from '../../components/common/KpiCard';
import { PageHeader } from '../../components/common/PageHeader';
import { dashboardKpis, cashflowSummary, projects } from '../../mocks/data';

import styles from './DashboardPage.module.css';

export function DashboardPage() {
  return (
    <div className={styles.wrapper}>
      <PageHeader
        title="Resumen ejecutivo"
        subtitle="Indicadores generales del portafolio inmobiliario"
      />

      <section className="grid cols-3">
        {dashboardKpis.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </section>

      <section className={styles.section}>
        <h3>Proyectos destacados</h3>
        <div className={styles.projectsGrid}>
          {projects.slice(0, 3).map((project) => (
            <article key={project.id} className="card">
              <header className={styles.cardHeader}>
                <div>
                  <span className={styles.cardLabel}>Proyecto</span>
                  <strong>{project.name}</strong>
                </div>
                <span className="chip">{project.status}</span>
              </header>

              <dl className={styles.metrics}>
                <div>
                  <dt>Avance comercial</dt>
                  <dd>{Math.round(project.progressSales * 100)}%</dd>
                </div>
                <div>
                  <dt>Avance de obra</dt>
                  <dd>{Math.round(project.progressWorks * 100)}%</dd>
                </div>
                <div>
                  <dt>Lotes disponibles</dt>
                  <dd>
                    {project.lotsAvailable} / {project.lotsTotal}
                  </dd>
                </div>
              </dl>

              <footer className={styles.cardFooter}>
                <small>Gerente: {project.manager}</small>
                <button type="button">Ver detalle</button>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3>Flujo de caja del mes</h3>
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Concepto</th>
                <th align="right">Monto (PEN)</th>
                <th>Comentario</th>
              </tr>
            </thead>
            <tbody>
              {cashflowSummary.map((item) => (
                <tr key={item.id}>
                  <td>{item.concept}</td>
                  <td align="right">
                    {item.amount.toLocaleString('es-PE', {
                      style: 'currency',
                      currency: 'PEN'
                    })}
                  </td>
                  <td>{item.variation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
