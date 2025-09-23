function interpolate(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function interpolateColor(from: Array<number>, to: Array<number>, t: number) {
  return from.map((v, i) => Math.round(v + (to[i] - v) * t));
}

function rgbToCss(rgb: Array<number>) {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function setupCanvas(
  canvas: HTMLCanvasElement,
  videoContainer: HTMLDivElement
) {
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const cssWidth = videoContainer.clientWidth;
  const cssHeight = videoContainer.clientHeight;

  canvas.style.width = cssWidth + 'px';
  canvas.style.height = cssHeight + 'px';
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;

  ctx?.scale(dpr, dpr);

  const centerX = cssWidth / 2;
  const centerY = cssHeight / 2;
  const radius = window.innerWidth < 450 ? 155 : 200;

  if (ctx) {
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'transparent';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export { interpolate, interpolateColor, rgbToCss, setupCanvas };
