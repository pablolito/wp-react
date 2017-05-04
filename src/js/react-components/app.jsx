import React from 'react';
import {Article} from './views/article.jsx';

export class App extends React.Component {
    constructor(props){
        super(props);
    }
    
  render() {
    return (
        <Article />
    );
  }
}