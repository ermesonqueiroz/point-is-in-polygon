export class Polygon {
  constructor(coordinates) {
    this.coordinates = coordinates;
    Object.freeze(this);
  }
}
