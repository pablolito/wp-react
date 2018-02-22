import React from 'react'
import $ from 'jquery';

export class Modal extends React.Component {
    constructor(props){
        super(props);
        this.listenerKeyUp = this.listenerKeyUp.bind(this);
    }

    listenerKeyUp(e) {
        if(e.keyCode === 27){
            this.props.toggleModalCallback();
        }
    }

    componentDidMount(){
        window.addEventListener("keyup", this.listenerKeyUp);
    }

    componentWillUnmount(){
        window.removeEventListener("keyup", this.listenerKeyUp);
    }

    closeModal(e){
        if($(e.target).parents(".container").length===0){
            this.props.toggleModalCallback();
        }
    }

    render() {
        return (
            <div ref={(element) => this.modal = element} onClick={(e)=>{this.closeModal(e)}} className="modal align-middle align-center">
                <span className="close">X</span>
                <div className="container"> 
                    {this.props.children}
                </div>
            </div>
        );
    }
}