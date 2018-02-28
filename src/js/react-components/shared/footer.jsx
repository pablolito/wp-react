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
                <div className="text-center">Axel Falguier &copy; {this.date.getFullYear()} All rights reserved - Conception : <a target="_blank" href="https://github.com/pablolito/wp-react">Maxime Falguier</a></div>
            </footer>
        );

    }
}