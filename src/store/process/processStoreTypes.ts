import type { IAction } from '@/pages/process/ProcessTypes';

export interface IPage {
  name: string;
  actions: IAction[];
  isPublished: boolean;
  id: number;
}
