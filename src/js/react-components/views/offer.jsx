import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { BannerPage } from '../shared/bannerPage.jsx';
import axios from 'axios';
import { Loader } from '../shared/loader.jsx';
import utils from '../../utils';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from 'jquery';

export class Offer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isInError: false
        }
    }
    getOfferPost() {
        axios.get('/api/getOfferPost').then(json => {
            this.setState({
                data: json.data
            });
        }).catch((onreject) => { this.setState({ isInError: true }) });
    }

    renderSection(title, photoSrc, description, topDesciption=false, urlLink, labelLink){
        const html = <div>
            <div className="text-center">
                <div className="wraper-ttl">
                    <h1>{title}</h1>
                </div>
            </div>
            {(topDesciption ? <div className="row">
                <div dangerouslySetInnerHTML={{ __html:  topDesciption}} className="columns mb2"></div>
                </div>
            : null
            )}
            <div className="row">
                <div className="columns small-12 medium-5">
                    {(photoSrc ? <img src={photoSrc} alt=""/> : null)}
                </div>
                <div className="columns small-12 medium-7">
                    <div className="desc" dangerouslySetInnerHTML={{ __html:  description}}></div>
                    <p>
                        <a className="button mt2" href={urlLink}>{labelLink}</a>
                    </p>
                </div>
            </div>
        </div>;

        return html;
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getOfferPost();
    }
    
    render() {
        if (this.state.data == null) {
            return (<Loader isInError={this.state.isInError} />);
        }
        return (
            <div className="post">
                <div className="offer">{this.renderSection(
                    this.state.data.acf.film_offer_title, 
                    (this.state.data.acf.film_offer_photo ? this.state.data.acf.film_offer_photo.sizes.large : false),
                    this.state.data.acf.film_offer_description,
                    this.state.data.acf.film_offer_description_top,
                    "/filmographie",
                    "Découvrir mes films"
                    )}
                </div>
                <div className="offer">{this.renderSection(
                    this.state.data.acf.photo_offer_title, 
                    (this.state.data.acf.photo_offer_photo ? this.state.data.acf.photo_offer_photo.sizes.large : false),
                    this.state.data.acf.photo_offer_description,
                    false,
                    "/albums",
                    "Découvrir mes albums"
                    )}
                </div>
                <div className="offer">{this.renderSection(
                    this.state.data.acf.buy_photo_title, 
                    (this.state.data.acf.buy_photo_photo ? this.state.data.acf.buy_photo_photo.sizes.large : false),
                    this.state.data.acf.buy_photo_description,
                    false,
                    "/albums",
                    "Découvrir mes albums"
                    )}
                </div>
                <div className="customer-banner">
                    <h3 className="tex-center">Ils m'ont accordé leur confiance</h3>
                    <div className="wrapper-customer-mozaic">
                        <div className="customer-mozaic">
                            <div><a href="#"><img src="../../dist/images/logos/parc-naturel-regional-du-vercors.png" /></a></div>
                            <div><a href="#"><img src="../../dist/images/logos/logo-grandangle-800x800.png" /></a></div>
                            <div><a href="#"><img src="../../dist/images/logos/logo-projet-parc-haut-jura.jpg" /></a></div>
                            <div><a href="#"><img src="../../dist/images/logos/logo-LPO38.png" /></a></div>
                            <div><a href="#"><img src="../../dist/images/logos/logo-frapna.jpg" /></a></div>
                            <div><a href="#"><img src="../../dist/images/logos/federation-leo-lagrange.jpg" /></a></div>
                            <div><a href="#"><img src="../../dist/images/logos/logo-CApluriel-OCCITANIE-Q.jpg" /></a></div>
                            <div><a href="#"><img src="../../dist/images/logos/CM-logo-quadri.png" /></a></div>
                            <div><a href="#"><img src="../../dist/images/logos/gentiana-cbna600px.jpg" /></a></div>
                            <div><a href="#"><img src="../../dist/images/logos/Logo-ADA-Occitanie.png" /></a></div>
                            <div><a href="#"><img src="../../dist/images/logos/logo-FDC.jpg" /></a></div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}