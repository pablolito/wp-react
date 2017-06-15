import React from 'react';
import { Link } from 'react-router-dom';
//import { Loader } from './react-components/shared/loader.jsx';
import { PostItem } from '../shared/postItem.jsx';
import { BannerPage } from '../shared/bannerPage.jsx';
import $ from 'jquery';

export class Posts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
        }
    }
    getPostsList(category){
        $.getJSON( "http://axelfalguier.com/wp-json/wp/v2/posts?categories=15")
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
        this.getPostsList('filmographie');
    }
    render() {
        
        if(this.state.data == null){
            return (<div className="loader-container">
                <svg className="icon icon-loader"><use xlinkHref="dist/images/sprite-icons.svg#icon-spinner4" /></svg>
                </div>);
        }
         console.log(this.state.data);   
        return (
            
            <div className="posts">
                <div className="cnt-center">
                    <BannerPage title="Quelques Réalisations" description="Lorem ipsum" />
                    <ul className="inbl-list text-center filter-menu">
                        <li>Filtrer par : </li>
                        <li><span>Filtre 1</span></li>
                        <li><span>Filtre 2</span></li>
                        <li><span>Filtre 3</span></li>
                    </ul>
                    <div className="row collapse">
                        {this.state.data.map(
                            (item, index) => /*(item.acf.contenu_video !=="" ?*/ <PostItem key={'post'+index} data={item} /> /*: null)*/
                        )}
                    </div>
                </div>
            </div>
        );

    }

}