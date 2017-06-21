import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
export class PostItem extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        
    }
    render() {
        
        let data = this.props.data;
        console.log(data);
        let embedVideo = $('<div/>').html(data.acf.contenu_video).text();
        embedVideo = <div dangerouslySetInnerHTML={{__html: embedVideo}}></div>;
        let imageGroup = <div className="img-group">
                <img src={data.acf.upload_photo_slider.sizes.medium} />
                <caption>
                    <div>
                        <h2><span dangerouslySetInnerHTML={{__html: data.title.rendered}}></span></h2>
                        <p>{data.acf.description}</p>
                        <span className="button"><Link to={"/filmographie/"+data.id}>Voir le projet</Link></span>
                    </div>
                </caption>
                </div>
        return (
            <div className="columns">
                {imageGroup}
            </div>
        );

    }
}