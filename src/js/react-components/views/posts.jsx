import React from 'React';
import { Link } from 'react-router-dom';
//import { Loader } from './react-components/shared/loader.jsx';
import $ from 'jquery';

export class Posts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
        }
    }
    getPostsList(category){
        $.getJSON( "http://test.com/wp-json/wp/v2/posts?filter[category_name]="+category)
        .done(( json ) => {
            this.setState({
                data : json
            });
        })
        .fail(( jqxhr, textStatus, error ) => {
            this.setState({
                data : error
            });
        });
    }
    componentDidMount(){
        this.getPostsList('filmographie');
    }
    render() {
        console.log(this.state.data);
        return (
            <div className="posts">
                {/*<Loader isLoading="true" />*/}
                <h1>Filmographie</h1>
            </div>
        );

    }

}