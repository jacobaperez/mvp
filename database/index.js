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
  runningcount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  truecount: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
})

sequelize.sync();

module.exports = sequelize;
