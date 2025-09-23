type options = {
  timeout: number;
  url: string;
  heartbeatInterval: number;
  mode: 'user' | 'environment';
};
declare class FaceRecognition {
  constructor(rootNode: HTMLDivElement | null, options: options);
  width: number;
  height: number;
  isWSConnected: boolean;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  video: HTMLVideoElement | null;
  ws: WebSocket | null;
  interval: number | null;
  rootNode: HTMLElement | null;
  options: options;
  navigator: Navigator;
  isCameraActive: boolean;
  isUnavailableCamera: boolean;
  startLiveness: boolean;
  deviceId: number | 'unknown';
  livenessCb: (data: string) => void | null;
  timeout: null | number;
  isSuccess: boolean;

  attachCamera(): Promise<string>;
  detachCamera(): void;
  connectWS(): Promise<string | Error>;
  disconnectWS(): void;
  checkLiveness(
    cb: (data: string) => void,
    erroCb?: (err: Error) => void
  ): boolean | void;
}
