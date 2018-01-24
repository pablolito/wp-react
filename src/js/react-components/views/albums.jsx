import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { BannerPage } from '../shared/bannerPage.jsx';
import { Api } from '../../api';
import { Loader } from '../shared/loader.jsx';
import utils from '../../utils';
export class Albums extends React.Component {
    constructor(props){
        super(props);
        this.api = new Api(utils.flickrApiRoute, "c8d48f26354da2f8780ee4c842330727");
        this.state = {
            albumsList: null
        }
    }

    getAlbumsList(){
        this.api.getAlbumsList().then(json => {
            // get albums list
            this.setState({albumsList : json.data.photosets.photoset});
        }).catch((onreject) => { this.setState({isInError: true}) });
    }
    renderAlbumItem(value, index){
        let src = `https://farm${value.farm}.staticflickr.com/${value.server}/${value.primary}_${value.secret}.jpg`
        let style = {
            background: `url(${src}) 50% 50% no-repeat`,
            backgroundSize: 'cover',
            width: '350px',
            height: '350px'
        }
        let albumsItem = <div key={value.id} className="cell small-12 medium-6">
            <Link to={`/album/${value.id}`}>
                <div style={style}></div>
                <div className="caption">
                    <p>
                        {value.title._content}
                    </p>
                    <p>
                        <strong>{value.photos} photos</strong>
                    </p>
                </div>
            </Link>
        </div>;
        return albumsItem;
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        this.getAlbumsList();
    }


    render() {
        if( (this.state.albumsList == null) ){
            return (<Loader isInError={this.state.isInError} />);
        }
        return (
            <div className="albums">
                <BannerPage title="Photos" />
                <div className="items-list row">
                    {this.state.albumsList.map((value, index)=>this.renderAlbumItem(value, index))}
                </div>
            </div>
        );

    }

}