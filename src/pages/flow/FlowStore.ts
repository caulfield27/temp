import { create } from 'zustand';

import type { IPage } from '@/store/process/processStoreTypes';

interface IProcess {
  name: string;
  pages: IPage[];
}

const currentProcess: IProcess = {
  name: 'Идентификация',
  pages: [
    {
      name: 'Шаг 1',
      id: 1,
      actions: [
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
      ],
    },
    {
      name: 'Шаг 2',
      id: 1,
      actions: [
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
      ],
    },
    {
      name: 'Шаг 3',
      id: 1,
      actions: [
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
      ],
    },
  ],
};

interface IStates {
  process: IProcess;
  step: number;
  data: { [key: string]: unknown };
  isLivenessOpen: boolean;
  isDocReaderOpen: boolean;
  passportType: 'front' | 'back';
}

type Actions = {
  setStep: (step: number) => void;
  setData: (key: string, value: unknown) => void;
  setLivenessOpen: (payload: boolean) => void;
  setDocReaderOpen: (payload: boolean) => void;
  setPassportType: (type: 'front' | 'back') => void;
};

const initialStates: IStates = {
  passportType: 'front',
  process: currentProcess,
  step: 1,
  data: {},
  isDocReaderOpen: false,
  isLivenessOpen: false,
};

export const useFlowStore = create<IStates & Actions>((set) => ({
  ...initialStates,
  setPassportType: (type) => set({ passportType: type }),
  setLivenessOpen: (payload) => set({ isLivenessOpen: payload }),
  setDocReaderOpen: (payload) => set({ isDocReaderOpen: payload }),
  setStep: (step) => set({ step: step }),
  setData: (key, value) =>
    set((state) => ({ data: { ...state.data, [key]: value } })),
}));
