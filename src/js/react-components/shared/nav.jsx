import React from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
export class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <div className="row collapse full-width align-middle">
                    <div className="columns small-12 medium-3 large-3">
                        <div className="logo">
                            <h1>Axel Falguier <span>Réalisateur environnement</span></h1>
                        </div>
                    </div>
                    <div className="columns small-12 medium-9 large-9 text-right">
                        <nav>
                            <ul className="inbl-list">
                                <li><NavLink activeClassName='active' to="/">Home</NavLink></li>
                                <li><NavLink activeClassName='active'  to="/filmographie">Filmographie</NavLink></li>
                                <li></li>
                                <li><NavLink activeClassName='active' to="/realisateur">Le réalisateur</NavLink></li>
                                <li><NavLink activeClassName='active' to="/contact">Contact</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </header>
        );

    }
}