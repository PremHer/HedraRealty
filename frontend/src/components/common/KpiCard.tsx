import styles from './KpiCard.module.css';

interface KpiCardProps {
  label: string;
  value: string;
  trend?: string;
  tone?: 'default' | 'positive' | 'warning';
}

const toneClass: Record<NonNullable<KpiCardProps['tone']>, string> = {
  default: styles.default,
  positive: styles.positive,
  warning: styles.warning
};

export function KpiCard({ label, value, trend, tone = 'default' }: KpiCardProps) {
  return (
    <article className={[styles.card, toneClass[tone]].join(' ')}>
      <span className={styles.label}>{label}</span>
      <strong>{value}</strong>
      {trend && <span className={styles.trend}>{trend}</span>}
    </article>
  );
}
