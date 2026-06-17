import { PROBLEM_TYPES } from '../data/problemTypes'
import styles from '../styles/MapSidebar.module.css'

export default function MapSidebar({ filters, toggleType, setPeriod, setOnlyMine }) {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Filtros</h2>

      <p className={styles.sectionLabel}>Tipos de problema</p>
      {PROBLEM_TYPES.map((t) => (
        <label key={t.id} className={styles.filterItem}>
          <input
            type="checkbox"
            checked={filters.types.has(t.id)}
            onChange={() => toggleType(t.id)}
          />
          <span className={styles.badge} style={{ background: t.color }}>
            {t.letter}
          </span>
          <span>{t.label}</span>
        </label>
      ))}

      <p className={styles.sectionLabel}>Período</p>
      <select
        className={styles.select}
        value={filters.period}
        onChange={(e) => setPeriod(e.target.value)}
      >
        <option value="all">Todos</option>
        <option value="7">Últimos 7 dias</option>
        <option value="30">Últimos 30 dias</option>
      </select>

      <p className={styles.sectionLabel}>Exibir</p>
      <label className={styles.filterItem}>
        <input
          type="checkbox"
          checked={filters.onlyMine}
          onChange={(e) => setOnlyMine(e.target.checked)}
        />
        <span>Meus registros</span>
      </label>
      <label className={styles.filterItem}>
        <input
          type="checkbox"
          checked={!filters.onlyMine}
          onChange={(e) => setOnlyMine(!e.target.checked)}
          readOnly
        />
        <span>Registros de todos</span>
      </label>
    </aside>
  )
}
