export type StatusType =
  | 'processing'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'all';

export interface IApplication {
  id: number;
  name: string;
  status: StatusType;
  createdAt: Date;
  data: { [key: string]: unknown };
}
