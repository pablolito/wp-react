import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Api } from '../../api';
import { Loader } from '../shared/loader.jsx';
import Masonry from 'react-masonry-css';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import utils from '../../utils';
import $ from 'jquery';

export class Album extends React.Component {
    constructor(props){
        super(props);
        this.api = new Api(utils.flickrApiRoute, "c8d48f26354da2f8780ee4c842330727");
        this.state = {
            photosList: null,
            albumTitle: null
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        this.getPhotosList();
        this.getAlbumInfos();
    }

    componentDidUpdate(){
        let albumLayout = ReactDOM.findDOMNode(this.refs.albumLayout);
        if(albumLayout){
            let offsetTopAlbumLayout = utils.offset(albumLayout).top;
            let windowHeight = utils.getWindowHeight();
            albumLayout.style.height = `${windowHeight - offsetTopAlbumLayout - 89}px`;
        }
    }

    getAlbumInfos(){
        this.api.getAlbumInfos(this.props.match.params.id).then(json => {
            // get album list
            this.setState({albumTitle : json.data.photoset.title._content});
        }).catch((onreject) => { this.setState({isInError: true}) });
    }

    getPhotosList(){
        this.api.getPhotosList(this.props.match.params.id).then(json => {
            // get photos list
            this.setState({photosList : json.data.photoset.photo});
        }).catch((onreject) => { this.setState({isInError: true}) });
    }

    renderPhotosList(value){
        let src = `https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}.jpg`;
        let photoItem = <div key={value.id}>
            <LazyLoad height={100}>
                <ReactCSSTransitionGroup key="1"
                    transitionName="fade"
                    transitionAppear={true}
                    transitionAppearTimeout={300}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <img src={src} />
                </ReactCSSTransitionGroup>
            </LazyLoad>
        </div>;
        return photoItem;
    }

    scrollTo(targetId){
        $('html, body').animate({
            scrollTop: $('#'+targetId).offset().top - 89
        }, 200);
    }

    renderAlbumLayout(){
        let datasPrimaryPhoto = this.state.photosList.filter(
            (e)=>{
                return e.isprimary === "1" 
            }
        );
        datasPrimaryPhoto = datasPrimaryPhoto[0];
        let src = `https://farm${datasPrimaryPhoto.farm}.staticflickr.com/${datasPrimaryPhoto.server}/${datasPrimaryPhoto.id}_${datasPrimaryPhoto.secret}_h.jpg`;
        
        let style = {
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
                    <h1># {this.state.albumTitle}</h1>
                    <span onClick={()=>this.scrollTo('photosList')} className="btn">Découvrir l'album</span>
                </div>
            </div>
        </ReactCSSTransitionGroup>
    }

    render() {
        //console.log("render");
        const breakpointColumnsObj = {
            default: 4,
            1100: 3,
            700: 2,
            500: 1
        };
        if( (this.state.photosList == null) ){
            return (<Loader isInError={this.state.isInError} />);
        }
        
        return (
            <div>
                <div ref="albumLayout" className="album-layout">
                    {this.renderAlbumLayout()}
                </div>
                <div id="photosList" className="photos-list">
                    <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                        {this.state.photosList.map((value, index)=>this.renderPhotosList(value))}
                    </Masonry>
                </div>
            </div>
        );
    }

}