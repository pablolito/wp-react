import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
//import { Loader } from './react-components/shared/loader.jsx';
import { BannerPage } from '../shared/bannerPage.jsx';
import utils from '../../utils';
import $ from 'jquery';

export class Director extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
        }
    }
    getPost(articleId){
        $.getJSON( "http://axelfalguier.com/wp-json/wp/v2/posts/269")
        .done(( json ) => {
            this.setState({
                data : json
            });
        })
        .fail(( jqxhr, textStatus, error ) => {
            this.setState({
                data : error
            });
        });
    }
    
  
    componentDidMount(){
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
        if(this.state.data == null){
            return (<div className="loader-container">
                <svg className="icon icon-loader"><use xlinkHref="/dist/images/sprite-icons.svg#icon-spinner4" /></svg>
                </div>);
        } 

        return (
            <div className="post">
                <BannerPage title={this.state.data.title.rendered} description="Un mot sur moi et sur mon travail" />
                <div className="cnt-center">
                    <div className="row">
                        <div className="columns small-12 medium-7 large-7">
                            <img src={this.state.data.acf.director_picture.url} />
                        </div>
                        <div className="columns small-12 medium-5 large-5">
                            <div dangerouslySetInnerHTML={{__html: this.state.data.acf.director_description}}></div>
                        </div>
                    </div>
                </div>
                <div ref="contact" className="alternative-banner">
                    <div className="cnt-center">
                        <div className="row">
                            <div className="columns small-12 medium-6 large-6">
                                <div className="va-middle">
                                    Vous souhaitez en savoir plus sur mes projets n'hésitez pas à me contacter.
                                </div>
                            </div>
                            <div className="columns small-12 medium-6 large-6">
                                <p><strong>axguier@hotmail.com</strong></p>
                                <p>07 89 28 75 94</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

        );

    }

}