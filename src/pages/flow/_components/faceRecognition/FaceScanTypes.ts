type IRect = {
  height: number;
  width: number;
  x: number;
  y: number;
};
type IFrameStatus =
  | {
      command: 'CONNECTED';
      device: string;
      'session-id': string;
      token: string;
      version: string;
    }
  | {
      command: 'STATS';
      'content-type': string;
      data: {
        details: {
          faceFramePosition: {
            faceRect: IRect;
            frameRect: IRect;
            margins: Array<number>;
          };
        };
        errors: Array<number>;
        isOk: boolean;
      };
    }
  | {
      command: 'ERROR';
      'content-type': string;
      data: {
        errors: Array<number>;
        isOk: boolean;
      };
    }
  | {
      command: 'SUCCESS';
      'content-type': string;
      data: {
        token: string;
      };
    };

interface IInstructions {
  title: string;
  desc: string;
}

type CameraMode = 'user' | 'environment';

export type { CameraMode, IFrameStatus, IInstructions, IRect };
