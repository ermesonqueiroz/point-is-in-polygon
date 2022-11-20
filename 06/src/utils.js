export function setFillColor(ctx, color = '#fff') {
  ctx.fillStyle = color;
}

export function setStrokeColor(ctx, color = '#fff') {
  ctx.strokeStyle = color;
}

export function setLineWidth(ctx, width = 4) {
  ctx.lineWidth = width;
}

export function getRandomCoordinates() {
  return {
    x: Math.floor(Math.random() * 1000),
    y: Math.floor(Math.random() * 600),
  };
}
