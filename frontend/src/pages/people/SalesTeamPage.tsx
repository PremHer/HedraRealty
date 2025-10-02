import styles from "./PeoplePages.module.css";

const sellers = [
  { id: "seller-01", name: "Julio Prado", role: "Asesor Comercial", region: "Lima" },
  { id: "seller-02", name: "María López", role: "Broker asociado", region: "Arequipa" }
];

export function SalesTeamPage() {
  return (
    <section className={`${styles.panel} card`}>
      <header>
        <h2>Equipo comercial</h2>
        <p>Control de asesores y brokers con metas de venta.</p>
      </header>
      <ul className={styles.list}>
        {sellers.map((seller) => (
          <li key={seller.id}>
            <strong>{seller.name}</strong>
            <span>{seller.role}</span>
            <span>{seller.region}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
