const express = require('express');
const app = express();

// Since the root/ dir contains our index.html
app.use(express.static(__dirname + '/'));

app.use(function(req, res, next){
  res.status(404);

  // home redirect
  if (req.accepts('html')) {
    res.render('404', res.redirect("/"));
    return;
  }

});

// Heroku bydefault set an ENV variable called PORT=443
//  so that you can access your site with https default port.
// Falback port will be 8080; basically for pre-production test in localhost
// You will use $ npm run prod for this
app.listen(process.env.PORT || 8090);