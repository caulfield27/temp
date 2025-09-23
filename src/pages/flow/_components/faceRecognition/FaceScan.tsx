import { useEffect, useRef } from 'react';

import { useFaceScanStore } from './FaceScanStore';
import { setupCanvas } from './FaceScanUtils';

export const FaceScan = () => {
  // ZUSTAND STORE STATES
  const { init, instruction, loadingText } = useFaceScanStore();

  // DOM REFS
  const visionRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasSemicirclesRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const vision = visionRef.current;
    const canvasSemicircles = canvasSemicirclesRef.current;
    const canvas = canvasRef.current;
    const videoContainer = videoContainerRef.current;

    if (vision && canvasSemicircles) {
      init(canvasSemicircles, vision);
    }

    if (canvasSemicircles && vision) {
      canvasSemicircles.width = vision.offsetWidth;
      canvasSemicircles.height = vision.offsetHeight;
    }

    if (canvas && videoContainer) {
      setupCanvas(canvas, videoContainer);
    }
  }, []);

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center mb-0 z-[1]">
      <div
        ref={videoContainerRef}
        id="videoContainer"
        className="relative w-[480px] h-[640px] flex items-center max-[600px]:w-full max-[600px]:h-full"
      >
        <canvas
          ref={canvasSemicirclesRef}
          id="semicircles"
          className="absolute z-[3] transition-[stroke] duration-2000 ease-in-out"
        />
        <canvas
          ref={canvasRef}
          id="canvas"
          className="absolute z-[1] w-full h-full"
        />
        <div ref={visionRef} id="vision" className="w-full h-full z-[2]" />
        <div
          id="info-block"
          className="absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-[100] flex flex-col gap-2 mt-2"
        >
          <div
            id="inctructions"
            className="text-2xl leading-8 text-center z-[2] font-bold"
          >
            {instruction}
          </div>
          <div
            id="loading-text"
            className="text-center z-[2] text-[var(--text-secondary-color)]"
          >
            {loadingText}
          </div>
        </div>
      </div>
    </div>
  );
};
