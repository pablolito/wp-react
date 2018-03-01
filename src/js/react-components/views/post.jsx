import React from 'react';
import { BannerPage } from '../shared/bannerPage.jsx';
import axios from 'axios';
import { Loader } from '../shared/loader.jsx';
import utils from '../../utils';
import $ from 'jquery';

export class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            tagsData: null,
            isInError: false
        }
    }
   
    getPost(articleId) {
        axios.get('/api/getPost/?id='+articleId).then(json => {
            this.setState({
                data: json.data
            });
        }).catch((onreject) => { this.setState({ isInError: true }) });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getPost(this.props.match.params.id);
        utils.footerFixed();
    }

    render() {
        if (this.state.data == null) {
            return (<Loader isInError={this.state.isInError} />);
        }
        let embedVideo = $('<div/>').html(this.state.data.acf.contenu_video).text();
        embedVideo = <div dangerouslySetInnerHTML={{ __html: embedVideo }}></div>;
        let embedTrailer = $('<div/>').html(this.state.data.acf.trailer).text();
        embedTrailer = <div dangerouslySetInnerHTML={{ __html: embedTrailer }}></div>;

        return (
            <div className="post">
                <BannerPage title={this.state.data.title.rendered} />
                <div className="cnt-center">

                    <div className="row">
                        <div className="columns small-12 medium-6 large-6">
                            {embedVideo}
                        </div>
                        <div className="columns small-12 medium-6 large-6">
                            {(this.state.data.acf.movie_time) ?
                                <div className="mb05">
                                    <p className="time"><strong>Durée du film</strong> : {this.state.data.acf.movie_time}</p>
                                </div>
                                : null
                            }
                            <div dangerouslySetInnerHTML={{ __html: this.state.data.acf.contenu_article }}></div>
                            {(this.state.data.acf.detail_tech) ?
                                <div className="info mt2">
                                    <strong>Détails techniques du tournage :</strong>
                                    <div dangerouslySetInnerHTML={{ __html: this.state.data.acf.detail_tech }}></div>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    {(this.state.data.acf.trailer && this.state.data.acf.trailer_caption) ?
                        <div className="other mt2">
                            <div className="grid-x">
                                <div className="columns small-12 medium-4 large-4">
                                    <h3>Vidéos liées aux projets : </h3>
                                </div>
                            </div>
                            <div className="grid-x">
                                <div className="columns small-12 medium-4 large-4">
                                    <div className="trailer">
                                        {embedTrailer}
                                    </div>
                                    <div className="info"><p>{this.state.data.acf.trailer_caption}</p></div>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>
        );

    }

}