const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  try{
    fs.readFile("data/example.txt", "utf8", function(err, data){
      if(err) throw err;
      var resultArray = data;
      res.send({ express: resultArray });
    });
  } catch (err) {
    console.warn("ERR IS: ",err)
    res.send({ express: 'Error From Express' });
  }
});

app.post('/api/world', (req, res) => {
  try{
    fs.readFile("data/example.txt", "utf8", function(err, data){
      if(err) throw err;
      data = JSON.parse(data);
      data.results = data.results.filter(user => user.name.toLowerCase().includes(req.body.post));
      res.send({ express: JSON.stringify(data) });
    });
  } catch (err) {
    console.warn("ERR IS: ",err)
    res.send({ express: 'Error From Express' });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));