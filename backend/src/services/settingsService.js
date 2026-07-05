import pool from "../config/database.js";

export async function getUserSettings(userId){

    let result = await pool.query(

        `
        SELECT *
        FROM user_settings
        WHERE user_id = $1
        `,

        [userId]

    );

    if(result.rows.length){

        return result.rows[0];

    }

    result = await pool.query(

        `
        INSERT INTO user_settings
        (user_id)
        VALUES($1)
        RETURNING *
        `,

        [userId]

    );

    return result.rows[0];

}

export async function updateWatermark(

    userId,

    watermark

){

    const result = await pool.query(

        `
        UPDATE user_settings

        SET

            watermark = $2,

            updated_at = NOW()

        WHERE user_id = $1

        RETURNING *
        `,

        [

            userId,

            watermark

        ]

    );

    return result.rows[0];

}