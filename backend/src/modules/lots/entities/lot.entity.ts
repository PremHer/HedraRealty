export enum LotStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  SOLD = 'sold'
}

export interface Lot {
  id: string;
  blockId: string;
  projectId: string;
  code: string;
  areaM2: number;
  pricePen: number;
  status: LotStatus;
  financingPlan?: string;
  buyerId?: string;
  reservationDate?: Date;
  saleDate?: Date;
  createdAt: Date;
}
