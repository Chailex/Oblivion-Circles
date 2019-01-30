var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y: undefined,
};

var colorArray=['#FC3C3C','#F8B500','#FFF4E0','#393E46','#00ADB5'];

window.addEventListener('mousemove',function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	
});

window.addEventListener('resize',function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
	
});

var maxRadius = 60;


function Circle(x,y,dx,dy,radius,minRadius){
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.minRadius=minRadius;
	this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
	this.draw=function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0, Math.PI*2,false);
		c.fillStyle=this.color;
		c.fill();
	}
	this.update=function(){
		
				if((this.x + this.radius) > innerWidth || (this.x - this.radius) < 0){
				this.dx = -this.dx;
			}
			if((this.y + this.radius) > innerHeight || (this.y - this.radius) < 0){
				this.dy = -this.dy;
			}
			this.x += this.dx;
			this.y += this.dy;
			
			//interectivity
			if( mouse.x - this.x < 50 && mouse.x - this.x > -50
			&& mouse.y - this.y < 50 && mouse.y - this.y > -50){
				if(this.radius < maxRadius){
				this.radius += 3;}
			}else if(this.radius > this.minRadius){
				this.radius -= 3;
			}
			
			this.draw();
	}
}


var circleArray=[];

function init(){
	circleArray=[];
	for(var i=0; i<1000;i++){
	var radius = Math.random()*30+1;
	var x = Math.random()*(innerWidth-radius*2)+radius;
	var y = Math.random()*(innerHeight-radius*2)+radius;
	var dx = (Math.random()-0.5)*7;
	var dy = (Math.random()-0.5)*7;
	var minRadius = Math.random()*7+3;
	
	circleArray.push(new Circle(x,y,dx,dy,radius,minRadius));
	}};



function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	for(var j=0;j<1000;j++){
		circleArray[j].update();
	}
	
	
	
};
init();
animate();











