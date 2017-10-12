const passport = require('passport');

module.exports = (app) => {

  /* This route will use passport to forward user to Google login and return a code */
  app.get('/auth/google',
    passport.authenticate('google', { // this string 'google' tie with the above GoogleStrategy
      scope: ['profile', 'email'] //what can we access
    })
  );

  /* This route will use passport to handle the call back from the above route */
  /* Check the passport config to see the callback route and call back function */
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
    res.redirect('/surveys');
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect("/");
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  })
}
