require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./db/mongoose');
require('./models/user');

require('./services/passport');

let app = express();


// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// logging middlewares
app.use((req, res, next) => {
  let now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
})

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

/* catch 404 */
app.use((req, res, next) => {
    res.status(404).send("Path not found");
});

/* catch 5xx error */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

app.listen(process.env.PORT, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Starting server on PORT ${process.env.PORT}`);
  }
})

module.exports = {app};
