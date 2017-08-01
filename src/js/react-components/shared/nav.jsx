import React from 'react';
import { NavLink } from 'react-router-dom';
import utils from '../../utils';
import $ from 'jquery';
export class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = ({navIsOpen : false});
    }
    toggleMenu(e){
        if(utils.isSmallScreen()){
            this.setState({navIsOpen : !this.state.navIsOpen});
            if(! this.state.navIsOpen){
                document.body.classList.add("no-scroll");
            }else{
                document.body.classList.remove("no-scroll");
            }
        }
        
    }
    render() {
        return (
            <header>
                <div className="row collapse full-width align-middle">
                    <div className="columns small-9 medium-6 large-3">
                        <div className="logo">
                            <h1>Axel Falguier <span>Réalisateur environnement</span></h1>
                        </div>
                    </div>
                    <div className="columns small-3 medium-6 large-9 text-right">
                        <nav>
                            <svg onClick={this.toggleMenu} width="24" height="24" className="icon icon-menu hide-for-large"><use xlinkHref="dist/images/sprite-icons.svg#icon-menu" /></svg>
                            <ul className={ (this.state.navIsOpen) ? "inbl-list menu active" : "inbl-list menu" }>
                                <li><NavLink onClick={this.toggleMenu} activeClassName='active' to="/">Accueil</NavLink></li>
                                <li><NavLink onClick={this.toggleMenu} activeClassName='active'  to="/filmographie">Filmographie</NavLink></li>
                                <li><NavLink onClick={this.toggleMenu} activeClassName='active' to="/realisateur">Le réalisateur</NavLink></li>
                                <li><NavLink onClick={this.toggleMenu} key="contact" activeClassName='active' to="/realisateur#contact">Contact</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </header>
        );

    }
}