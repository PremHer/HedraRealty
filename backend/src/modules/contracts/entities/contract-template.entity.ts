export interface ContractTemplate {
  id: string;
  projectId: string;
  name: string;
  body: string;
  placeholders: string[];
  createdAt: Date;
}

export interface GeneratedContract {
  id: string;
  projectId: string;
  lotId: string;
  buyerId: string;
  templateId: string;
  generatedAt: Date;
  content: string;
}
