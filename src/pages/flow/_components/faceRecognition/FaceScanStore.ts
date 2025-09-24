import { create } from 'zustand';

import { ERROR_MESSAGES } from './FaceScanConfig';
import type { CameraMode, IFrameStatus } from './FaceScanTypes';
import { interpolate, interpolateColor, rgbToCss } from './FaceScanUtils';

const fromColor = [217, 217, 217];
const toColor = [250, 83, 0];
const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
const arcLength = Math.PI / 2.2;
const outerRadius = window.innerWidth < 450 ? 165 : 215;
const minWidth = 8;
const maxWidth = 12;

type IStates = {
  isSuccess: boolean;
  mode: CameraMode;
  faceRecognition: FaceRecognition | null;
  instruction: string;
  loadingText: string;
  prevErrorKey: string | null;
  canvasSemicircles: HTMLCanvasElement | null;
  isPulsing: boolean;
  pulseProgress: number | null;
  pulseDirection: number | null;
  pulseTarget: number | null;
  pulseRequestId: number | null;
  loading: boolean;
};

type Actions = {
  onMessage: (frameStatus: string) => void;
  init: (
    canvasSemicircles: HTMLCanvasElement,
    rootNode: HTMLDivElement
  ) => void;
  checkLiveness: () => Promise<void>;
  draw: () => void;
  drawPulsing: () => void;
  animatePulse: () => void;
  startPulse: (targetIndex: number | null) => void;
  stopPulse: () => void;
  reset: () => void;
  onError: (err: Error) => void;
  setLoading: (state: boolean) => void;
  onSuccess: () => void;
  setCameraMode: (mode: CameraMode) => void;
};

const initialStates: IStates = {
  isSuccess: false,
  mode: 'environment',
  loading: false,
  faceRecognition: null,
  instruction: '',
  loadingText: '',
  canvasSemicircles: null,
  isPulsing: false,
  pulseProgress: 0,
  pulseDirection: 1,
  pulseTarget: null,
  pulseRequestId: null,
  prevErrorKey: null,
};

export const useFaceScanStore = create<IStates & Actions>((set, get) => ({
  ...initialStates,
  setCameraMode: (newMode) => set({ mode: newMode }),
  setLoading: (payload) => set({ loading: payload }),
  onError: () => {
    const { reset } = get();
    reset();
  },
  onSuccess: () => {},
  onMessage: (frameStatus) => {
    const { stopPulse, startPulse, prevErrorKey } = get();
    const parsedStatus: IFrameStatus = JSON.parse(frameStatus);

    if (parsedStatus.command === 'SUCCESS') {
      set({ isSuccess: true });
    }

    if (parsedStatus.command === 'STATS' || parsedStatus.command === 'ERROR') {
      const { errors } = parsedStatus.data;
      if (errors) {
        const text = ERROR_MESSAGES[errors[errors.length - 1]];
        const error = errors[errors.length - 1];

        set({ instruction: text });

        if ((error === 64 || error === 19) && text !== prevErrorKey) {
          stopPulse();
          startPulse(1);
          set({ prevErrorKey: text });
        } else if ((error === 20 || error === 65) && text !== prevErrorKey) {
          stopPulse();
          startPulse(3);
          set({ prevErrorKey: text });
        } else if ((error === 67 || error === 23) && text !== prevErrorKey) {
          stopPulse();
          startPulse(0);
          set({ prevErrorKey: text });
        } else if ((error === 68 || error === 24) && text !== prevErrorKey) {
          stopPulse();
          startPulse(2);
          set({ prevErrorKey: text });
        } else {
          if (text !== prevErrorKey) {
            stopPulse();
            startPulse(null);
            set({ prevErrorKey: text });
          }
        }
      }
    }
  },
  init: async (canvasSemicircles, rootNode) => {
    const { checkLiveness, mode } = get();
    const faceR = new FaceRecognition(rootNode, {
      timeout: 30000,
      url: ``,
      heartbeatInterval: 1000,
      mode,
    });

    set({
      canvasSemicircles: canvasSemicircles,
      loadingText: 'Камера не подключеана',
      faceRecognition: faceR,
    });
    await faceR.attachCamera();
    await checkLiveness();
  },
  checkLiveness: async () => {
    const { faceRecognition, startPulse, onMessage, onError, reset } = get();
    try {
      set({
        loadingText: 'Сканируем лицо...',
      });
      startPulse(null);
      if (faceRecognition) {
        await faceRecognition.connectWS();
        faceRecognition.checkLiveness(onMessage, onError);
      }
    } catch (e) {
      console.error(e);
      reset();
    }
  },
  draw: () => {
    const { canvasSemicircles } = get();
    if (canvasSemicircles) {
      const ctx = canvasSemicircles.getContext('2d');
      const { width, height } = canvasSemicircles;
      if (ctx) {
        const cx = width / 2;
        const cy = height / 2;
        ctx.clearRect(0, 0, width, height);

        angles.forEach((angle) => {
          const start = angle - arcLength / 2;
          const end = angle + arcLength / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, outerRadius, start, end, false);

          ctx.strokeStyle = rgbToCss(fromColor);
          ctx.lineWidth = minWidth;

          ctx.stroke();
        });
      }
    }
  },
  drawPulsing: () => {
    const { canvasSemicircles, pulseTarget, pulseProgress } = get();
    if (canvasSemicircles) {
      const ctx = canvasSemicircles.getContext('2d');
      const { width, height } = canvasSemicircles;
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        const cx = width / 2;
        const cy = height / 2;

        angles.forEach((angle, index) => {
          const start = angle - arcLength / 2;
          const end = angle + arcLength / 2;

          ctx.beginPath();
          ctx.arc(cx, cy, outerRadius, start, end, false);

          const isActive = pulseTarget === null || index === pulseTarget;

          const color = isActive
            ? rgbToCss(interpolateColor(fromColor, toColor, pulseProgress ?? 0))
            : 'rgb(217, 217, 217)';

          const width = isActive
            ? interpolate(minWidth, maxWidth, pulseProgress ?? 0)
            : minWidth;

          ctx.strokeStyle = color;
          ctx.lineWidth = width;
          ctx.lineCap = 'round';
          ctx.stroke();
        });
      }
    }
  },
  animatePulse: () => {
    const {
      isPulsing,
      animatePulse,
      pulseProgress,
      drawPulsing,
      pulseDirection,
    } = get();
    if (!isPulsing) return;
    const temp = (pulseDirection ?? 0) * 0.02 + (pulseProgress ?? 0);
    set({ pulseProgress: temp });
    if (temp >= 1) {
      set({ pulseProgress: 1, pulseDirection: -1 });
    } else if (temp <= 0) {
      set({ pulseProgress: 0, pulseDirection: 1 });
    }

    drawPulsing();
    set({ pulseRequestId: requestAnimationFrame(animatePulse) });
  },
  startPulse: (targetInd) => {
    const { isPulsing, pulseTarget, stopPulse, animatePulse } = get();

    if (isPulsing && pulseTarget === targetInd) return;
    stopPulse();
    set({
      pulseTarget: targetInd,
      pulseProgress: 0,
      pulseDirection: 1,
      isPulsing: true,
    });
    animatePulse();
  },
  stopPulse: () => {
    const { pulseRequestId } = get();
    if (pulseRequestId) {
      cancelAnimationFrame(pulseRequestId);
      set({ pulseRequestId: null });
    }
    set({ isPulsing: false, pulseTarget: null });
  },
  reset: () => set(initialStates),
}));
