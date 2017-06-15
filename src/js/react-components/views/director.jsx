import React from 'react'
import $ from 'jquery';
import {BannerPage} from '../shared/bannerPage.jsx';

export class Director extends React.Component {
    render() {
        return (
            <div className="director">
                <BannerPage title="Le réalisateur" description="Réalisons des films ensemble pour l'environnement" />
            </div>
        );
    }
}