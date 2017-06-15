import React from 'react'
import $ from 'jquery';

export class Modal extends React.Component {
    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(){
        this.props.openModalCallback();
    }

    render() {
        return (
            <div className="modal align-middle align-center">
                <span onClick={this.closeModal} className="close">X</span>
                <div className="container"> 
                    {this.props.children}
                </div>
            </div>
        );
    }
}