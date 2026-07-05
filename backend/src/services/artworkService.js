import pool from "../config/database.js";
import { MAX_ARTWORKS } from "../config/constants.js";

export async function createArtwork({

    ownerId = null,

    guestUuid = null,

    r2Key,

    watermark = true

}){

    const result = await pool.query(

        `INSERT INTO artworks

        (

            owner_id,

            guest_uuid,

            r2_key,

            watermark

        )

        VALUES

        ($1,$2,$3,$4)

        RETURNING *`,

        [

            ownerId,

            guestUuid,

            r2Key,

            watermark

        ]

    );

    return result.rows[0];

}

export async function countGuestArtworks(guestUuid){

    console.log("countGuestArtworks guestUuid:", guestUuid);

    const result = await pool.query(

        `
        SELECT COUNT(*)
        FROM artworks
        WHERE guest_uuid = $1
        `,

        [guestUuid]

    );

    return Number(result.rows[0].count);

}

export async function countUserArtworks(ownerId){

    const result = await pool.query(

        `
        SELECT COUNT(*)
        FROM artworks
        WHERE owner_id = $1
        `,

        [ownerId]

    );

    return Number(result.rows[0].count);

}

export async function canAddArtwork({

    ownerId = null,

    guestUuid = null

}){

    const count = ownerId

        ? await countUserArtworks(ownerId)

        : await countGuestArtworks(guestUuid);

    return {

        allowed: count < MAX_ARTWORKS,

        count,

        limit: MAX_ARTWORKS

    };

}

export async function getArtworkById(id){

    const result = await pool.query(

        `
        SELECT *
        FROM artworks
        WHERE id = $1
        `,

        [id]

    );

    return result.rows[0];

}

export async function deleteArtwork(id){

    await pool.query(

        `
        DELETE FROM artworks
        WHERE id = $1
        `,

        [id]

    );

}