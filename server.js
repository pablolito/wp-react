const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const NODE_ENV = process.env.NODE_ENV;
const jsonDevConf = (NODE_ENV == "dev") ? require("./dev-conf.json") : null;

const flickrUrlApi = "https://api.flickr.com/services/rest/";
const wpUrlApi = "http://axelfalguier.com/wp-json/";


// Since the root/ dir contains our index.html
app.use(express.static(__dirname + '/'));

const flickrBaseParams = {
  api_key: (NODE_ENV == "prod") ? process.env.FLICKR_API_KEY : jsonDevConf.flickrKeyApi,
  nojsoncallback: "1",
  user_id: "154586672@N07",
  format: "json"
}

// API get request
app.get('/api/getAlbumsList', function (req, res) {
  let reqParams = {
    method : "flickr.photosets.getList"
  }
  axios.get(flickrUrlApi, {
    params: Object.assign(flickrBaseParams, reqParams)
  }).then((response) => {
      let json = response.data;
      res.send(json);
    })
    .catch((err) => {
      res.send(err);
    })
});

app.get('/api/getPhotosList', function (req, res) {
  let reqParams = {
    method : "flickr.photosets.getPhotos",
    photoset_id : req.query.id
  }
  axios.get(flickrUrlApi, {
    params: Object.assign(flickrBaseParams, reqParams)
  }).then((response) => {
      let json = response.data;
      res.send(json);
    })
    .catch((err) => {
      res.send(err);
    })
});

app.get('/api/getAlbumInfos', function (req, res) {
  let reqParams = {
    method : "flickr.photosets.getInfo",
    photoset_id : req.query.id
  }
  axios.get(flickrUrlApi, {
    params: Object.assign(flickrBaseParams, reqParams)
  }).then((response) => {
      let json = response.data;
      res.send(json);
    })
    .catch((err) => {
      res.send(err);
    })
});


// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});



// Heroku bydefault set an ENV variable called PORT=443
//  so that you can access your site with https default port.
// Falback port will be 8080; basically for pre-production test in localhost
// You will use $ npm run prod for this
app.listen(process.env.PORT || 8090);