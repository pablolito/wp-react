import React from 'react'
import $ from 'jquery';
import Slider from 'react-slick';

export class SliderHome extends React.Component {
  constructor(props){
        super(props);
        this.data = this.props.data;
  }
  renderItem(itemValue, itemKey){
      let itemSrc = {
        backgroundImage: 'url(' + itemValue.upload_photo_slider.url + ')'
      };
      let htmlContent = <div key={itemKey}>
        <div className="item" style={itemSrc}>
          <div className="caption">
            <p>{itemValue.description}</p>
            <div className="button">Découvrir le projet</div>
          </div>
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
      draggable: false,
      arrows: false
    };
    console.log(this.data);
    
    return (
      <div>
        <Slider {...settings}>
           {this.data.map( (v, i) => ((v) && (v.upload_photo_slider.url) ? this.renderItem(v, i): null) )}
        </Slider>
      </div>
    );
  }
}