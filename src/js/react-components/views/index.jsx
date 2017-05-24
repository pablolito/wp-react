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
            let acf = data.map((v)=>v.acf)
            this.setState({data: acf});
        },
        error: (xhr, status, err) => {
            this.setState({data: err});
        }
    });
    
  }

  componentDidMount() {
    this.getSliderDatas('http://axelfalguier.com/wp-json/wp/v2/posts?filter[category_name]=filmographie');
  }


    render() {
        if(this.state.data == null){
            return (<p>Loading</p>);
        }

        
        return (
            <div className="home">
                <SliderHome data={this.state.data} />
            </div>
        );
    }
}