import { useEffect, useRef } from "react";


export default function InkRipple(){


const canvasRef = useRef();



useEffect(()=>{


const canvas =
canvasRef.current;


const ctx =
canvas.getContext("2d");



function resize(){

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

}


resize();


window.addEventListener(
"resize",
resize
);




const ripples = [];




window.addEventListener(
"click",
(e)=>{


ripples.push({

x:e.clientX,

y:e.clientY,

radius:5,

opacity:0.45,

speed:
2+

Math.random()*1.5


});



});






function animate(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);




for(
let i=ripples.length-1;
i>=0;
i--
){


const r =
ripples[i];



r.radius += r.speed;

r.opacity *= 0.96;



ctx.beginPath();


ctx.arc(

r.x,

r.y,

r.radius,

0,

Math.PI*2

);



ctx.strokeStyle =
`rgba(0,0,0,${r.opacity})`;


ctx.lineWidth =
2;



ctx.stroke();




// little ink dots


for(let j=0;j<5;j++){


ctx.fillStyle =
`rgba(0,0,0,${r.opacity*0.5})`;



ctx.beginPath();


ctx.arc(

r.x +
(Math.random()-0.5)
*r.radius,

r.y +
(Math.random()-0.5)
*r.radius,

Math.random()*3,

0,

Math.PI*2

);



ctx.fill();



}




if(r.opacity < 0.02){

ripples.splice(i,1);

}


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

className="ink-ripple"

/>

);


}