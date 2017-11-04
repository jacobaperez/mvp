const express = require('express');
const bodyParser = require('body-parser');
// test db connection
const db = require('../database/index');
// const deckfetcher = require('./deckfetcher');
const request = require('request');


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
  console.log(deckId['deckId']);
  console.log('Success from /draw');
  // If deck has not been gotten then get a new deck.
  if (!deckId["deckId"]) {
    let options = {
      url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`,
      method: 'get'
    }
    request(options, (err, response, body) => {
      if (err) {
        console.log("There was an error getting a new deck", err);
      }
      deckId["deckId"] = JSON.parse(body).deck_id;
      let newDeckImg = "http://www.soarselling.com/wp-content/uploads/2012/10/areyoureadybrain-460x355.jpg";
      res.send(newDeckImg);
    })
  } else {
    let options = {
      url: `https://deckofcardsapi.com/api/deck/${deckId["deckId"]}/draw/?count=1`,
      method: 'get'
    }
    request(options, (err, response, body) => {
      if (err) {
        console.log("There was an error getting a new deck", err);
      }
      let card = JSON.parse(body).cards[0].image;
      res.send(card);
    })

  }



  // call api for a single card.
  // do count calculations


});





let port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
