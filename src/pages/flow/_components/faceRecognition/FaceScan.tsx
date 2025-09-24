import { useEffect, useRef } from 'react';

import { useFlowStore } from '../../FlowStore';
import styles from './FaceScan.module.css';
import { useFaceScanStore } from './FaceScanStore';
import { setupCanvas } from './FaceScanUtils';

export const FaceScan = () => {
  // ZUSTAND STORE STATES
  const { init, instruction, loadingText } = useFaceScanStore();
  const { setData, setLivenessOpen } = useFlowStore();

  // DOM REFS
  const visionRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasSemicirclesRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // EFFECT HANDLERS
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

    const timerId = setTimeout(() => {
      setLivenessOpen(false);
      setData('visionlabs_liveness', 85);
    }, 4000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div className={styles.vision_wrapper}>
      <div
        ref={videoContainerRef}
        className={styles.video_container}
        id="videoContainer"
      >
        <canvas
          ref={canvasSemicirclesRef}
          className={styles.semicircles}
          id="semicircles"
        ></canvas>
        <canvas ref={canvasRef} className={styles.canvas} id="canvas"></canvas>
        <div ref={visionRef} className={styles.vision} id="vision"></div>
        <div className={styles.info_block} id="info-block">
          <div className={styles.instructions} id="inctructions">
            {instruction}
          </div>
          <div className={styles.loading_text} id="loading-text">
            {loadingText}
          </div>
        </div>
      </div>
    </div>
  );
};
