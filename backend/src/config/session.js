import session from "express-session";

import { RedisStore } from "connect-redis";

import sessionRedis from "./sessionRedis.js";

const sessionMiddleware = session({

    store: new RedisStore({

        client: sessionRedis

    }),

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {

        secure: false,

        httpOnly: true,

        sameSite: "lax",

        maxAge: 1000 * 60 * 60 * 24 * 7

    }

});

export default sessionMiddleware;