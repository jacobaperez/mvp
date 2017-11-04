const express = require('express');
const bodyParser = require('body-parser');
// test db connection
const sequelize = require('../database/index');
const helpers = require('../database/controllers/controller');
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
let deckValues = {
  "2": 1,
  "3": 1,
  "4": 1,
  "5": 1,
  "6": 1,
  "7": 0,
  "8": 0,
  "9": 0,
  "10": -1,
  "JACK": -1,
  "QUEEN": -1,
  "KING": -1,
  "ACE": -1
}

app.get('/newdeck', (req, res) => {
  let options = {
    url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
    method: 'get'
  }
  request(options, (err, response, body) => {
    if (err) {
      console.log("There was an error getting a new deck", err);
    }
    deckId["deckId"] = JSON.parse(body).deck_id;
    let newDeckImg = "https://thegracecommunity.files.wordpress.com/2011/07/ready.gif";
    res.send(newDeckImg);
  })
})
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
    res.send('bad');
  } else {
    let options = {
      url: `https://deckofcardsapi.com/api/deck/${deckId["deckId"]}/draw/?count=1`,
      method: 'get'
    }
    request(options, (err, response, body) => {
      if (err) {
        console.log("There was an error getting a new deck", err);
      }
      let data = JSON.parse(body);
      let card = data.cards[0].image;
      let cardValue = deckValues[data.cards[0].value]
      let remaining = data.remaining;

      let results = [card, cardValue, remaining];
      // sequelize.models.count.create({})
      res.send(results);
    })
  }
  // call api for a single card.
  // do count calculations

});





let port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
