import React from 'react'
import $ from 'jquery';

export class Modal extends React.Component {
    constructor(props){
        super(props);
    }

    closeModal(e){
        if($(e.target).parents(".container").length===0){
            this.props.toggleModalCallback();
        }
    }

    render() {
        return (
            <div onClick={(e)=>{this.closeModal(e)}} className="modal align-middle align-center">
                <span className="close">X</span>
                <div className="container"> 
                    {this.props.children}
                </div>
            </div>
        );
    }
}