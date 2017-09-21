const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
 done(null, user.id);
});

passport.deserializeUser((id, done)=> {
  User.findById(id).then((user) => {
      done(null, user);
  });
});

// Passport set up
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback', // call back route
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => { // call back function
      User.findOne({googleId: profile.id})
        .then((existingUser) => {
          if(existingUser) {
            done(null, existingUser); //the first parameter is notify that there is no error
          }
          else {
            new User({ googleId: profile.id }).save()
              .then(newUser => done(null, newUser));
          }
        })
    }
  )
);
