import React from 'react';
import utils from '../../utils';
import { Link } from 'react-router-dom';
import $ from 'jquery';
export class BannerPage extends React.Component {
    constructor(props) {
        super(props);
    }
    renderTagsList(v, i) {
        const items = <li key={i}>{v.name}</li>;
        return items;
    }
    render() {
        const titleDecode = utils.htmlEntitiesDecode(this.props.title),
            descriptionDecode = utils.htmlEntitiesDecode(this.props.description);
        return (
            <div className="banner">
                <h1>{titleDecode}</h1>
                {(this.props.description) ? <p>{descriptionDecode}</p> : ""}
                {(this.props.tagsList) ? <ul className="inbl-list tags-list">{this.props.tagsList.map((v, i) => this.renderTagsList(v, i))}</ul> : ""}
            </div>
        );

    }
}