import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
export class PostItem extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        let data = this.props.data;
        let imageGroup = <div><img src={data.acf.upload_photo_slider.sizes.medium_large} />
                <caption>
                    <div>
                        <h2><span dangerouslySetInnerHTML={{__html: data.title.rendered}}></span></h2>
                        {(data.acf.description) ? <p dangerouslySetInnerHTML={{__html: data.acf.description}}></p> : ""}
                        <span className="button"><Link to={"/filmographie/"+data.id}>Voir le projet</Link></span>
                    </div>
                </caption></div>
                
        return (
            <div className="img-group">
                {imageGroup}
            </div>
        );
    }
}