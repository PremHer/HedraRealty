export enum FinancingPlanType {
  CONTADO = 'contado',
  FINANCIADO_INICIAL = 'financiado-inicial',
  FINANCIADO_SIN_INICIAL = 'financiado-sin-inicial',
  FRANCES = 'frances',
  ALEMAN = 'aleman',
  JAPONES = 'japones'
}

export interface FinancingPlan {
  id: string;
  projectId: string;
  name: string;
  planType: FinancingPlanType;
  interestRateAnnual: number;
  gracePeriodMonths: number;
  installments: number;
  allowZeroDownPayment: boolean;
  penaltyRateMonthly: number;
  currency: 'PEN';
  createdAt: Date;
}
