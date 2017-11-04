const sequelize = require('../index');

const addGuess = function(bool) {
  sequelize.models.guesses.create({guess: bool})
    .then( () => {
      console.log("successfully insert guess");
    })
    .catch(err => {
      console.log("could not insert guess:", err);
    })
}

const getGuessesStats = function(res) {
  sequelize.models.guesses.findAndCountAll({where :{}})
    .then( result => {
      let rights = result.rows.filter(thing => {
        return thing.dataValues.guess;
      })

      let stats = (rights.length/result.count).toFixed(2);
      console.log(rights.length, result.count, stats);
      console.log("STATS", stats)
      res.send(stats);
    })
    .catch(err => {
      console.log("Error getting the guesses!!", err);
    })
}

const clearGuesses = function() {
  sequelize.models.guesses.destroy({where: {}})
    .then( () => {
      console.log("Everything is gone yo!");
    })
    .catch(err => {
      console.log("ERROR CLEARING DATA FROM TABLE YO!", err);
    })
}

// addGuess(false);
// addGuess(false);
// addGuess(true);
// addGuess(false);
// addGuess(true);
// addGuess(false);


// getGuessesStats()


// clearGuesses();


exports.addGuess = addGuess;
exports.getGuessesStats = getGuessesStats;
exports.clearGuesses = clearGuesses;
