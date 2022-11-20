export class LineString {
  constructor(points) {
    this.points = points;
    Object.freeze(this);
  }
}
