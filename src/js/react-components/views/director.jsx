import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { BannerPage } from '../shared/bannerPage.jsx';
import { Api } from '../../api';
import { Loader } from '../shared/loader.jsx';
import utils from '../../utils';
import $ from 'jquery';

export class Director extends React.Component {
    constructor(props){
        super(props);
        this.api = new Api(utils.apiRoute);
        this.state = {
            data: null,
            isInError: false
        }
    }
    getPost(){
        this.api.getDirectorPost().then(json => {
            this.setState({
                data : json
            });
        }).catch((onreject) => { this.setState({isInError: true}) });
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
            return (<Loader isInError={this.state.isInError} />);
        } 

        return (
            <div className="post">
                <BannerPage title={this.state.data.title.rendered} />
                <div className="cnt-center mb2">
                    <div className="row">
                        <div className="columns small-12 medium-7 large-7">
                            <img src={this.state.data.acf.director_picture.url} />
                        </div>
                        <div className="columns small-12 medium-5 large-5">
                            <div dangerouslySetInnerHTML={{__html: this.state.data.acf.director_description}}></div>
                        </div>
                    </div>
                </div>
                <div className="customer-banner">
                    <h3 className="tex-center">Ils m'ont accordé leur confiance</h3>
                    <div className="wrapper-customer-mozaic">
                    <div className="customer-mozaic">
                        <a href="#"><img src="http://axelfalguier.com/wp-content/uploads/2016/10/Logo_LPO38.png" /></a>
                        <a href="#"><img src="http://axelfalguier.com/wp-content/uploads/2017/08/picture.jpg" /></a>
                        <a href="#"><img src="http://axelfalguier.com/wp-content/uploads/2017/08/fne-logo-2016-cover-1.jpg" /></a>
                        <a href="#"><img src="http://axelfalguier.com/wp-content/uploads/2017/08/picture.jpg" /></a>
                        <a href="#"><img src="http://axelfalguier.com/wp-content/uploads/2016/10/Logo_LPO38.png" /></a>
                        <a href="#"><img src="http://axelfalguier.com/wp-content/uploads/2017/08/fne-logo-2016-cover-1.jpg" /></a>
                        <a href="#"><img src="http://axelfalguier.com/wp-content/uploads/2017/08/picture.jpg" /></a>
                        <a href="#"><img src="http://axelfalguier.com/wp-content/uploads/2017/08/fne-logo-2016-cover-1.jpg" /></a>
                        <a href="#"><img src="http://axelfalguier.com/wp-content/uploads/2017/08/fne-logo-2016-cover-1.jpg" /></a>
                    </div>
                    </div>
                </div>
                <div ref="contact" className="alternative-banner">
                    <div className="cnt-center">
                        <h3 className="tex-center">Contact</h3>
                        <div className="text-center">
                            <p className="mb2">Vous souhaitez en savoir plus sur mes projets n'hésitez pas à me contacter.</p>
                            <div className="card">
                                <p><strong></strong></p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}