# Point is in Polygon

The `point-is-in-polygon` package is a lightweight package that was developed to check if the coordinates of a point are in the coordinates of a polygon.

## Usage

```js
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

const point = new Point({
  x: 300,
  y: 400,
});

point.isInPolygon(polygon); // true
```
