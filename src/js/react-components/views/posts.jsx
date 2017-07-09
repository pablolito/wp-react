import React from 'react';
import { Link } from 'react-router-dom';
//import { Loader } from './react-components/shared/loader.jsx';
import { PostItem } from '../shared/postItem.jsx';
import { BannerPage } from '../shared/bannerPage.jsx';
import $ from 'jquery';
export class Posts extends React.Component {
    constructor(props){
        super(props);
        this.tagsTab = [];
        this.state = {
            data: null,
            tagsData: null
        }
        this.getFilteredPost = this.getFilteredPost.bind(this);
    }
    addTagsInArray(tab){
        tab.map(item => this.tagsTab.push(item)); // loop 2
    }
    getPostsList(){
        $.getJSON( "http://axelfalguier.com/wp-json/wp/v2/posts?categories=15")
        .done(( json ) => {
            
            json.map( (item, index) => (item.tags.length > 0) ? this.addTagsInArray(item.tags) : null ); // loop 1
            this.tagsTab = this.tagsTab.filter((v, i, a) => a.indexOf(v) === i); // filter for unique value
            this.getTagsList(this.tagsTab);
            
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
    getFilteredPost(id){
        $.getJSON( "http://axelfalguier.com/wp-json/wp/v2/posts?tags="+id)
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
        console.log(item);
        let itemList = <li key={'tags'+index} onClick={()=>this.getFilteredPost(item.id)}><span>{item.name}</span></li>;
        return itemList;
    }
    componentDidMount(){
        this.getPostsList();
    }
    render() {
        //console.log(this.tagsTab);
        if(this.state.data == null){
            return (<div className="loader-container">
                <svg className="icon icon-loader"><use xlinkHref="dist/images/sprite-icons.svg#icon-spinner4" /></svg>
                </div>);
        }
        
        return (
            
            <div className="posts">
                <BannerPage title="Quelques Réalisations" description="Lorem ipsum" />
                <div className="cnt-center">
                    {(this.state.tagsData) ?
                    <ul className="inbl-list text-center filter-menu">
                        <li>Filtrer par : </li>
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