var Engine = Matter.Engine,
    World = Matter.World,
		Events = Matter.Events,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var bound = []
var cols = 15;
var rows = 6;
var tune;
function preload()
{
	tune = loadSound('tune.wav');
}
function mousePressed()
{
	tune.play();
}

function collistion(event)
{
	var pairs = event.pairs;
	for(var i = 0; i < pairs.length; ++i)
	{
		var labelA = pairs[i].bodyA.label;
		var labelB = pairs[i].bodyB.label;
		if(labelA == 'plinko' && labelB == 'particle')
			tune.play();
		if(labelB == 'plinko' && labelA == 'particle')
			tune.play();
	}
}

function setup()
{
	createCanvas(1440, 840);
	engine = Engine.create();
	world = engine.world;
	world.gravity.y = 2;
	Events.on(engine, 'collisionStart', collistion);
	var spacing = width/cols;
	for (var i = 0; i < rows; i++)
	{
		for (var j = 0; j < cols + 1; j++)
		{
			var x;
			if(i%2 == 1)
				x = j * spacing;
			else
				x = spacing/2 + j * spacing;
			var y = spacing + i * spacing;
			var p = new Particle(x , y - 50, 20, true);
			particles.push(p);
		}
	}
	bound.push(new Boundary(width/2, height - 10, width, 20));

	for (var i = 0; i < cols + 1; i++)
	{
		var x = i * spacing;
		if(i == 0 || i == cols)
			h = 250;
		else
			h = 200;
		var w = 10;
		var y = height - h / 2;
		var b = new Boundary(x, y, w, h);
		bound.push(b);
	}

	Engine.run(engine);
}

function draw()
{
	background(50);
	if(frameCount % 200  == 0)
		particles.push(new Particle(width/2 + random(-width/2, width/2), 20, 20 ,false));
	for (var i = particles.length - 1; i >= 0; --i)
	{
		particles[i].show();
		if (particles[i].offScreen())
		{
			particles.splice(i, 1);
		}
	}
	for (var b of bound)
	{
		b.show();
	}
}
