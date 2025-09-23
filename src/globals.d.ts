import { DocumentReaderDeviceWebComponent } from '@regulaforensics/vp-frontend-document-components';
import {
  DocumentReaderWebComponent,
  IDocumentReader,
} from '@regulaforensics/vp-frontend-document-components';
import {
  FaceLivenessWebComponent,
  IFaceLiveness,
} from '@regulaforensics/vp-frontend-face-components';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'document-reader': React.DetailedHTMLProps<
        IDocumentReader & React.HTMLAttributes<DocumentReaderWebComponent>,
        DocumentReaderWebComponent
      >;
    }
  }
}

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'face-liveness': React.DetailedHTMLProps<
        IFaceLiveness & React.HTMLAttributes<FaceLivenessWebComponent>,
        FaceLivenessWebComponent
      >;
    }
  }
}

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'document-reader-device': React.DetailedHTMLProps<
        React.HTMLAttributes<DocumentReaderDeviceWebComponent>,
        DocumentReaderDeviceWebComponent
      >;
    }
  }
}
