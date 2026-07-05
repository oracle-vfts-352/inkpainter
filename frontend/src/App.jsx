import MouseTracer from "./components/MouseTracer";
import InkCloud from "./components/InkCloud";
import InkRipple from "./components/InkRipple";

import Hero from "./sections/Hero";
import Transform from "./sections/Transform";
import Gallery from "./sections/Gallery";
import Settings from "./sections/Settings";

import { getGuestId } from "./services/guestService";

console.log(getGuestId());

export default function App(){


return (

<>

<InkCloud />

<MouseTracer />

<InkRipple/>

<nav>

<div className="logo">
InkPainter
</div>


<div className="links">

<a href="#hero">
Home
</a>

<a href="#transform">
Transform
</a>

<a href="#gallery">
Gallery
</a>

<a href="#settings">
Settings
</a>


</div>

</nav>



<main>


<section id="hero">

<Hero />

</section>



<section id="transform">

<Transform />

</section>



<section id="gallery">

<Gallery />

</section>



<section id="settings">

<Settings />

</section>



</main>


</>


)

}