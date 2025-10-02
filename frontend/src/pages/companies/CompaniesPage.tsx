import styles from "./CompaniesPage.module.css";

const mockCompanies = [
  {
    id: "comp-hedra",
    name: "Hedra Realty SAC",
    representative: "Carolina León",
    projects: 3,
    createdAt: "12/01/2024"
  },
  {
    id: "comp-aurora",
    name: "Aurora Inversiones",
    representative: "Luis Meza",
    projects: 2,
    createdAt: "28/03/2024"
  }
];

export function CompaniesPage() {
  return (
    <div className={styles.wrapper}>
      <section className="card">
        <header className={styles.header}>
          <div>
            <h2>Empresas registradas</h2>
            <p>Gestiona las inmobiliarias y representantes legales vinculados a tu cuenta.</p>
          </div>
          <button type="button" className={styles.primary}>Nueva empresa</button>
        </header>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Representante legal</th>
                <th>Proyectos</th>
                <th>Alta</th>
              </tr>
            </thead>
            <tbody>
              {mockCompanies.map((company) => (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.representative}</td>
                  <td>{company.projects}</td>
                  <td>{company.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
