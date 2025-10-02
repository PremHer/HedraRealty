export interface Project {
  id: string;
  companyId: string;
  name: string;
  type: 'lotizacion';
  totalAreaM2: number;
  services: string[];
  amenities: string[];
  documentation: string[];
  deliveryWorks: string[];
  salesProgress: number;
  constructionProgress: number;
  managerId: string;
  launchDate?: Date;
  createdAt: Date;
}
