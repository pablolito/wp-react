import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PostItem } from '../shared/postItem.jsx';
import { BannerPage } from '../shared/bannerPage.jsx';
import { Loader } from '../shared/loader.jsx';
import utils from '../../utils';
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
    }

    addTagsInArray(tab){
        tab.map(item => this.tagsTab.push(item));
    }

    getPostsList(){
        axios.get('/api/getAllPosts').then(json => {
            // get tags list 
            // json.data.map( (item, index) => (item.tags.length > 0) ? this.addTagsInArray(item.tags) : null ); // loop 1
            // this.tagsTab = this.tagsTab.filter((v, i, a) => a.indexOf(v) === i); // filter for unique value
            // this.getTagsList(this.tagsTab);
            // put json data in state
            this.setState({
                data : json.data,
                allTagsAreActive: true,
                tagActiveIndex: -1
            });
        }).catch((onreject) => { this.setState({isInError: true}) });
    }

    getFilteredPost(id, index){
        axios.get('/api/getPostsByTags/?id='+id).then(json => {
            this.setState({
                data : json.data,
                allTagsAreActive: false,
                tagActiveIndex: index
            });
        }).catch((onreject) => {this.setState({isInError: true})});
    }

    getTagsList(idList){
        axios.get('/api/getPostsByTags/?id='+idList.toString()).then(json => {
            this.setState({
                tagsData : json.data
            });
        }).catch((onreject) => { this.setState({isInError: true}) });
    }

    renderTagsList(item, index){
        const itemList = <li className={(this.state.tagActiveIndex === index) ? 'active' : ''} key={'tags'+index} onClick={()=>this.getFilteredPost(item.id, index)}><span>{item.name}</span></li>;
        return itemList;
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        this.getPostsList();
    }


    render() {
        if( (this.state.data == null) ){
            return (<Loader isInError={this.state.isInError} />);
        }
        
        const sortDataByPush = this.state.data.sort(function(a,b) {return (a.acf.push_home > b.acf.push_home) ? -1 : ((b.acf.push_home > a.acf.push_home) ? 1 : 0);} );
        console.log(this.state.data);

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
                        {sortDataByPush.map(
                            (item, index) => <PostItem key={'post'+index} data={item} />
                        )}
                    </div>
                </div>
            </div>
        );

    }

}