const express = require('express');
const bodyParser = require('body-parser');
// test db connection
const db = require('../database/index');


let app = express();

// Let's use static files in client/dist
app.use(express.static(__dirname + '/../client/dist'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
  next();
});
app.use(bodyParser());

// don't think I need this
app.get('/null', (req, res) => {
  console.log('Loaded the page, got a new deck!');
});

let deckId = {}

// app.get('/', (req, res) => {
//   console.log('Success');
// })
// handle gets with /draw
// make api call here and then store count based on card
// return card and counts
app.get('/draw', (req, res) => {
  // TODO: Make api call to deckID doesn't exist
  // first check if deckid is defined, if not
  // create deck with 6 decks
  console.log('Success from /draw');
  res.send();
  // call api for a single card.
  // do count calculations


});





let port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
