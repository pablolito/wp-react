import React from 'react';
//import { Loader } from './react-components/shared/loader.jsx';
import { BannerPage } from '../shared/bannerPage.jsx';
import utils from '../../utils';
import $ from 'jquery';

export class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            tagsData: null
        }
    }
    getPostTagsList(articleId){
        $.getJSON( "http://axelfalguier.com/wp-json/wp/v2/tags?post="+articleId)
        .done(( json ) => {
            this.setState({
                tagsData : json
            });
        })
        .fail(( jqxhr, textStatus, error ) => {
            this.setState({
                tagsData : json
            });
        });
        
    }
    getPost(articleId){
        $.getJSON( "http://axelfalguier.com/wp-json/wp/v2/posts/"+articleId)
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
    
    renderItemsList(data){
        let html = data.map((v,i) => <li dangerouslySetInnerHTML={{__html: v}} key={i}></li>);
        return html;
    }
    
  
    componentDidMount(){
        this.getPost(this.props.match.params.id);
        this.getPostTagsList(this.props.match.params.id);
        
    }
    render() {
        if(this.state.data == null){
            return (<div className="loader-container">
                <svg className="icon icon-loader"><use xlinkHref="/dist/images/sprite-icons.svg#icon-spinner4" /></svg>
                </div>);
        } 
        let embedVideo = $('<div/>').html(this.state.data.acf.contenu_video).text();
        embedVideo = <div dangerouslySetInnerHTML={{__html: embedVideo}}></div>;

        return (
            <div className="post">
                <BannerPage title={this.state.data.title.rendered} description="" tagsList={this.state.tagsData} returnLink={true} />
                <div className="cnt-center">
                    <div className="row">
                        <div className="columns small-12 medium-7 large-7">
                            {embedVideo}
                        </div>
                        <div className="columns small-12 medium-5 large-5">
                            <div className="project-info">
                                {(this.state.data.acf.client && this.state.data.acf.client[0]!=="") ?
                                    <ul className="inbl-list client">
                                        {this.renderItemsList(this.state.data.acf.client)}
                                    </ul>
                                    : ""
                                }
                                {(this.state.data.acf.mission && this.state.data.acf.mission[0]!=="") ?
                                    <ul className="inbl-list">
                                        <li><strong>Missions</strong> :</li>
                                        {this.renderItemsList(this.state.data.acf.mission)}
                                    </ul>
                                    : ""
                                }
                                {(this.state.data.acf.movie_time) ?
                                    <p className="time"><strong>Durée du film</strong> : {this.state.data.acf.movie_time}</p>
                                    : ""
                                }
                                {(this.state.data.acf.equipment && this.state.data.acf.equipment[0]!=="") ? 
                                    <ul className="inbl-list">
                                        <li><strong>Matériels : </strong></li>
                                        {this.renderItemsList(this.state.data.acf.equipment)}
                                    </ul>
                                    :
                                    ""
                                }
                            </div>
                            {/* {utils.htmlEntitiesDecode(this.state.data.acf.contenu_article)} */}
                            <div dangerouslySetInnerHTML={{__html: this.state.data.acf.contenu_article}}></div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}