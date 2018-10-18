# wp-react
### A single-page app React with React Router, Wordpress REST API and flickr API

## Install dev dependencies
npm install

## Build and launch app in local
npm start

## Dev Build
npm run build-dev

## Prod Build
npm run build-prod

## Local config
* Add a dev-conf.json file on the root directory
* Add this lines :

`{
    "flickrUrlApi" : "https://api.flickr.com/services/rest/",
    "flickrKeyApi" : "myflickrkey",
    "wpUrlApi" : "mywordpressurlapi"
}`

## TODO :
* Remove class and constructor when it is not useful (dump component)
* Optimize requests in error
* Redux implementation
* Jest tests
* Optim heroku conf var env
