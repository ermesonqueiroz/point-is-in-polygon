export class LineString {
  public readonly points: { x: number; y: number }[];

  constructor(points: { x: number; y: number }[]) {
    this.points = points;
    Object.freeze(this);
  }
}
