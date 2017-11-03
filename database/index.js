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

const Count = sequelize.define('count', {
  runningcount: Sequelize.INTEGER,
  truecount: Sequelize.FLOAT
})

sequelize.sync();

module.exports = sequelize;
