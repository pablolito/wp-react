import React from 'react'
import $ from 'jquery';
import Slider from 'react-slick';
import {Modal} from './modal.jsx';

export class SliderHome extends React.Component {
  constructor(props){
        super(props);
        this.data = this.props.data;
        this.toggleModal = this.toggleModal.bind(this);
        this.state = { movieIndex: 0, openModal: false }
  }
  toggleModal(itemKey){
    this.setState({
      openModal: !this.state.openModal,
      movieIndex: itemKey
    })
  }
  renderMovie(movieIndex){
      let videoSrc = this.data[movieIndex];
      let decoded = $('<div/>').html(videoSrc.contenu_video).text();
      let videoContent = <div dangerouslySetInnerHTML={{__html: decoded}}></div>
      return videoContent;
  }

  renderItem(itemValue, itemKey){
    //console.log(itemValue);
      let itemSrc = {
        backgroundImage: 'url(' + itemValue.upload_photo_slider.url + ')'
      };
      let htmlContent = <div key={itemKey} className="item" style={itemSrc}>
          {(itemValue.contenu_video!=="") ?
          <svg onClick={()=>this.toggleModal(itemKey)} className="icon icon-play"><use xlinkHref="dist/images/sprite-icons.svg#icon-play2" /></svg>
          : null}
          <div className={(itemValue.contenu_video!=="") ? "caption" : "caption intro"}>
            <p>{itemValue.description}</p>
            {(itemValue.contenu_video!=="") ?
            <div className="button">Découvrir le projet</div>
            :null}
          </div>
        </div>
      return htmlContent;
  }
 
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      draggable: false
    };
    
    return (
      <div>
        {(this.state.openModal) ?
        <Modal openModalCallback={this.toggleModal}>
          {this.renderMovie(this.state.movieIndex)}
        </Modal>
        : null}
        <Slider {...settings}>
           {this.data.map( (v, i) => ((v) ? this.renderItem(v, i): null) )}
        </Slider>
      </div>
    );
  }
}