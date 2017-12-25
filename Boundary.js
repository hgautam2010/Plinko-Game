function Boundary(x, y, w, h)
{
  this.w = w;
  this.h = h;
  var options = {
    isStatic: true,
  }
  this.color = {
    r: 255,
    g: 255,
    b: 255
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  World.add(world, this.body);
}

Boundary.prototype.show = function()
{
  fill(this.color.r,this.color.g,this.color.b);
  stroke(255);
  var pos = this.body.position;
  push();
  translate(pos.x - this.w/2, pos.y - this.h/2);
  rect(0, 0, this.w, this.h);
  pop();
}
