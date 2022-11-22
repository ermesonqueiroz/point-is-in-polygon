import { Point } from '../point/point';

export class Polygon {
  public readonly coordinates: Point[][];

  constructor(coordinates: Point[][]) {
    this.coordinates = coordinates;
    Object.freeze(this);
  }
}
