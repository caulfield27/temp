import type { IAction } from '@/pages/process/ProcessTypes';

import { useFlowStore } from '../../FlowStore';
import { Passport } from '../docReader/DocReader';
import { FaceScan } from '../faceRecognition/FaceScan';

// export const actionIcon: { [key: string]: ReactElement } = {
//   phone_otp: <Phone className="text-neutral-500" />,
//   regula_ocr_front: <Newspaper className="text-neutral-500" />,
//   visionlabs_liveness: <ScanFace className="text-neutral-500" />,
//   regula_ocr_back: <Newspaper className="text-neutral-500" />,
//   info_text: <Info className="text-neutral-500" />,
//   info_number: <Info className="text-neutral-500" />,
//   info_date: <Calendar1 className="text-neutral-500" />,
//   info_list: <List className="text-neutral-500" />,
//   info_checkbox: <Check className="text-neutral-500" />,
//   file_upload: <Upload className="text-neutral-500" />,
// };

export const ProcessStep = () => {
  const { step, process } = useFlowStore();
  const actions: IAction[] = process.pages[step - 1]?.actions ?? [];
  const { isDocReaderOpen, isLivenessOpen } = useFlowStore();

  if (isLivenessOpen) return <FaceScan />;

  if (isDocReaderOpen) return <Passport />;

  return (
    <div className="pt-5">
      {/* {actions.map((action) => {
            return action.code === "visionlabs_liveness" ? 
        })} */}
    </div>
  );
};
