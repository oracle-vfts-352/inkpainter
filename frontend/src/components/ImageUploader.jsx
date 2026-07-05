import { useState } from "react";
import { 
    uploadImage,
    getJobStatus
 } from "../services/storageService";

import { getGuestId } from "../services/guestService";

import { useTranslation } from "../hooks/useTranslation";

export default function ImageUploader(){


const [result,setResult] = useState(null);
const [loading,setLoading] = useState(false);

const {

    t

} = useTranslation();


async function handleFile(file){

if(!file) return;


setLoading(true);


try{

const response =
await uploadImage(
    file,
    getGuestId());

const jobId =
response.jobId;

const timer =
setInterval(async()=>{

    const job =
    await getJobStatus(jobId);

    if(job.state === "completed"){

        clearInterval(timer);

        setResult(
            job.result
        );

        setLoading(false);

        window.dispatchEvent(
            new Event("gallery-refresh")
        );

    }

    if(job.state === "failed"){

        clearInterval(timer);

        setLoading(false);

        alert("Transform failed");

    }

},2000);

return;


}
catch(err){

console.error(err);

alert(t.transformFailed);

}

}

function downloadImage(){


if(!result) return;


const a =
document.createElement("a");


a.href =
result.url;


a.download =
"inkpainter.png";


document.body.appendChild(a);


a.click();


a.remove();


}






/*function addGallery(){


if(!result) return;



const old =
JSON.parse(
localStorage.getItem("gallery") || "[]"
);



old.push({

url:
result.url,

date:
Date.now()

});



localStorage.setItem(

"gallery",

JSON.stringify(old)

);



alert("Added to Gallery");

}
*/

function addGallery(){


if(!result) return;


alert(
t.addedGallery
);


}


return (


<div className="transform-box">



{/* LEFT UPLOAD */}

<div className="upload-panel">


<h1>
{t.paintImage}
</h1>

<div className="upload-button">


<label>

{t.uploadImage}


<input

type="file"

accept="image/*"

onChange={
e =>
handleFile(
e.target.files[0]
)
}

/>


</label>


</div>

{loading && (

<p>
{t.painting}
</p>

)}

</div>

{/* RIGHT RESULT */}


<div className="result-panel">


<h2>
{t.yourArtwork}
</h2>



{result ? (


<>


<img

src={result.url}

className="result-image"

/>



<div className="actions">


<button
onClick={downloadImage}
>

{t.download}

</button>




<button
onClick={addGallery}
>

{t.addGallery}

</button>


</div>


</>


)
:
(

<p>

{t.giveLife}

</p>

)

}



</div>





</div>


);


}