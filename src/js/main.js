import React from 'react';
import ReactDOM from 'react-dom';
import {Home} from './react-components/views/index.jsx';
import {Posts} from './react-components/views/posts.jsx';
import {Post} from './react-components/views/post.jsx';
import {Director} from './react-components/views/director.jsx';
import {Contact} from './react-components/views/contact.jsx';
import {Nav} from './react-components/shared/nav.jsx';
import {NoMatch} from './react-components/shared/noMatch.jsx';
import {Footer} from './react-components/shared/footer.jsx';
import { BrowserRouter as Router, Route, hashHistory, Switch } from 'react-router-dom';
import $ from 'jquery';
import utils from './utils';

function init(){
  utils.footerFixed();
}

ReactDOM.render(
  <Router history={hashHistory}>
    <div className="global-container">
      <Nav />
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/filmographie" component={Posts} />
          <Route path="/filmographie/:id" component={Post} />
          <Route path="/realisateur" component={Director} />
          <Route path="/contact" component={Contact} />
          <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  </Router>,
   document.getElementById('app'),
   () => {init()}
);



