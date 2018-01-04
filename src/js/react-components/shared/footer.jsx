import React from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
export class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.date = new Date();
    }
    
    render() {
        return (
            <footer>
                <div className="text-center">Axel Falguier réalisation {this.date.getFullYear()} - Conception : <a target="_blank" href="https://github.com/pablolito/wp-react">pablolito</a></div>
            </footer>
        );

    }
}