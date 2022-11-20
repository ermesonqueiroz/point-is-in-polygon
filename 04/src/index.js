import { Point } from './entities/point.js';
import { LineString } from './entities/line-string.js';
import { Polygon } from './entities/polygon.js';
import { drawLine, drawPoint, drawPolygon } from './draw.js';
import { setFillColor, setStrokeColor } from './utils.js';
import { verifyIfHaveIntersectionPoint, getIntersectionPoint } from './ray.js';

const canvas = document.querySelector('#map');
const ctx = canvas.getContext('2d');

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
const point = new Point({ x: 400, y: 300 });
const intersectionLine = new LineString([
  { x: point.x, y: point.y },
  { x: 1000, y: point.y },
]);

setFillColor(ctx, 'rgb(255, 0, 255)');
drawPoint(ctx, point);

setStrokeColor(ctx, 'rgb(255, 255, 0)');
drawPolygon(ctx, polygon.coordinates);

setStrokeColor(ctx, 'rgb(0, 255, 255)');
drawLine(ctx, intersectionLine.points);

polygon.coordinates.forEach((coordinates) => {
  for (let i = 1; i < coordinates.length; i++) {
    const x1 = intersectionLine.points[0].x;
    const y1 = intersectionLine.points[0].y;
    const x2 = intersectionLine.points[1].x;
    const y2 = intersectionLine.points[1].y;
    const x3 = coordinates[i - 1].x;
    const y3 = coordinates[i - 1].y;
    const x4 = coordinates[i].x;
    const y4 = coordinates[i].y;

    const haveIntersectionPoint = verifyIfHaveIntersectionPoint(x1, y1, x2, y2, x3, y3, x4, y4);
    if (haveIntersectionPoint) {
      const intersectionPoint = getIntersectionPoint(x1, y1, x2, y2, x3, y3, x4, y4);
      setFillColor(ctx, 'rgb(255, 255, 255)');
      drawPoint(ctx, intersectionPoint);
    }
  }
});
