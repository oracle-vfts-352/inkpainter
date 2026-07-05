import { useEffect, useState } from "react";

import { useApp } from "../context/AppContext";

import { getGuestId } from "../services/guestService";

import { useTranslation } from "../hooks/useTranslation";

import { API } from "../services/api";

export default function Gallery(){


const [images,setImages] = useState([]);

const [paused, setPaused] = useState(false);

const [index,setIndex] = useState(0);

const [loading,setLoading] = useState(true);

const {

    manageMode,

    setManageMode,

    watermark

} = useApp();

const {

    t

} = useTranslation();

async function load(){


try{

console.log("Gallery Guest:", getGuestId());

const guestUuid =
getGuestId();

const res =
await fetch(

`${API}/gallery?guestUuid=${guestUuid}`,

{

credentials:"include"

}

);


console.log(res.url);
console.log(res.status);
const data = await res.json();
/*console.log(res.url);
console.log(res.status);
console.log(await res.text());*/

console.log("Gallery API:", data);

setImages(
data.images || []
);

console.log("Updating images:", data.images);

setIndex(
    Math.max(0, data.images.length - 1)
);

}

catch(err){

console.error(err);

}


finally{

setLoading(false);

}


}

useEffect(()=>{

load();

function refresh(){

load();

}

window.addEventListener(
"gallery-refresh",
refresh
);

return ()=>{

window.removeEventListener(
"gallery-refresh",
refresh
);

};

},[]);





function next(){

if(index < images.length-1){

setIndex(index+1);

}

}




function prev(){

if(index > 0){

setIndex(index-1);

}

}





function share(){


navigator.clipboard.writeText(
window.location.href
);


alert(
t.galleryCopied
);


}





function openImage(){


window.open(
images[index].url,
"_blank"
);


}

async function removeArtwork(){

if(!window.confirm(

t.removeConfirm

)) return;

try{

    const guestUuid =
    getGuestId();

    await fetch(

        `${API}/gallery/${current.id}?guestUuid=${guestUuid}`,

        {

            method:"DELETE",

            credentials:"include"

        }

    );

    await load();

    window.dispatchEvent(

    new Event("gallery-refresh")

    );

    if(index >= images.length - 1){

        setIndex(

            Math.max(0, index - 1)

        );

    }

}
catch(err){

    console.error(err);

    alert(t.removeFailed);

}

}




if(loading){

return <h1>Loading...</h1>

}



if(!images.length){

return (

<div

id="gallery"

className="gallery-page"

>

<h1>
{t.gallery}
</h1>

<p>
{t.galleryEmpty}
</p>


</div>

)

}


console.log(images);

const current =
images[index];

return (

<div 
id="gallery"
className="gallery-page">



<div className="gallery-header">


<h1>
{t.gallery}
</h1>


<div>

<h2>
{current.artist}
</h2>


<p>
{t.joined} 2026
</p>


</div>


</div>


<div className="gallery-frame">


<img

src={current.url}

className={`gallery-image ${paused ? "paused" : ""}`}

onClick={() => setPaused(!paused)}

/>

{watermark && (

<div className="gallery-signature">

    — {current.artist}

</div>

)}

</div>


<div className="gallery-controls">


<button onClick={prev}>
←
</button>


<span>

{index+1}
/
{images.length}

</span>


<button onClick={next}>
→
</button>



</div>







<div className="gallery-actions">

{manageMode ? (

<>

<button
onClick={removeArtwork}
>

{t.removeArtwork}

</button>

<button
onClick={()=>
setManageMode(false)
}
>

{t.done}

</button>

</>

) : (

<>

<button onClick={share}>
{t.share}
</button>

<button onClick={openImage}>
{t.openLink}
</button>

</>

)}

</div>




</div>

)

}