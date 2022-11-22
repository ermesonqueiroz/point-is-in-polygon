import { PointData } from '../point';

export class Polygon {
  public readonly coordinates: PointData[];

  constructor(coordinates: PointData[]) {
    this.coordinates = coordinates;
    Object.freeze(this);
  }
}
