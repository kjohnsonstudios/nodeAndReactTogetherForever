const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

getData = (fileName, type) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, type, (err, data) => {
        err ? reject(err) : resolve(data);
    });
  });
}

app.get('/api/people', (req, res) => {
  try{
    getData("data/example.txt", "utf8")
    .then((express) => {
      res.send({ express });
    })
    .catch(error => {
      console.warn("ERR IS KYLE: ",error)
      res.send({ express: 'KYLE Error From Express' });
    });
  } catch (err) {
    console.warn("ERR IS: ",err)
    res.send({ express: 'Error From Express' });
  }
});

app.post('/api/search', (req, res) => {
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