import { useEffect, useRef } from "react";


export default function InkCloud(){

const canvasRef = useRef();



useEffect(()=>{


const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");



function resize(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

}


resize();


window.addEventListener(
"resize",
resize
);



let mouse = {

x: window.innerWidth / 2,
y: window.innerHeight / 2

};



window.addEventListener(
"mousemove",
(e)=>{

mouse.x = e.clientX;
mouse.y = e.clientY;

});




const clouds = [];



function makeCloud(){


return {

x:
Math.random()*canvas.width,


y:
canvas.height +
Math.random()*400,


size:
220 +
Math.random()*250,


height:
250 +
Math.random()*350,


speed:
0.3 +
Math.random()*0.6,


wave:
Math.random()*Math.PI*2,


rotation:
(Math.random()-0.5)*0.4,


alpha:
0.08 +
Math.random()*0.12,


drift:
(Math.random()-0.5)*0.5

};


}



for(let i=0;i<15;i++){

clouds.push(
makeCloud()
);

}




function drawCloud(c){


c.wave += 0.01;



c.y -= c.speed;



const wave =
Math.sin(c.wave)*40;



const mouseForce =
(mouse.x - canvas.width/2)
*0.00004;



c.x +=
wave*0.01 +
mouseForce;



if(c.y < -500){

Object.assign(
c,
makeCloud()
);


c.y =
canvas.height+300;

}




ctx.save();



ctx.translate(
c.x,
c.y
);



ctx.rotate(
c.rotation +
Math.sin(c.wave)*0.05
);




// soft ink

ctx.filter =
"blur(45px)";



const gradient =
ctx.createRadialGradient(
0,
0,
20,
0,
0,
c.size
);



gradient.addColorStop(
0,
`rgba(0,0,0,${c.alpha})`
);


gradient.addColorStop(
0.5,
`rgba(0,0,0,${c.alpha*0.5})`
);


gradient.addColorStop(
1,
"rgba(0,0,0,0)"
);



ctx.fillStyle =
gradient;



ctx.beginPath();



ctx.ellipse(

0,

0,

c.size,

c.height,

0,

0,

Math.PI*2

);



ctx.fill();





// ink tails


ctx.filter =
"blur(20px)";



for(let i=0;i<3;i++){


ctx.fillStyle =
`rgba(0,0,0,${c.alpha*0.5})`;



ctx.beginPath();



ctx.ellipse(

Math.sin(c.wave+i)*60,

i*120,

c.size*0.25,

c.height*0.25,

0,

0,

Math.PI*2

);



ctx.fill();


}



ctx.restore();


}





function animate(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



for(const cloud of clouds){

drawCloud(cloud);

}



requestAnimationFrame(
animate
);


}



animate();



return ()=>{

window.removeEventListener(
"resize",
resize
);

};


},[]);



return (

<canvas

ref={canvasRef}

className="ink-layer"

/>

);


}