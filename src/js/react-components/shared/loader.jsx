import React from 'React'
import $ from 'jquery';

export class Loader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: this.props.isLoading,
            isError: false
        }
    }


    render() {
        if (this.state.isLoading)
            return (
                <div className="text-center mb1">
                    loading
                </div>
            );
        return null;
    }
}