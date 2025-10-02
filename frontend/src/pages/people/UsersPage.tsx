import styles from "./PeoplePages.module.css";

const users = [
  { id: "user-01", name: "Rocío Medina", role: "Administrador", email: "rmedina@hedra.com" },
  { id: "user-02", name: "Diego Ramos", role: "Finanzas", email: "dramos@hedra.com" }
];

export function UsersPage() {
  return (
    <section className={`${styles.panel} card`}>
      <header>
        <h2>Usuarios internos</h2>
        <p>Gestión de cuentas de acceso al panel y sus perfiles.</p>
      </header>
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <span>{user.role}</span>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
