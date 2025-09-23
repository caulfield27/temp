import type { IAction } from '@/pages/process/ProcessTypes';

export interface IPage {
  name: string;
  actions: IAction[];
  id: number;
}

export interface IProcess {
  name: string;
  createdAt: Date;
  link: string | null;
  isPublished: boolean;
  id: number;
  pages: IPage[];
}
