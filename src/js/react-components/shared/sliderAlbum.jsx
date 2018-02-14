import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Slider from 'react-slick';
import axios from 'axios';
import { Modal } from './modal.jsx';
import utils from '../../utils';

export class SliderAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openModal: this.props.isVisible, photoDetail: null }
        this.toggleModal = this.toggleModal.bind(this);
        this.windowHeight = window.outerHeight;
        this.photoDetailArray = [];
        this.cpt = 0;
    }


    renderSlideData(value, index, nbSlide) {
        let src = `https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}_h.jpg`;
        let item = <div key={index}>
            <img src={src} />
            {(this.state.photoDetail) ?
                <div className="caption">{this.state.photoDetail[index].title._content}</div>
                :
                <div className="caption">Loading...</div>
            }
        </div>;
        
        // load all photo data details
        axios.get('/api/getPhotoDetails/?id='+value.id).then(json => {
            this.photoDetailArray.push(json.data.photo);
            this.cpt++;
            (this.cpt === nbSlide ? this.setState({ photoDetail: this.photoDetailArray }) : null)
        }).catch((onreject) => { this.photoDetailArray.push({}) });
        
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
            // set focus for accessibility
            domSlider.querySelector('.slick-slide').focus();
            const imgs = domSlider.querySelectorAll('img');
            // vertical align for images
            imgs.forEach((img) => {
                img.onload = () => {
                    let marginTop = (this.windowHeight / 2) - (img.height / 2);
                    img.style.marginTop = marginTop + "px";
                }
                img.style.maxHeight = this.windowHeight + "px";
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
                            {this.props.data.map((item, index) => this.renderSlideData(item, index, this.props.data.length))}
                        </Slider>
                    </Modal>
                    : null
                }
            </div>
        );
    }
}