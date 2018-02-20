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

    renderSection(title, photoSrc, description, topDesciption=false){
        let html = <div>
            <div className="text-center">
                <div className="wraper-ttl">
                    <h2 className="border-ttl"><span>{title}</span></h2>
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
                    <div className="desc" dangerouslySetInnerHTML={{ __html:  description}}>
                </div>
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
                <BannerPage title={this.state.data.title.rendered} />
                <div className="offer pt0">{this.renderSection(
                    this.state.data.acf.film_offer_title, 
                    (this.state.data.acf.film_offer_photo ? this.state.data.acf.film_offer_photo.sizes.large : false),
                    this.state.data.acf.film_offer_description,
                    this.state.data.acf.film_offer_description_top)}
                </div>
                <div className="offer">{this.renderSection(
                    this.state.data.acf.photo_offer_title, 
                    (this.state.data.acf.photo_offer_photo ? this.state.data.acf.photo_offer_photo.sizes.large : false),
                    this.state.data.acf.photo_offer_description)}
                </div>
                <div className="offer">{this.renderSection(
                    this.state.data.acf.buy_photo_title, 
                    (this.state.data.acf.buy_photo_photo ? this.state.data.acf.buy_photo_photo.sizes.large : false),
                    this.state.data.acf.buy_photo_description)}
                </div>
            </div>
        );

    }

}