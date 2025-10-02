import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  label: string;
  status?: 'success' | 'warning' | 'info';
}

export function StatusBadge({ label, status = 'info' }: StatusBadgeProps) {
  return <span className={[styles.badge, styles[status]].join(' ')}>{label}</span>;
}
