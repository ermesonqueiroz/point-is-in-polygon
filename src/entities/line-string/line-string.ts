import { PointData } from '../point/point-data';

export class LineString {
  private readonly points: PointData[];

  constructor(points: PointData[]) {
    this.points = points;
    Object.freeze(this);
  }
}
