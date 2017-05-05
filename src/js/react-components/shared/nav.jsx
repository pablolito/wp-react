import React from 'React';
import { Link } from 'react-router-dom';
import $ from 'jquery';
export class Nav extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        
    }
    render() {
        return (
            <nav className="">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/filmographie">Filmographie</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        );

    }
}