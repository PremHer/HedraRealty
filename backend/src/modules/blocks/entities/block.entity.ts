export interface Block {
  id: string;
  projectId: string;
  code: string;
  description?: string;
  lotCount: number;
  createdAt: Date;
}
