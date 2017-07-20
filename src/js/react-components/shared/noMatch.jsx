import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export class NoMatch extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        return(
            <div className="cnt-center">
                <div className="fail text-center mt2">
                    <h1>Oups, page non trouvée :(</h1>
                    <div className="button mt2"><Link to="/">Retour à la case départ</Link></div>
                </div>
            </div>
        );
    }   
}