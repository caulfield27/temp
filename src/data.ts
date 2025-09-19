export interface IProcesses {
  name: string;
  createdAt: Date;
  link: string;
  status: 'published' | 'draft';
}
export const processes: IProcesses[] = [
  {
    name: 'Идентификация',
    createdAt: new Date(),
    link: 'f/37bff4',
    status: 'published',
  },
  {
    name: 'Верификация',
    createdAt: new Date(),
    link: 'f/37bff4',
    status: 'published',
  },
  {
    name: 'Биометрия',
    createdAt: new Date(),
    link: 'f/37bff4',
    status: 'published',
  },
  {
    name: 'Верификация',
    createdAt: new Date(),
    link: 'f/37bff4',
    status: 'published',
  },
  {
    name: 'Документы',
    createdAt: new Date(),
    link: 'f/37bff4',
    status: 'published',
  },
];
