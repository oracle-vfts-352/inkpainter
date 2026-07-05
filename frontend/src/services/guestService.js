import { API } from "./api";

const KEY = "inkpainter_guest_id";

export function getGuestId(){

    let id = localStorage.getItem(KEY);

    if(!id){

        id = `guest_${crypto.randomUUID()}`;

        localStorage.setItem(KEY,id);

    }

    return id;

}

export async function migrateGuestGallery(){

    const guestUuid = getGuestId();

    await fetch(

        `${API}/auth/migrate`,

        {

            method:"POST",

            credentials:"include",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                guestUuid

            })

        }

    );

}

export function resetGuestId(){

    const id =
    `guest_${crypto.randomUUID()}`;

    localStorage.setItem(KEY,id);

    return id;

}

export function clearGuestId(){

    localStorage.removeItem(KEY);

}