import React from "react";

export class HomeMenu extends React.Component {
    constructor(props) {
        super(props);

        this.handleActionAdd = this.handleActionAdd.bind(this);
        this.handleActionLocator = this.handleActionLocator.bind(this);
        this.handleActionMessages = this.handleActionMessages.bind(this);
        this.handleActionLogout = this.handleActionLogout.bind(this);
        this.handleActionSkaters = this.handleActionSkaters.bind(this);
        this.handleActionCrews = this.handleActionCrews.bind(this);
    }
    handleActionAdd() {
        this.props.menuAction('Add');
    }
    handleActionLocator() {
        this.props.menuAction('Locator');
    }
    handleActionMessages() {
        this.props.menuAction('Messages');
    }
    handleActionLogout() {
        this.props.menuAction('Logout');
    }
    handleActionSkaters(){
        this.props.menuAction("Skaters");
    }
    handleActionCrews(){

    }
    render(){
        return (
            <div className="home-menu-wrap">
                <div className="home-menu-button action-add" onClick={this.handleActionAdd}>
                    Add a Spot
                </div>
                <div className="home-menu-button action-locator" onClick={this.handleActionLocator}>
                    Spots
                </div>
                <div className="home-menu-button action-messages" onClick={this.handleActionMessages}>
                    Message Board
                </div>
                <div className="home-menu-button action-skaters" onClick={this.handleActionSkaters}>
                    Skaters
                </div>
            </div>
        );
    }
}