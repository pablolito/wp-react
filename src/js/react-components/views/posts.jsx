import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { PostItem } from '../shared/postItem.jsx';
import { BannerPage } from '../shared/bannerPage.jsx';
import { Api } from '../../api';
import { Loader } from '../shared/loader.jsx';
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
            tagActiveIndex: -1,
            isInError: false
        }
        this.getFilteredPost = this.getFilteredPost.bind(this);
        this.getPostsList = this.getPostsList.bind(this);
        this.api = new Api(utils.apiRoute);
    }

    addTagsInArray(tab){
        tab.map(item => this.tagsTab.push(item)); // loop 2
    }

    getPostsList(){
        this.api.getAllPosts().then(json => {
            // get tags list 
            json.map( (item, index) => (item.tags.length > 0) ? this.addTagsInArray(item.tags) : null ); // loop 1
            this.tagsTab = this.tagsTab.filter((v, i, a) => a.indexOf(v) === i); // filter for unique value
            //console.log(this.tagsTab);
            this.getTagsList(this.tagsTab);
            // put json data in state
            this.setState({
                data : json,
                allTagsAreActive: true,
                tagActiveIndex: -1
            });
        }).catch((onreject) => { this.setState({isInError: true}) });
    }

    getFilteredPost(id, index){
        this.api.getPostsByTags(id).then(json => {
            this.setState({
                data : json,
                allTagsAreActive: false,
                tagActiveIndex: index
            });
        }).catch((onreject) => {this.setState({isInError: true})});
    }

    getTagsList(idList){
        this.api.getTagsList(idList.toString()).then(json => {
            this.setState({
                tagsData : json
            });
        }).catch((onreject) => { this.setState({isInError: true}) });
    }

    renderTagsList(item, index){
        let itemList = <li className={(this.state.tagActiveIndex === index) ? 'active' : ''} key={'tags'+index} onClick={()=>this.getFilteredPost(item.id, index)}><span>{item.name}</span></li>;
        return itemList;
    }

    setMozaicHeight(){
        // calc mozaic height for flexbox column
        let tab = [],
        mozaicHeight,
        imgGrpMaxHeight;
        let nbCol = Math.ceil(($('.img-group').length) / 3);
        $('.img-group').each(function(){
            tab.push($(this).outerHeight());
        });
        imgGrpMaxHeight = tab.sort(function(a,b){ return (a - b); }).pop();
        mozaicHeight = imgGrpMaxHeight*nbCol;
        $(".mozaic").css({'max-height': mozaicHeight});
    }

    componentDidMount(){
        this.getPostsList();
    }
    componentDidUpdate(){
        if(! utils.isSmallScreen()){
            this.setMozaicHeight();
        }
    }

    render() {
        if( (this.state.data == null) ){
            return (<Loader isInError={this.state.isInError} />);
        }
        return (
            <div className="posts">
                <BannerPage title="Mes dernières réalisations" />
                <div>
                    {/*(this.state.tagsData) ?
                    <ul className="inbl-list text-center filter-menu">
                        <li>Thématiques : </li>
                        <li className={(this.state.allTagsAreActive) ? "active" : ""} onClick={()=>this.getPostsList()}><span>Toutes</span></li>
                        {this.state.tagsData.map((item, index) => this.renderTagsList(item, index))} 
                    </ul>
                    : ""
                    */}
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