import { useTranslation } from "../hooks/useTranslation";

export default function Hero(){


const {

    t

} = useTranslation();
return (

<section
className="
min-h-[calc(100vh-90px)]
flex
items-center
justify-center
px-6
"
>

<div
className="
flex
flex-col
items-center
text-center
-translate-y-12
"
>


<h1
className="
text-8xl
font-bold
tracking-tight
text-neutral-900
"
>

InkPainter

</h1>


<p
className="
mt-8
max-w-xl
text-3xl
leading-relaxed
text-neutral-600
"
>

{t.heroSubtitle}

</p>


<button

onClick={()=>{

document
.getElementById("transform")
.scrollIntoView({
behavior:"smooth"
})

}}

className="
mt-14
px-14
py-6
rounded-full
bg-neutral-950
text-white
text-2xl
font-semibold
tracking-wide
shadow-xl

transition
duration-300

hover:scale-105
hover:shadow-2xl

active:scale-95
"

>

{t.enterStudio}

</button>


</div>


</section>

)

}