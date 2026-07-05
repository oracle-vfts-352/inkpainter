import pool from "../config/database.js";

export async function findOrCreateUser(profile){

    const provider = profile.provider;

    const providerId = profile.id;

    const username =

        profile.displayName ||

        profile.username ||

        "User";

    const email =

        profile.emails?.[0]?.value ||

        null;

    const avatar =

        profile.photos?.[0]?.value ||

        profile._json?.avatar_url ||

        null;

    const idColumn =

        provider === "github"

            ? "github_id"

            : "google_id";

    // Look for existing user

    const existing = await pool.query(

        `SELECT *

        FROM users

        WHERE ${idColumn} = $1`,

        [providerId]

    );

    if(existing.rows.length){

        return existing.rows[0];

    }

    // Create new user

    const created = await pool.query(

        `

        INSERT INTO users

        (

            ${idColumn},

            username,

            email,

            avatar

        )

        VALUES

        ($1,$2,$3,$4)

        RETURNING *

        `,

        [

            providerId,

            username,

            email,

            avatar

        ]

    );

    return created.rows[0];

}