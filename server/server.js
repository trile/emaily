require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// app.use((req, res, next) => {
//   let now = new Date().toString();
//   console.log(`${now}: ${req.method} ${req.url}`);
//   next();
// })

app.get('/', (req, res, next) => {
  res.status(200).send("Hello world!");
})

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
