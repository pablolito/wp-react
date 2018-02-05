# wp-react
### A single-page app React with React Router, Wordpress REST API and flickr API

# View the project in production :
axelfalguier.com

## Install dev dependencies
npm install

## Build and launch app in local
npm start

## Dev Build
npm run build-dev

## Prod Build
npm run build-prod

## Local config
* Adding a dev-conf.json file on the root directory
* Adding this lines

`{
    "flickrUrlApi" : "https://api.flickr.com/services/rest/",
    "flickrKeyApi" : "myflickrkey",
    "wpUrlApi" : "mywordpressurlapi"
}`

## TODO :
* Redux implementation
* Move wp api call in express
* React tests
* Optim heroku conf var env
