import React from 'react'
import $ from 'jquery';
import {SliderHome} from '../shared/sliderHome.jsx';
import { Api } from '../../api';
import { Loader } from '../shared/loader.jsx';
import utils from '../../utils'; 

export class Home extends React.Component {
    constructor(props){
        super(props);
        this.api = new Api(utils.apiRoute);
        this.state = { 
            data: null,
            isInError: false
        }
    }

    componentDidMount() {
        this.api.getAllPostsHome().then(json => {
            this.setState({data: json});
        }).catch((onreject) => { this.setState({isInError: true}) });
    }

    componentWillMount() {
        document.body.classList.add('home');
    }
    
    componentWillUnmount() {
        document.body.classList.remove('home');
    }

    render() {
        if( (this.state.data == null) ){
            return (<Loader isInError={this.state.isInError} />);
        }

        return (
            <div className="home">
                <SliderHome data={this.state.data} />
            </div>
        );
    }
}