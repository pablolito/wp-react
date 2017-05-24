import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
export class Nav extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {
        return (
            <header>
                <div className="row">
                    <div className="columns small-12 medium-3 large-3">
                        <div className="logo">
                            <h1>Axel Falguier <span>Réalisateur</span></h1>
                        </div>
                    </div>
                    <div className="columns small-12 medium-9 large-9">
                        <nav>
                            <ul className="inbl-list">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/filmographie">Filmographie</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </header>
        );

    }
}