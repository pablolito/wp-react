import React from 'react'
import $ from 'jquery';

export class NoMatch extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        return(
            <h1>Oups, 404</h1>
        );
    }   
}