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

app.post('/', (req, res) => {


});

// handle gets with /draw
// make api call here and then store count based on card
// return card and counts
app.get('/draw', (req, res) => {

});





let port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
