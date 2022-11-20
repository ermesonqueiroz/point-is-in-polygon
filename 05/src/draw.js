import { setLineWidth } from './utils.js';

export function drawPoint(ctx, { x, y }) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

export function drawLine(ctx, coordinates) {
  setLineWidth(ctx, 2);
  ctx.beginPath();
  coordinates.forEach(({ x, y }, index) => {
    if (index === 0) ctx.moveTo(x, y);
    ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.stroke();
}

export function drawPolygon(ctx, coordinates = []) {
  setLineWidth(ctx, 4);
  coordinates.forEach((pCoordinates) => {
    ctx.beginPath();
    pCoordinates.forEach(({ x, y }, index) => {
      if (index === 0) ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  });
}
