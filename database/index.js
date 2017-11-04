const Sequelize = require('sequelize');

const sequelize = new Sequelize('cardcounting', 'root', '',{
  host: 'localhost',
  dialect: 'mysql'
})

sequelize
  .authenticate()
  .then( () => {
    console.log("successfully connected to cardcounting database!");
  })
  .catch(err => {
    console.log("There was an error:", err);
  })

const Guesses = sequelize.define('guesses', {
  guess: Sequelize.BOOLEAN 
})

sequelize.sync();

module.exports = sequelize;
