import type { IAction } from './ProcessTypes';

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
    label: 'Загрузка файла',
    description: 'Загрузка файла',
    code: 'file_upload',
    required: true,
  },
];
