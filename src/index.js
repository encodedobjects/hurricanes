import p5 from "p5";
import bgMap from "./images/mercator-map.png";
import { geoMercator } from "d3-geo";
import { allHurricaneData, atlanticHurricanes, pacificHurricanes } from "./data/process-data";

let bgImage;
let projection;

window.preload = () => {
  bgImage = loadImage(bgMap);
};

window.setup = () => {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  background(0);

  bgImage.resize(width * 0.9, 0);
  imageMode(CENTER);
  tint(0, 0, 100, 0.3);
  image(bgImage, width / 2, height / 2);

  // Create a mercator projection that is centered on the screen and roughly matches the map
  // graphic. This is a good reference on the d3-geo libray used here:
  // https://www.d3indepth.com/geographic/
  projection = geoMercator()
    .scale((153 / 960) * bgImage.width)
    .center([0, 0])
    .translate([width / 2, height / 2]);

  // Visualize the grid of lat/long coordinates over the map.
  fill(170, 10, 100, 0.3);
  noStroke();
  for (let lat = -90; lat <= 90; lat += 5) {
    for (let long = -180; long <= 180; long += 5) {
      const [x, y] = projection([long, lat]);
      circle(x, y, 2);
    }
  }

  // Pick the hurricanes to visualize.
  // const selected = atlanticHurricanes.reverse().slice(0, 20); // 20 most recent atlantic.
  // const selected = pacificHurricanes.reverse().slice(0, 20); // 20 most recent pacific.
  const selected = allHurricaneData;

  selected.forEach((hurricane, i) => {
    const { id, name, numDataPoints, data } = hurricane;

    // const hue = map(i, 0, selected.length - 1, 0, 360);
    let hue = 197;
    let alpha = 0.15;

    let lastPoint;
    data.forEach((dataPoint) => {
      const {
        systemStatus,
        maxWind,
        minPressure,
        recordId,
        year,
        month,
        day,
        hour,
        minute,
        lat,
        long,
      } = dataPoint;

      const point = projection([long, lat]);
      const [x, y] = point;

      if (!lastPoint) {
        lastPoint = point;
      }
      const [px, py] = lastPoint;

      const d = map(maxWind, 0, 200, 1, 10);
      fill(hue, 100, 100, alpha);
      noStroke();
      circle(x, y, d);

      if (dist(px, py, x, y) < 50) {
        const w = map(maxWind, 0, 150, 0.25, 5);
        strokeWeight(w);
        stroke(hue, 100, 100, alpha);
        noFill();
        line(px, py, x, y);
      }

      lastPoint = point;
    });
    endShape();
  });
};

window.draw = () => {
  // Not used yet.
};
