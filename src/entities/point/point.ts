import { LineString } from '../line-string/line-string';
import { LineStringData } from '../line-string/line-string-data';
import { PolygonData } from '../polygon/polygon-data';
import { PointData } from './point-data';

export class Point {
  public readonly x: number;
  public readonly y: number;

  constructor({ x, y }: PointData) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }

  private calc(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) {
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denominator;

    return {
      t,
      u,
    };
  }

  private haveIntersectionPoint(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ): boolean {
    const { t, u } = this.calc(x1, y1, x2, y2, x3, y3, x4, y4);

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return true;
    return false;
  }

  private getIntersectionPoint(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ): PointData {
    const { t } = this.calc(x1, y1, x2, y2, x3, y3, x4, y4);

    const intersectionPointX = x1 + t * (x2 - x1);
    const intersectionPointY = y1 + t * (y2 - y1);

    return {
      x: intersectionPointX,
      y: intersectionPointY,
    };
  }

  private createIntersectionLines(polygon: PolygonData): LineStringData[] {
    const [{ x: maxX }] = polygon.coordinates.sort((a, b) => b.x - a.x);
    const [{ x: minX }] = polygon.coordinates.sort((a, b) => a.x - b.x);
    const [{ y: maxY }] = polygon.coordinates.sort((a, b) => b.y - a.y);
    const [{ y: minY }] = polygon.coordinates.sort((a, b) => a.y - b.y);

    return [
      new LineString([
        {
          x: this.x,
          y: this.y,
        },
        {
          x: maxX,
          y: this.y,
        },
      ]),
      new LineString([
        {
          x: this.x,
          y: this.y,
        },
        {
          x: minX,
          y: this.y,
        },
      ]),
      new LineString([
        {
          x: this.x,
          y: this.y,
        },
        {
          x: this.x,
          y: maxY,
        },
      ]),
      new LineString([
        {
          x: this.x,
          y: this.y,
        },
        {
          x: this.x,
          y: minY,
        },
      ]),
    ];
  }

  public isInPolygon(polygon: PolygonData) {
    const intersectionLines = this.createIntersectionLines(polygon);
    const intersectionPoints: PointData[][] = [];

    for (let i = 1; i < polygon.coordinates.length; i++) {
      intersectionLines.forEach(intersectionLine => {
        const intersections: PointData[] = [];

        const x1 = intersectionLine.points[0].x;
        const y1 = intersectionLine.points[0].y;
        const x2 = intersectionLine.points[1].x;
        const y2 = intersectionLine.points[1].y;
        const x3 = polygon.coordinates[i - 1].x;
        const y3 = polygon.coordinates[i - 1].y;
        const x4 = polygon.coordinates[i].x;
        const y4 = polygon.coordinates[i].y;

        const haveIntersectionPoint = this.getIntersectionPoint(
          x1,
          y1,
          x2,
          y2,
          x3,
          y3,
          x4,
          y4
        );

        if (haveIntersectionPoint) {
          const intersectionPoint = this.getIntersectionPoint(
            x1,
            y1,
            x2,
            y2,
            x3,
            y3,
            x4,
            y4
          );
          intersections.push(intersectionPoint);
        }

        const uniqueIntersections: PointData[] = [];
        intersections.forEach(({ x, y }) => {
          const isUnique = !uniqueIntersections.find(coordinate => {
            return coordinate.x === x && coordinate.y === y;
          });
          if (isUnique) uniqueIntersections.push({ x, y });
        });

        intersectionPoints.push(uniqueIntersections);
      });
    }

    return !intersectionPoints
      .map(coordinates => {
        return coordinates.length % 2 === 0;
      })
      .some(result => result === true);
  }
}
