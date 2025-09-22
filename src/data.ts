export interface IProcesses {
  name: string;
  createdAt: Date;
  link: string | null;
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
    link: null,
    status: 'draft',
  },
];

export interface IAction {
  label: string;
  description: string;
  code: string;
  required: boolean;
}

export const actions: IAction[] = [
  {
    label: 'Phone (OTP)',
    description: 'Телефон',
    code: 'phone_otp',
    required: true,
  },
  {
    label: 'Regula Front',
    description: 'Паспорт (лицевая)',
    code: 'regula_ocr_front',
    required: true,
  },
  {
    label: 'Liveness',
    description: 'Проверка живности',
    code: 'visionlabs_liveness',
    required: true,
  },
  {
    label: 'Face Match',
    description: 'Сравнения лица',
    code: 'visionlabs_face_match',
    required: true,
  },
  {
    label: 'Regula Back',
    description: 'Паспорт (оборот)',
    code: 'regula_ocr_back',
    required: true,
  },
  {
    label: 'Инфо: Текст',
    description: 'Текст',
    code: 'info_text',
    required: true,
  },
  {
    label: 'Инфо: Число',
    description: 'Число',
    code: 'info_number',
    required: true,
  },
  {
    label: 'Инфо: Дата',
    description: 'Дата',
    code: 'info_date',
    required: true,
  },
  {
    label: 'Инфо: Список',
    description: 'Список',
    code: 'info_list',
    required: true,
  },
  {
    label: 'Чекбокс',
    description: 'Чекбокс',
    code: 'info_checkbox',
    required: true,
  },
  {
    label: 'Загрузка файла',
    description: 'Загрузка файла',
    code: 'file_upload',
    required: true,
  },
];
