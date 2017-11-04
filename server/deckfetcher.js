// TODO: Makes call to api and get's me a nice fresh deck.
const request = require('request');


const getNewDeck = function(number = 6) {
  let options = {
    url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${number}`,
    method: 'get'
  }
  request(options, (err, res, body) => {
    if (err) {
      console.log("There was an error getting a new deck");
      console.log(err);
    }
    let deck = JSON.parse(body);
  })

}

module.exports = getNewDeck;
