import React from 'react'
import $ from 'jquery';

export class Loader extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="loader-container">
                {(! this.props.isInError) ? 
                    <svg className="icon icon-loader"><use xlinkHref="dist/images/sprite-icons.svg#icon-spinner11" /></svg>
                    :
                    <p className="error">:( impossible de charger les données !!</p>
                }
            </div>
        );
    }
}