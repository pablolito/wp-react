import React from 'react'
import $ from 'jquery';
import Slider from 'react-slick';
import { Modal } from './modal.jsx';
import { Link } from 'react-router-dom';
import utils from '../../utils';

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

  nextSlide(){
    this.slider.innerSlider.slickNext();
  }

  renderItem(itemValue, itemKey){
      let itemSrc = {
        backgroundImage: 'url(' + itemValue.acf.upload_photo_slider.url + ')',
        backgroundPosition: 'center center'
      };
      let htmlContent = <div key={itemKey} className="item" style={itemSrc}>
          {(itemValue.acf.contenu_video!=="") ?
          <svg onClick={(e)=>{this.toggleModal(itemKey)}} className="icon icon-play"><use xlinkHref="dist/images/sprite-icons.svg#icon-play2" /></svg>
          : null}
          <div className={(itemValue.categories[0]=="16") ? "caption intro" : "caption"}>
            <p dangerouslySetInnerHTML={{__html: itemValue.title.rendered}}></p>
            {(itemValue.categories[0]=="16" && itemValue.acf.description =="") ?
            <div onClick={()=>this.nextSlide()} className="btn">Découvrir mes derniers projets</div>
            :null}
            {(itemValue.categories[0]=="16" && itemValue.acf.description !=="") ? 
              <div>
                <p className="description" dangerouslySetInnerHTML={{__html: itemValue.acf.description}}></p>
              </div>
              : ""
            }
            {(itemValue.categories[0]=="15") ? <div className="button"><Link to={"/filmographie/"+itemValue.id}>Découvrir le projet</Link></div> : ""}
          </div>
        </div>
        return htmlContent;
  }

  renderSlideData(){
    let sortSlideData = this.data.sort(function(a,b) {return (a.categories[0] < b.categories[0]) ? 1 : ((b.categories[0] < a.categories[0]) ? -1 : 0) });
    this.data = sortSlideData.filter(val=>val.acf.push_home === "1");
    let result = this.data.map( (v, i) => ((v && i <= 3) ? this.renderItem(v, i) : null) );
    return result;
  }
  
 
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      autoplay: false,
      fade: true,
      draggable: false,
      swipe: false,
      autoplaySpeed: 6000,
      pauseOnHover: false
    };
    if (utils.isSmallScreen()){
      // redefine param config for mobile
      settings.speed = 100;
      settings.swipe = true;
      settings.fade = false;
      settings.autoplay = false;
    }

    return (
      <div>
        {(this.state.openModal) ?
        <Modal toggleModalCallback={this.toggleModal}>
          {this.renderMovie(this.state.movieIndex)}
        </Modal>
        : null}
        <Slider ref={(c) => {this.slider = c}} {...settings}>
            {this.renderSlideData()}
          </Slider>
      </div>
    );
  }
}