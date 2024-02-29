const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
module.exports = function (passport) {
    passport.use(
      new LocalStrategy(
        { usernameField: "username" },
        (username, password, done) => {
          // Match user
          User.findOne({ username: username })
            .then((user) => {
              if (!user) {
                return done(null, false, {
                  message: "This username is not registered",
                });
              }
              // Match password
              bcrypt.compare(password, user.password)
                .then((isMatch) => {
                  if (isMatch) {
                    return done(null, user);
                  } else {
                    return done(null, false, { message: "Password is incorrect" });
                  }
                })
                .catch((err) => done(err));
            })
            .catch((err) => done(err));
        }
      )
    );
  
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  
    passport.deserializeUser((id, done) => {
      User.findById(id)
        .then((user) => {
          done(null, user);
        })
        .catch((err) => done(err));
    });
  };
