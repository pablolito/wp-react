import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
export class PostItemTest extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        
    }
    render() {
        let toto = this.props.toto;
        let decoded = $('<div/>').html(toto.acf.contenu_video).text();
        let videoContent = <div dangerouslySetInnerHTML={{__html: decoded}}></div>
        return (
            <article>
                {videoContent}
            </article>
        );

    }
}