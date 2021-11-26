let canvas;
function setup () {
  canvas = createCanvas(windowWidth, windowHeight);
  colorMode(HSL);
}
function windowResized () {
  resizeCanvas(windowWidth, windowHeight); 
}
function draw () {
  translate(width/2, height/2);
  rotate(millis() * 0.0001);

  stroke(0, 70, 50);
  let branches = 10;
  for (let a = 0; a < branches; a++) {
    drawingContext.save();
    rotate(((a) / branches) * TWO_PI);
    let r = 80;
    let orbits = 6;
    for (let i = 0; i < orbits; i++) {
      translate(r, 0);
      r *= 0.95;
      let speed = (i / (orbits / 2));
      let h = (i + 1) / 10
      rotate(millis() * 0.001 * speed);
      stroke((h * 360) % 360, 70, 50, 0.1);
      line(0, 0, r, 0);
    }
    drawingContext.restore();
  }
}