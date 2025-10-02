import styles from "./PeoplePages.module.css";

const clients = [
  { id: "cli-01", name: "Andrea Torres", email: "atorres@mail.com", phone: "+51 999 888 777" },
  { id: "cli-02", name: "Carlos Gómez", email: "cgomez@mail.com", phone: "+51 988 776 554" }
];

export function ClientsPage() {
  return (
    <section className={`${styles.panel} card`}>
      <header>
        <h2>Clientes</h2>
        <p>Listado de clientes con seguimiento comercial activo.</p>
      </header>
      <ul className={styles.list}>
        {clients.map((client) => (
          <li key={client.id}>
            <strong>{client.name}</strong>
            <span>{client.email}</span>
            <span>{client.phone}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
