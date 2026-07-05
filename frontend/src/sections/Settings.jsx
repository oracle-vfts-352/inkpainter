import { useEffect, useState } from "react";

import { useTranslation } from "../hooks/useTranslation";

import { API } from "../services/api";

import {
    migrateGuestGallery,
    getGuestId
} from "../services/guestService";

import {
    resetGuestId
} from "../services/guestService";

import { useApp } from "../context/AppContext";

export default function Settings(){

const [user,setUser]=useState(null);

const [loading,setLoading]=useState(true);

const {

    setManageMode,

    language,

    setLanguage,

    watermark,

    setWatermark

} = useApp();

/*const t = language === "jp" ? jp : en;*/
const {

    t

} = useTranslation();

const [storage,setStorage] = useState({

    count:0,

    limit:20

});

useEffect(() => {

    async function load(){

        try{

            const res = await fetch(
                `${API}/auth/me`,
            {
                credentials:"include"
            }
        );
        

            const data = await res.json();

            const guestUuid = getGuestId();

            if(data.loggedIn){

                const migratedKey =
                `migrated_${guestUuid}`;

                if(!localStorage.getItem(migratedKey)){

                    await migrateGuestGallery();

                    localStorage.setItem(

                        migratedKey,

                        "true"

                    );

                }

                setUser(data.user);

                const settingsRes = await fetch(

                    `${API}/settings`,

                    {

                        credentials:"include"

                    }

                );
                

                console.log(settingsRes.url);
                console.log(settingsRes.status);
                const settings = await settingsRes.json();
                /*console.log(settingsRes.url);
                console.log(settingsRes.status);
                console.log(await settingsRes.text());*/

                setWatermark(settings.watermark);

            }

            const storageRes = await fetch(

                `${API}/gallery/storage?guestUuid=${guestUuid}`,

                {

                    credentials:"include"

                }

            );

            const storageData = await storageRes.json();

            setStorage({

                count:storageData.count,

                limit:storageData.limit

            });

        }

        catch(err){

            console.error(err);

        }

        finally{

            setLoading(false);

        }

    }

    load();

    function refreshSettings(){

        load();

    }

    window.addEventListener(

        "gallery-refresh",

        refreshSettings

    );

    return ()=>{

        window.removeEventListener(

            "gallery-refresh",

            refreshSettings

        );

    };

},[]);

function googleLogin(){

window.location.href=
`${API}/auth/google`;

}

function githubLogin(){

window.location.href =

`${API}/auth/github`;

}


async function logout(){

    await fetch(

        //'${API}/auth/logout',
        `${API}/auth/logout`,

        {

            credentials:"include"

        }

    );

    resetGuestId();

    window.location.reload();

}

async function toggleWatermark(){

    const next = !watermark;

    setWatermark(next);

    try{

        await fetch(

            `${API}/settings/watermark`,

            {

                method:"PATCH",

                credentials:"include",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    watermark:next

                })

            }

        );

    }

    catch(err){

        console.error(err);

        setWatermark(!next);

    }

}

if(loading){

return <h1>Loading...</h1>;

}

return(

<div className="settings-page">

<h1>
{t.settings}
</h1>

<div className="settings-card">

<h2>
{t.account}
</h2>

{user ? (

<>

<p className="settings-text">
Signed in as {user.username}
</p>

<p className="settings-subtext">
{user.email}
</p>

<div className="settings-buttons">

<button onClick={logout}>
{t.logout}
</button>

</div>

</>

) : (

<>

<p className="settings-text">
{t.browsingGuest}
</p>

<p className="settings-subtext">
{t.signInMessage}
</p>

<div className="settings-buttons">

<button onClick={googleLogin}>
{t.continueGoogle}
</button>

<button onClick={githubLogin}>
{t.continueGithub}
</button>

</div>

</>

)}

</div>

<div className="settings-card">

<h2>
{t.language}
</h2>

<div className="language-toggle">

<button

    onClick={() => setLanguage("en")}

    className={language === "en" ? "active" : ""}

>

English

</button>

<button

    onClick={() => setLanguage("jp")}

    className={language === "jp" ? "active" : ""}

>

日本語

</button>

</div>

</div>

<div className="settings-card">

<h2>
{t.gallery}
</h2>

<div className="setting-row">

<span>
{t.storage}
</span>

<span>
{storage.count} / {storage.limit} {t.artworks}
</span>

</div>

<div className="setting-row">

<span>
{t.watermark}
</span>

<label className="switch">

<input

    type="checkbox"

    checked={watermark}

    onChange={toggleWatermark}

    disabled={!user}

/>

<span className="slider"></span>

</label>

</div>

<button

className="manage-gallery"

onClick={()=>{

    setManageMode(true);

    document

        .getElementById("gallery")

        ?.scrollIntoView({

            behavior:"smooth"

        });

}}

>

{t.manageGallery}

</button>

</div>

</div>

);

}