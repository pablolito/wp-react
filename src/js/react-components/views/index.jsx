import React from 'react'
import $ from 'jquery';
import {SliderHome} from '../shared/sliderHome.jsx';

export class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { data: null }
    }
    getSliderDatas(url) {
        $.ajax({
        url: url,
        dataType: 'json',
        success: (data) => {
            //let datas = data.map((v)=>v)
            this.setState({data: data});
        },
        error: (xhr, status, err) => {
            this.setState({data: err});
        }
    });
  }

  componentDidMount() {
    this.getSliderDatas("http://axelfalguier.com/wp-json/wp/v2/posts?categories=16,15");
  }

  componentWillMount() {
    document.body.classList.add('home');
  }
  
  componentWillUnmount() {
    document.body.classList.remove('home');
  }


    render() {
        if(this.state.data == null){
            return (<div className="loader-container">
                <svg className="icon icon-loader"><use xlinkHref="dist/images/sprite-icons.svg#icon-spinner4" /></svg>
                </div>);
        }

        
        return (
            <div className="home">
                <SliderHome data={this.state.data} />
            </div>
        );
    }
}