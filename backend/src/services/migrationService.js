import pool from "../config/database.js";

export async function migrateGuestGallery(
    guestUuid,
    userId
){

    // Prevent running the migration twice
    const existing = await pool.query(

        `
        SELECT 1
        FROM guest_migrations
        WHERE guest_uuid = $1
        `,

        [guestUuid]

    );

    if(existing.rowCount > 0){

        return;

    }

    await pool.query("BEGIN");

    try{

        // Move all guest artworks to the logged-in user
        await pool.query(

            `
            UPDATE artworks

            SET

                owner_id = $1,
                guest_uuid = NULL

            WHERE

                guest_uuid = $2
            `,

            [
                userId,
                guestUuid
            ]

        );

        // Record that this guest has already been migrated
        await pool.query(

            `
            INSERT INTO guest_migrations
            (
                guest_uuid,
                user_id
            )
            VALUES
            ($1,$2)
            `,

            [
                guestUuid,
                userId
            ]

        );

        await pool.query("COMMIT");

    }

    catch(err){

        await pool.query("ROLLBACK");

        throw err;

    }

}