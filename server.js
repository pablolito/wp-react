const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const NODE_ENV = process.env.NODE_ENV;
const jsonDevConf = (NODE_ENV == "dev") ? require("./dev-conf.json") : null;
const flickrUrlApi = "https://api.flickr.com/services/rest/";
const wpUrlApi = (NODE_ENV == "dev") ? jsonDevConf.wpUrlApi : process.env.WP_API_URL;


app.use(express.static(__dirname + '/'));

const flickrBaseParams = {
  api_key: (NODE_ENV === "production") ? process.env.FLICKR_API_KEY : jsonDevConf.flickrKeyApi,
  nojsoncallback: "1",
  user_id: "154586672@N07",
  format: "json"
}

// API flickr get request
app.get('/api/getAlbumsList', function (req, res) {
  let reqParams = {
    method : "flickr.photosets.getList"
  }
  axiosGet(reqParams, res);
});

app.get('/api/getPhotosList', function (req, res) {
  let reqParams = {
    method : "flickr.photosets.getPhotos",
    photoset_id : req.query.id
  }
  axiosGet(reqParams, res);
});


app.get('/api/getAlbumInfos', function (req, res) {
  let reqParams = {
    method : "flickr.photosets.getInfo",
    photoset_id : req.query.id
  }
  axiosGet(reqParams, res);
});

app.get('/api/getPhotoDetails', function (req, res) {
  let reqParams = {
    method : "flickr.photos.getInfo",
    photo_id : req.query.id
  }
  axiosGet(reqParams, res);
});

// API WP get request
app.get('/api/getAllPostsHome', function (req, res) {
  simpleAxiosGet(`${wpUrlApi}/posts?categories=16,15`, res);
});

app.get('/api/getAllPosts', function (req, res) {
  simpleAxiosGet(`${wpUrlApi}/posts?categories=15&per_page=50`, res);
});

app.get('/api/getPost', function (req, res) {
  simpleAxiosGet(`${wpUrlApi}/posts/${req.query.id}`, res);
});

app.get('/api/getPostsByTags', function (req, res) {
  simpleAxiosGet(`${wpUrlApi}/posts?tags=${req.query.id}`, res);
});

app.get('/api/getTagsList', function (req, res) {
  simpleAxiosGet(`${wpUrlApi}/tags?include=${req.query.id}`, res);
});

app.get('/api/getDirectorPost', function (req, res) {
  simpleAxiosGet(`${wpUrlApi}/posts/269`, res);
});

app.get('/api/getOfferPost', function (req, res) {
  simpleAxiosGet(`${wpUrlApi}/posts/503`, res);
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});


function axiosGet(objParams, res){
  axios.get(flickrUrlApi, {
    params: Object.assign(flickrBaseParams, objParams)
  }).then((response) => {
      let json = response.data;
      res.send(json);
    })
    .catch((err) => {
      res.send(err);
    })
}

function simpleAxiosGet(url, res){
  axios.get(url).then((response) => {
    let json = response.data;
    res.send(json);
  })
  .catch((err) => {
    res.send(err);
  })
}


// Heroku bydefault set an ENV variable called PORT=443
//  so that you can access your site with https default port.
// Falback port will be 8080; basically for pre-production test in localhost
// You will use $ npm run prod for this
app.listen(process.env.PORT || 8090);