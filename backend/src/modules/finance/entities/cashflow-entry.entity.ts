export enum CashflowEntryType {
  INGRESO = 'ingreso',
  EGRESO = 'egreso'
}

export interface CashflowEntry {
  id: string;
  projectId: string;
  date: Date;
  type: CashflowEntryType;
  description: string;
  amount: number;
  currency: 'PEN';
  reference?: string;
}
