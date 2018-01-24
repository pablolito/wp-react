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
        /* to do remove this !! */
        if(utils.isMediumScreen()){
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
                    <div className="columns small-10 medium-6 large-4">
                        <div className="logo">
                            <h1><a href="/">Axel Falguier <strong>Réalisateur et photographe</strong></a></h1>
                        </div>
                    </div>
                    <div className="columns small-2 medium-6 large-8 text-right">
                        <nav>
                            <svg onClick={this.toggleMenu} width="24" height="24" className="icon icon-menu hide-for-large"><use xlinkHref="dist/images/sprite-icons.svg#icon-menu" /></svg>
                            <ul className={ (this.state.navIsOpen) ? "inbl-list menu active" : "inbl-list menu" }>
                                <li><NavLink onClick={this.toggleMenu} activeClassName='active' to="/">Accueil</NavLink></li>
                                <li><NavLink onClick={this.toggleMenu} activeClassName='active'  to="/filmographie">Filmographie</NavLink></li>
                                <li><NavLink onClick={this.toggleMenu}  activeClassName='active' to="/realisateur">A propos</NavLink></li>
                                <li><NavLink onClick={this.toggleMenu}  activeClassName='active' to="/albums">Photos</NavLink></li>
                                <li><NavLink onClick={this.toggleMenu} key="contact" activeClassName='active' to="/realisateur#contact">Contact</NavLink></li>
                                <li className="rs">
                                    <a title="Me suivre sur Facebook" target="_blank" href="https://www.facebook.com/AxelFalguierRealisateur/">
                                        <svg width="24" height="24" className="icon icon-rs"><use xlinkHref="dist/images/sprite-icons.svg#icon-facebook" /></svg>
                                    </a>
                                    <a title="Me suivre sur Vimeo" target="_blank" href="https://vimeo.com/user46118544">
                                        <svg width="24" height="24" className="icon icon-rs"><use xlinkHref="dist/images/sprite-icons.svg#icon-vimeo" /></svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </header>
        );

    }
}