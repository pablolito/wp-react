import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Loader } from '../shared/loader.jsx';
import Masonry from 'react-masonry-css';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import utils from '../../utils';
import { SliderAlbum } from '../shared/sliderAlbum.jsx';
import $ from 'jquery';

export class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photosList: null,
            albumTitle: null,
            sliderIsVisible: false,
            currentSliderIndex: 0
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getPhotosList();
        this.getAlbumInfos();
    }

    componentDidUpdate() {
        const albumLayout = ReactDOM.findDOMNode(this.refs.albumLayout);
        if (albumLayout) {
            const offsetTopAlbumLayout = utils.offset(albumLayout).top;
            const windowHeight = utils.getWindowHeight();
            albumLayout.style.height = `${windowHeight - offsetTopAlbumLayout - 89}px`;
        }
    }

    getAlbumInfos() {
        axios.get('/api/getAlbumInfos/?id='+this.props.match.params.id).then(json => {
            // get album list
            this.setState({ albumTitle: json.data.photoset.title._content });
        }).catch((onreject) => { this.setState({ isInError: true }) });
    }

    getPhotosList() {
        axios.get('/api/getPhotosList/?id='+this.props.match.params.id).then(json => {
            // get photos list
            this.setState({ photosList: json.data.photoset.photo });
        }).catch((onreject) => { this.setState({ isInError: true }) });
    }

    loadSliderAlbum(index){
        this.setState({
            sliderIsVisible: true,
            currentSliderIndex: index
        });
    }

    renderPhotosList(value, index) {
        const src = `https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}.jpg`;
        const photoItem = <div key={value.id}>
            <LazyLoad height={100}>
                <ReactCSSTransitionGroup key="1"
                    transitionName="fade"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <img onClick={(e)=>this.loadSliderAlbum(index)} src={src} />
                </ReactCSSTransitionGroup>
            </LazyLoad>
        </div>;
        return photoItem;
    }

    scrollTo(targetId) {
        $('html, body').animate({
            scrollTop: $('#' + targetId).offset().top - 89
        }, 200);
    }

    renderAlbumLayout() {
        let datasPrimaryPhoto = this.state.photosList.filter(
            (e) => {
                return e.isprimary === "1"
            }
        );
        datasPrimaryPhoto = datasPrimaryPhoto[0];
        const src = `https://farm${datasPrimaryPhoto.farm}.staticflickr.com/${datasPrimaryPhoto.server}/${datasPrimaryPhoto.id}_${datasPrimaryPhoto.secret}_h.jpg`;

        const style = {
            background: `url(${src}) 0 center fixed no-repeat`,
            backgroundSize: 'cover'
        };
        return <ReactCSSTransitionGroup key="1"
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnter={false}
            transitionLeave={false}>
            <div className="album-cover" style={style}>
                <div className="caption">
                    <h1>{this.state.albumTitle}</h1>
                    <span onClick={() => this.scrollTo('photosList')} className="btn">Découvrir l'album</span>
                </div>
            </div>
        </ReactCSSTransitionGroup>
    }

    render() {
        
        const breakpointColumnsObj = {
            default: 4,
            1100: 3,
            700: 2,
            500: 1
        };
        if ((this.state.photosList == null)) {
            return (<Loader isInError={this.state.isInError} />);
        }
        return (
            <div>
                <div ref="albumLayout" className="album-layout">
                    {this.renderAlbumLayout()}
                </div>
                <div id="photosList" className="photos-list">
                    <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                        {this.state.photosList.map((value, index) => this.renderPhotosList(value, index))}
                    </Masonry>
                </div>
                <SliderAlbum currentSliderIndex={this.state.currentSliderIndex} isVisible={this.state.sliderIsVisible} data={this.state.photosList}></SliderAlbum>
            </div>
        );
    }

}