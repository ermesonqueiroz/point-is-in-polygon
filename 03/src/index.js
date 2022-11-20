class Point {
  constructor({ x, y }) {
    this.x = x;
    this.y = y; 
    Object.freeze(this);
  }
}

class LineSting {
  constructor(points) {
    this.points = points;
    Object.freeze(this);
  }
}

class Polygon {
  constructor(lines) {
    this.lines = lines;
    Object.freeze(this);
  }
}

const polygon = new Polygon([
  [
    { x: 200, y: 200 },
    { x: 500, y: 100 },
    { x: 800, y: 200 },
    { x: 800, y: 400 },
    { x: 500, y: 500 },
    { x: 200, y: 400 },
    { x: 200, y: 200 },
  ],
]);
const point = new Point({ x: 500, y: 300 });
const intersectionLine = new LineSting([
  { x: point.x, y: point.y },
  { x: 1000, y: point.y },
]);

const canvas = document.querySelector('#map');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 4;

const x1 = intersectionLine.points[0].x;
const y1 = intersectionLine.points[0].y;
const x2 = intersectionLine.points[1].x;
const y2 = intersectionLine.points[1].y;

ctx.fillStyle = 'rgb(255, 255, 0)';
ctx.beginPath();
ctx.arc(point.x, point.y, 10, 0, Math.PI * 2, true);
ctx.fill();

ctx.strokeStyle = 'rgb(255,0,0)';
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();

for (let i = 1; i < polygon.lines[0].length; i++) {
  const x3 = polygon.lines[0][i - 1].x;
  const y3 = polygon.lines[0][i - 1].y;
  const x4 = polygon.lines[0][i].x;
  const y4 = polygon.lines[0][i].y;

  const den = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));
  if (den === 0) console.log('eita');

  const t = (((x1 - x3) * (y3 - y4)) - ((y1 - y3) * (x3 - x4))) / den;
  const u = (((x1 - x3) * (y1 - y2)) - ((y1 - y3) * (x1 - x2))) / den;

  const intersectionPointX = x1 + t * (x2 - x1);
  const intersectionPointY = y1 + t * (y2 - y1);

  ctx.strokeStyle = 'rgb(0, 0, 255)';
  ctx.beginPath();
  polygon.lines[0].forEach(({ x, y }, i) => {
    if (i === 1) ctx.moveTo(x, y);
    ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.stroke();

  if ((t > 0 && t < 1) && u > 0 ) {
    ctx.fillStyle = 'rgb(0, 255, 0)';
    ctx.beginPath();
    ctx.arc(intersectionPointX, intersectionPointY, 10, 0, Math.PI * 2, true);
    ctx.fill();
  }
}
