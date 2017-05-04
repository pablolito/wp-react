import React from 'react';
import ReactDOM from 'react-dom';
import Point from './point.js';
import {Home} from './react-components/views/index.jsx';
import {Posts} from './react-components/views/posts.jsx';
import {Contact} from './react-components/views/contact.jsx';
import {Nav} from './react-components/shared/nav.jsx';
import { BrowserRouter as Router, Route, hashHistory } from 'react-router-dom';
import $ from 'jquery';

ReactDOM.render(
  <Router history={hashHistory}>
    <div>
      <Nav />
      <Route exact path="/" component={Home}/>
      <Route path="/filmographie" component={Posts}/>
      <Route path="/contact" component={Contact}/>
    </div>
  </Router>,
   document.getElementById('app')
);



