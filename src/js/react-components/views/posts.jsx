import React from 'react';
import { Link } from 'react-router-dom';
import { PostItem } from '../shared/postItem.jsx';
import { BannerPage } from '../shared/bannerPage.jsx';
import { Api } from '../../api';
import utils from '../../utils'; 
import $ from 'jquery';
export class Posts extends React.Component {
    constructor(props){
        super(props);
        this.tagsTab = [];
        this.state = {
            data: null,
            tagsData: null,
            allTagsAreActive: true,
            tagActiveIndex: -1
        }
        this.getFilteredPost = this.getFilteredPost.bind(this);
        this.getPostsList = this.getPostsList.bind(this);
        this.api = new Api;
    }
    addTagsInArray(tab){
        tab.map(item => this.tagsTab.push(item)); // loop 2
    }
    getPostsList(){
        let postDataPromise = this.api.get("http://axelfalguier.com/wp-json/wp/v2/posts?categories=15");
        postDataPromise.then(json => {
            json.map( (item, index) => (item.tags.length > 0) ? this.addTagsInArray(item.tags) : null ); // loop 1
            this.tagsTab = this.tagsTab.filter((v, i, a) => a.indexOf(v) === i); // filter for unique value
            this.getTagsList(this.tagsTab);
            this.setState({
                data : json,
                allTagsAreActive: true,
                tagActiveIndex: -1
            });
        }).catch(error => console.log(error));
    }
    getFilteredPost(id, index){
        $.getJSON( "http://axelfalguier.com/wp-json/wp/v2/posts?tags="+id)
        .done(( json ) => {
            this.setState({
                data : json,
                allTagsAreActive: false,
                tagActiveIndex: index
            });
        })
        .fail(( jqxhr, textStatus, error ) => {
            this.setState({
                data : error
            });
        });
    }
    getTagsList(idList){
        $.getJSON( "http://axelfalguier.com/wp-json/wp/v2/tags?include="+idList.toString())
        .done(( json ) => {
            this.setState({
                tagsData : json
            });
        })
        .fail(( jqxhr, textStatus, error ) => {
            this.setState({
                tagsData : error
            });
        });
    }

    renderTagsList(item, index){
        let itemList = <li className={(this.state.tagActiveIndex === index) ? 'active' : ''} key={'tags'+index} onClick={()=>this.getFilteredPost(item.id, index)}><span>{item.name}</span></li>;
        return itemList;
    }

    componentDidMount(){
        this.getPostsList();
    }

    componentDidUpdate(){
        if(! utils.isSmallScreen()){
            let tab = [],
            mozaicHeight,
            imgGrpMaxHeight;
            let nbCol = Math.ceil(($('.img-group').length) / 2);
            $('.img-group').each(function(){
                tab.push($(this).outerHeight());
            });
            imgGrpMaxHeight = tab.sort(function(a,b){ return (a - b); }).pop();
            mozaicHeight = imgGrpMaxHeight*nbCol;
            $(".mozaic").css({'max-height': mozaicHeight});
        } 
    }
    render() {
        if(this.state.data == null){
            return (<div className="loader-container">
                <svg className="icon icon-loader"><use xlinkHref="dist/images/sprite-icons.svg#icon-spinner4" /></svg>
                </div>);
        }
        
        return (
            <div className="posts">
                <BannerPage title="Quelques Réalisations" description="Lorem ipsum" />
                <div className="cnt-center mt2">
                    {(this.state.tagsData) ?
                    <ul className="inbl-list text-center filter-menu">
                        <li>Thématiques : </li>
                        <li className={(this.state.allTagsAreActive) ? "active" : ""} onClick={()=>this.getPostsList()}><span>Toutes</span></li>
                        {this.state.tagsData.map((item, index) => this.renderTagsList(item, index))} 
                    </ul>
                    : ""
                    }
                    <div className="mozaic">
                        {this.state.data.map(
                            (item, index) => <PostItem key={'post'+index} data={item} />
                        )}
                    </div>
                </div>
            </div>
        );

    }

}