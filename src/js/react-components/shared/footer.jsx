import React from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
export class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <footer>
                <div className="text-center">Axel Falguier réalisations 2017 - Conception : <a target="_blank" href="https://github.com/pablolito/wp-react">pablolito</a></div>
            </footer>
        );

    }
}