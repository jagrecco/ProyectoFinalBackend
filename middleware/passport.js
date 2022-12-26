import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import Usuario from "../models/user.js";
/* import bcrypt from "bcrypt"; */

passport.use(new LocalStrategy(
  {
    usernameField: "email",
  },
  async (email, password, done) => {
    
    const user = await Usuario.findOne({ email: email });
    
    if (!user) {
      return done(null, false);
    }

    process.env.USERID=user._id

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return done(null, false);

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