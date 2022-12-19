import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import Usuario from "../models/user.js";
import bcrypt from "bcrypt";


passport.use(new LocalStrategy(
  {
    usernameField: "email",
  },
  async (email, password, done) => {
    
    const user = await Usuario.findOne({ email: email });
    process.env.USERID=user._id /* console.log(`User ID = ${user._id}`); */

    if (!user) {
      return done(null, false);
    }

    const isMatch = await user.matchPassword(password);
      if (!isMatch)
        return done(null, false);

      /* process.env.ADM=user.adm
      console.log("ADM = " + process.env.ADM) */
      return done(null, user);

  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id, (err, user) => {
    done(err, user);
  });
});

/* export default passport; */