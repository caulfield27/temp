import {
  Calendar1,
  CircleCheckBig,
  CircleX,
  Info,
  Newspaper,
  Phone,
  ScanFace,
  Upload,
} from 'lucide-react';
import type { ReactElement } from 'react';
import type { ExternalToast } from 'sonner';

export const actionIcon: { [key: string]: ReactElement } = {
  phone_otp: <Phone className="text-neutral-500" />,
  regula_ocr_front: <Newspaper className="text-neutral-500" />,
  visionlabs_liveness: <ScanFace className="text-neutral-500" />,
  regula_ocr_back: <Newspaper className="text-neutral-500" />,
  info_text: <Info className="text-neutral-500" />,
  info_number: <Info className="text-neutral-500" />,
  info_date: <Calendar1 className="text-neutral-500" />,
  file_upload: <Upload className="text-neutral-500" />,
};

export const toasterOptions: { [key: string]: ExternalToast } = {
  success: {
    icon: <CircleCheckBig />,
    position: 'top-right',
  },
  error: {
    icon: <CircleX />,
    position: 'top-right',
  },
};
