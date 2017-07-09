import React from 'react';
import $ from 'jquery';
export class BannerPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="banner">
                <div className="filter-cover">
                    <div className="text-center">
                        <h1>{this.props.title}</h1>
                        <p><strong>{this.props.description}</strong></p>
                    </div>
                </div>
            </div>
        );

    }
}