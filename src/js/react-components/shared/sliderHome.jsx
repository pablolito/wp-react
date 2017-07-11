import React from 'react'
import $ from 'jquery';
import Slider from 'react-slick';
import {Modal} from './modal.jsx';
import { Link } from 'react-router-dom';

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
      let decoded = $('<div/>').html(videoSrc.acf.contenu_video).text();
      let videoContent = <div dangerouslySetInnerHTML={{__html: decoded}}></div>
      return videoContent;
  }

  renderItem(itemValue, itemKey){
      let itemSrc = {
        backgroundImage: 'url(' + itemValue.acf.upload_photo_slider.url + ')'
      };
      let htmlContent = <div key={itemKey} className="item" style={itemSrc}>
          {(itemValue.acf.contenu_video!=="") ?
          <svg onClick={()=>this.toggleModal(itemKey)} className="icon icon-play"><use xlinkHref="dist/images/sprite-icons.svg#icon-play2" /></svg>
          : null}
          <div className={(itemValue.categories[0]=="16") ? "caption intro" : "caption"}>
            <p>{itemValue.acf.description}</p>
            {(itemValue.categories[0]=="15") ? <div className="button"><Link to={"/filmographie/"+itemValue.id}>Découvrir le projet</Link></div> : ""}
          </div>
        </div>
        return htmlContent;
  }

  renderSlideData(){
    let sortSildeData = this.data.sort(function(a,b) {return (a.slug === 'presentation' ? 1 : (a.categories[0] < b.categories[0]) ? 1 : ((b.categories[0] < a.categories[0]) ? -1 : 0) )});
    //let sortSildeData = this.data.sort(function(a) {return (a.slug === 'presentation') ? 0 : 1 });
    let result = sortSildeData.map( (v, i) => ((v && i <= 3) ? this.renderItem(v, i) : null) );
    return result;
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
           {this.renderSlideData()}
        </Slider>
      </div>
    );
  }
}