import React from 'react';

export class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.loading,
            loading_message: this.props.loading_message
        }
    }
    render(){
        return(
            <div className="loading-bg" data-visible={this.props.loading}>
                <div className="loading-message">{this.props.loading_message}</div>
                <div className="loading-animation">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        )
    }
}