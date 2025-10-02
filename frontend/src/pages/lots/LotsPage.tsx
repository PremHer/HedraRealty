import { useMemo, useState } from "react";
import { FiDownloadCloud, FiMap, FiSearch } from "react-icons/fi";

import { PageHeader } from "../../components/common/PageHeader";
import { StatusBadge } from "../../components/common/StatusBadge";
import { lots } from "../../mocks/data";

import styles from "./LotsPage.module.css";

const statusFilters = ["Todos", "Disponible", "Reservado", "Separado", "Vendido"];

type BadgeTone = "success" | "warning" | "info";

export function LotsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos");
  const [project, setProject] = useState("Todos");

  const projects = useMemo(() => ["Todos", ...new Set(lots.map((lot) => lot.project))], []);

  const filteredLots = useMemo(() => {
    return lots.filter((lot) => {
      const matchesSearch = lot.code.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "Todos" || lot.status === status;
      const matchesProject = project === "Todos" || lot.project === project;
      return matchesSearch && matchesStatus && matchesProject;
    });
  }, [search, status, project]);

  const statusTone = (lotStatus: string): BadgeTone => {
    if (lotStatus === "Disponible") return "success";
    if (lotStatus === "Reservado" || lotStatus === "Separado") return "warning";
    return "info";
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title="Inventario de lotes"
        subtitle="Filtra y monitorea el estado comercial del inventario por manzana"
        actions={
          <button className={styles.iconButtonPrimary} type="button" aria-label="Exportar inventario">
            <FiDownloadCloud />
          </button>
        }
      />

      <div className="card">
        <div className={styles.filters}>
          <div className={styles.inputWrapper}>
            <FiSearch />
            <input
              type="search"
              placeholder="Código de lote (ej. A-01)"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <select value={project} onChange={(event) => setProject(event.target.value)}>
            {projects.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {statusFilters.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button type="button" className={styles.iconButtonSecondary} aria-label="Ver mapa de lotes">
            <FiMap />
          </button>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Lote</th>
                <th>Manzana</th>
                <th>Área (m²)</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Proyecto</th>
              </tr>
            </thead>
            <tbody>
              {filteredLots.map((lot) => (
                <tr key={lot.id}>
                  <td>{lot.code}</td>
                  <td>{lot.block}</td>
                  <td>{lot.area}</td>
                  <td>
                    {lot.price.toLocaleString("es-PE", {
                      style: "currency",
                      currency: "PEN"
                    })}
                  </td>
                  <td>
                    <StatusBadge label={lot.status} status={statusTone(lot.status)} />
                  </td>
                  <td>{lot.project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
