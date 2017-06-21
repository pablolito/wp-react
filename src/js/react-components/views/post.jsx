import React from 'react';
import { Link } from 'react-router-dom';
//import { Loader } from './react-components/shared/loader.jsx';
import $ from 'jquery';

export class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
        }
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
    componentDidMount(){
        this.getPost(this.props.match.params.id);
    }
    render() {
        if(this.state.data == null){
            return (<div className="loader-container">
                <svg className="icon icon-loader"><use xlinkHref="/dist/images/sprite-icons.svg#icon-spinner4" /></svg>
                </div>);
        }
        console.log(this.state.data); 
        return (
            
            <div className="post">
                <div className="cnt-center">
                    <p>{this.state.data.acf.contenu_article}</p>
                </div>
            </div>
        );

    }

}