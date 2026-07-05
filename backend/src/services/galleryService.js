import pool from "../config/database.js";

import{
    countGuestArtworks,
    countUserArtworks 
}
from "../services/artworkService.js";

export async function getGuestGallery(guestUuid){

    const result = await pool.query(

        `
        SELECT

            artworks.*,

            'Guest' AS artist

        FROM artworks

        WHERE guest_uuid = $1

        ORDER BY created_at DESC
        `,

        [guestUuid]

    );

    return result.rows;

}

export async function getUserGallery(ownerId){

    const result = await pool.query(

        `
        SELECT

            artworks.*,

            users.username AS artist

        FROM artworks

        JOIN users

        ON artworks.owner_id = users.id

        WHERE artworks.owner_id = $1

        ORDER BY artworks.created_at DESC
        `,

        [ownerId]

    );

    return result.rows;

}