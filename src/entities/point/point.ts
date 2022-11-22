import { PointData } from './point-data';

export class Point {
  public readonly x: number;
  public readonly y: number;

  constructor({ x, y }: PointData) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }
}
