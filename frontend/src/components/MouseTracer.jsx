import {useEffect,useRef} from "react";


export default function MouseTracer(){


const canvasRef = useRef();



useEffect(()=>{


const canvas =
canvasRef.current;


const ctx =
canvas.getContext("2d");



function resize(){

canvas.width =
innerWidth;

canvas.height =
innerHeight;

}


resize();


window.addEventListener(
"resize",
resize
);



let mouse={

x:innerWidth/2,

y:innerHeight/2

};


let prev={

x:mouse.x,

y:mouse.y

};



window.addEventListener(
"mousemove",
(e)=>{

mouse.x=e.clientX;
mouse.y=e.clientY;

});




const points=[];


const MAX_POINTS=45;



for(let i=0;i<MAX_POINTS;i++){

points.push({

x:mouse.x,

y:mouse.y

});

}



const dust=[];



let speed=0;

let idleTime=0;

let width=5;




function spawnDust(x,y){


if(dust.length>200){

dust.shift();

}



dust.push({

x:x+(Math.random()-0.5)*20,

y:y+(Math.random()-0.5)*20,


vx:(Math.random()-0.5)*1,

vy:(Math.random()-0.5)*1,


life:1,


size:
Math.random()*3+1


});


}




function animate(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);




let dx =
mouse.x-prev.x;


let dy =
mouse.y-prev.y;



let raw =
Math.sqrt(
dx*dx+
dy*dy
);



speed =
speed*0.88+
raw*0.12;



const idle =
speed < 0.5;




if(idle){

idleTime+=0.03;

mouse.x +=
Math.sin(idleTime)*0.08;


mouse.y +=
Math.cos(idleTime)*0.08;


}




points[0].x +=
(mouse.x-points[0].x)*0.28;


points[0].y +=
(mouse.y-points[0].y)*0.28;




for(
let i=1;
i<points.length;
i++
){


points[i].x +=
(
points[i-1].x-
points[i].x
)*0.35;



points[i].y +=
(
points[i-1].y-
points[i].y
)*0.35;



}




width +=
(
Math.min(
18,
5+speed
)
-width
)*0.08;




for(
let i=1;
i<points.length;
i++
){


let fade =
1-i/MAX_POINTS;



ctx.strokeStyle =
`rgba(0,0,0,${0.35*fade})`;



ctx.lineWidth =
width*fade;



ctx.lineCap="round";



ctx.beginPath();


ctx.moveTo(
points[i-1].x,
points[i-1].y
);


ctx.lineTo(
points[i].x,
points[i].y
);


ctx.stroke();


}




if(!idle){

spawnDust(
mouse.x,
mouse.y
);

}




for(
let i=dust.length-1;
i>=0;
i--
){


let d=dust[i];


d.x+=d.vx;

d.y+=d.vy;


d.life*=0.94;



ctx.fillStyle =
`rgba(0,0,0,${d.life*0.35})`;



ctx.beginPath();


ctx.arc(
d.x,
d.y,
d.size,
0,
Math.PI*2
);


ctx.fill();



if(d.life<0.05){

dust.splice(i,1);

}


}





prev.x=mouse.x;

prev.y=mouse.y;



requestAnimationFrame(
animate
);



}




animate();



},[]);



return (

<canvas
ref={canvasRef}
className="mouse-tracer"
/>

);


}