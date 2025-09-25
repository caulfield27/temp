import type { ReactElement } from 'react';

import type { IAction } from '@/pages/process/ProcessTypes';

import { useFlowStore } from '../../FlowStore';
import DocReaderProvider from '../docReader/DocReaderProvider';
import { DynamicField } from '../dynamicField/DynamicField';
import FaceScanProvider from '../faceRecognition/FaceScanProvider';

const component: { [key: string]: (data: IAction) => ReactElement } = {
  phone_otp: (data) => <DynamicField data={data} />,
  regula_ocr_front: (data) => <DocReaderProvider process={data} />,
  visionlabs_liveness: (data) => <FaceScanProvider process={data} />,
  regula_ocr_back: (data) => <DocReaderProvider process={data} />,
  info_text: (data) => <DynamicField data={data} />,
  info_number: (data) => <DynamicField data={data} />,
  info_date: (data) => <DynamicField data={data} />,
  file_upload: (data) => <DynamicField data={data} />,
};

export const ProcessStep = () => {
  const { step, process } = useFlowStore();
  const actions: IAction[] = process.pages[step - 1]?.actions ?? [];

  return (
    <div className="w-full pt-5 flex flex-col justify-start items-start gap-5.5">
      {actions.map((action) => {
        return (
          <div className="w-full" key={action.code}>
            {!!component[action.code] && component[action.code](action)}
          </div>
        );
      })}
    </div>
  );
};
