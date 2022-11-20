import { Point } from './entities/point.js';
import { LineString } from './entities/line-string.js';
import { Polygon } from './entities/polygon.js';
import { drawLine, drawPoint, drawPolygon } from './draw.js';
import { setFillColor, setStrokeColor, getRandomCoordinates } from './utils.js';
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
const point = new Point({ x: 300, y: 400 });

const intersectionLines = [
  new LineString([
  { x: point.x, y: point.y },
  { x: 1000, y: point.y },
  ]),
  new LineString([
    { x: point.x, y: point.y },
    { x: 0, y: point.y },
  ]),
  new LineString([
    { x: point.x, y: point.y },
    { x: point.x, y: 0 },
  ]),
  new LineString([
    { x: point.x, y: point.y },
    { x: point.x, y: 600 },
  ]),
];

setStrokeColor(ctx, 'rgb(255, 255, 0)');
drawPolygon(ctx, polygon.coordinates);

polygon.coordinates.forEach((coordinates) => {
  const intersectionPoints = [];

  intersectionLines.forEach(intersectionLine => {
    const intersections = [];

    setStrokeColor(ctx, 'rgb(100, 255, 100)');
    drawLine(ctx, intersectionLine.points);

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
        intersections.push(intersectionPoint);
  
        setFillColor(ctx, 'rgb(255, 0, 100)');
        drawPoint(ctx, intersectionPoint);
      }
    }

    const uniqueIntersections = [];
    intersections.forEach(({ x, y }) => {
      const isUnique = !uniqueIntersections.find((coordinate) => {
        return coordinate.x === x && coordinate.y === y
      });
      if (isUnique) uniqueIntersections.push({ x, y });
    });
    
    intersectionPoints.push(uniqueIntersections);
  });

  const isInPolygon = !intersectionPoints.map((coordinates) => {
    return coordinates.length % 2 === 0;
  }).some(result => result === true);

  if (isInPolygon) {
    setFillColor(ctx, 'rgb(0, 255, 0)');
    drawPoint(ctx, point);
  } else {
    setFillColor(ctx, 'rgb(255, 0, 0)');
    drawPoint(ctx, point);
  }
});