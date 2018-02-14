import React from 'react'
import { SliderHome } from '../shared/sliderHome.jsx';
import axios from 'axios';
import { Loader } from '../shared/loader.jsx';
import utils from '../../utils'; 

export class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            data: null,
            isInError: false
        }
    }

    componentDidMount() {
        axios.get('/api/getAllPostsHome').then((json) => {
            this.setState({data: json.data});
        }).catch((onreject) => { this.setState({isInError: true}) });
        utils.footerFixed();
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