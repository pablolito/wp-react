import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BannerPage } from '../shared/bannerPage.jsx';
import { Loader } from '../shared/loader.jsx';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import utils from '../../utils';

export class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albumsList: null
        }
    }

    getAlbumsList() {
        axios.get('/api/getAlbumsList').then(json => {
            // get albums list
            this.setState({ albumsList: json.data.photosets.photoset });
        }).catch((onreject) => { this.setState({ isInError: true }) });
    }

    renderAlbumItem(value, index) {
        const src = `https://farm${value.farm}.staticflickr.com/${value.server}/${value.primary}_${value.secret}.jpg`
        const style = {
            background: `url(${src}) center center no-repeat`,
            backgroundSize: 'cover',
            width: '300px',
            height: '300px'
        }
        const albumsItem = <div key={value.id} className="shrink columns">
            <LazyLoad height={100}>
                <ReactCSSTransitionGroup key="1"
                    transitionName="fade"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Link to={`/albums/${value.id}`}>
                        <div style={style}></div>
                        <div className="caption">
                            <p>
                                <strong>{value.title._content}</strong>
                            </p>
                            <p>
                                {value.photos} photos
                            </p>
                        </div>
                    </Link>
                </ReactCSSTransitionGroup>
            </LazyLoad>
        </div>;
        return albumsItem;
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getAlbumsList();
    }

    render() {
        if ((this.state.albumsList == null)) {
            return (<Loader isInError={this.state.isInError} />);
        }
        return (
            <div className="albums">
                <BannerPage 
                title="Photos" 
                description="Des Alpes Françaises aux quatre coins du monde, découvrez mes plus belles images naturalistes et de reportage." />
                <div className="items-list row align-center">
                    {this.state.albumsList.map((value, index) => this.renderAlbumItem(value, index))}
                </div>
            </div>
        );

    }

}