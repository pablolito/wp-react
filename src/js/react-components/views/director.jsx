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

export class Director extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isInError: false
        }
    }
    getPost() {
        axios.get('/api/getDirectorPost').then(json => {
            this.setState({
                data: json.data
            });
        }).catch((onreject) => { this.setState({ isInError: true }) });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getPost();
    }
    componentDidUpdate() {
        const anchor = this.props.location.hash.replace('#', '');
        if (anchor) {
            const domElement = ReactDOM.findDOMNode(this.refs["contact"]);
            if (domElement) {
                domElement.scrollIntoView();
            }
        }
    }
    render() {
        if (this.state.data == null) {
            return (<Loader isInError={this.state.isInError} />);
        }
        return (
            <div className="post">
                <BannerPage title={this.state.data.title.rendered} />
                <div className="cnt-center mb2 director">
                        <div className="clearfix bio">
                            <div className="img">
                                <LazyLoad height={200}>
                                <ReactCSSTransitionGroup key="1"
                                transitionName="fade"
                                transitionAppear={true}
                                transitionAppearTimeout={100}
                                transitionEnter={false}
                                transitionLeave={false}>
                                    <img src={this.state.data.acf.director_picture.url} />
                                </ReactCSSTransitionGroup>
                                </LazyLoad>
                            </div>
                            <div className="desc" dangerouslySetInnerHTML={{ __html: this.state.data.acf.director_description}}></div>
                        </div>
                   
                    {(this.state.data.acf.technical_picture.url && this.state.data.acf.technical_description) ?
                    <div className="row mt2">
                        <div style={{paddingLeft: 0}} className="columns small-12 medium-6 large-6">
                            <div dangerouslySetInnerHTML={{ __html: this.state.data.acf.technical_description }}></div>
                        </div>
                        <div style={{paddingRight: 0}} className="columns small-12 medium-6 large-6">
                            <LazyLoad height={200}>
                            <ReactCSSTransitionGroup key="1"
                                transitionName="fade"
                                transitionAppear={true}
                                transitionAppearTimeout={500}
                                transitionEnter={false}
                                transitionLeave={false}>
                                <img src={this.state.data.acf.technical_picture.url} />
                                </ReactCSSTransitionGroup>
                            </LazyLoad>
                        </div>
                    </div>
                    : null
                    }
                </div>
                <div ref="contact" className="alternative-banner">
                    <div className="cnt-center">
                        <h3 className="tex-center">Contact</h3>
                        <div className="text-center">
                            <p className="mb2">Vous souhaitez réaliser un film, vous avez besoin d’un reportage photos, vous souhaitez me commander une de mes photos, contactez moi :</p>
                            <div className="card">
                                <p><strong>axelfalguier@hotmail.com</strong></p>
                                <p>07 85 28 94 94</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}