import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Slider from 'react-slick';
import { Modal } from './modal.jsx';
import utils from '../../utils';

export class SliderAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openModal: this.props.isVisible }
        this.toggleModal = this.toggleModal.bind(this);
        this.windowHeight = window.outerHeight;
    }

    renderSlideData(value, index) {
        //console.log(value);
        let src = `https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}_h.jpg`;
        let item = <a key={index}><img src={src} /></a>;
        return item;
    }

    toggleModal() {
        this.setState({
            openModal: !this.state.openModal
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ openModal: nextProps.isVisible });
    }

    componentDidUpdate() {
        const domSlider = ReactDOM.findDOMNode(this.slider);
        if (domSlider) {
            domSlider.querySelector('.slick-slide').focus();
            const imgs = domSlider.querySelectorAll('img');
            imgs.forEach((img) => {
                img.onload = () => {
                    let marginTop = (this.windowHeight / 2) - (img.height / 2);
                    img.style.marginTop = marginTop+"px";
                }
                img.style.maxHeight = this.windowHeight+"px";
            });
        }
    }
    

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            autoplay: false,
            fade: true,
            draggable: false,
            swipe: false,
            autoplaySpeed: 6000,
            initialSlide: this.props.currentSliderIndex,
            accessibility: true
        };

        if (utils.isSmallScreen()) {
            // redefine param config for mobile
            settings.speed = 100;
            settings.swipe = true;
            settings.fade = false;
            settings.autoplay = false;
        }

        return (
            <div className="slider-album">
                {(this.state.openModal) ?
                    <Modal toggleModalCallback={this.toggleModal}>
                        <Slider ref={(slider) => { this.slider = slider }} {...settings}>
                            {this.props.data.map((item, index) => this.renderSlideData(item, index))}
                        </Slider>
                    </Modal>
                    : null
                }
            </div>
        );
    }
}