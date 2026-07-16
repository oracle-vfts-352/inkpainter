import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";

import { findOrCreateUser } from "../services/authService.js";

import prisma from "../../prisma/client.js";


//Google
passport.use(

new GoogleStrategy(

{

clientID:process.env.GOOGLE_CLIENT_ID,

clientSecret:process.env.GOOGLE_CLIENT_SECRET,

callbackURL:"http://localhost:3000/auth/google/callback"

},

async(accessToken,refreshToken,profile,done)=>{

try{

const user=

await findOrCreateUser(profile);

console.log(user);

done(null,user);

}

catch(err){

done(err);

}

}

)

);


//For Github
passport.use(

new GitHubStrategy(

{

clientID:process.env.GITHUB_CLIENT_ID,

clientSecret:process.env.GITHUB_CLIENT_SECRET,

callbackURL:

"http://localhost:3000/auth/github/callback"

},

async(

accessToken,

refreshToken,

profile,

done

)=>{

try{

const user =

await findOrCreateUser(profile);

done(null,user);

}

catch(err){

done(err);

}

}

)

);

passport.serializeUser((user,done)=>{

    done(null,user.id);

});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;