function Particle(x, y, r, stat)
{
  this.r = r;
  var options = {
    isStatic: stat,
    restitution: 0.5,
    friction: 0,
    label: 'particle'
  }
  this.color = {
    r: random(255),
    g: random(255),
    b: random(255)
  };
  if(stat)
  {
    this.color = {
      r: 0,
      g: 255,
      b:0
    };
    options.label = 'plinko';
  }
  this.body = Bodies.circle(x, y, r, options);
  World.add(world, this.body);
}

Particle.prototype.show = function()
{
  fill(this.color.r,this.color.g,this.color.b);
  stroke(255);
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  ellipse(0, 0, this.r * 2);
  pop();
}

Particle.prototype.offScreen = function()
{
  var pos = this.body.position;
  if(pos.x > width + 50 || pos.x < -50 || pos.y > height)
  {
    World.remove(world,this.body);
    return true;
  }
  return false;
}
