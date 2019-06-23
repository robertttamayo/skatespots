import React from "react";
import ReactDOM from "react-dom";
import { MenuActions } from "../constants/MenuActions";
import { library } from '@fortawesome/fontawesome-svg-core';
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft, faTimes, faSnowboarding, faUsers } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faArrowLeft, faTimes, faSnowboarding, faUsers);

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onBack = this.onBack.bind(this);
        this.onMenu = this.onMenu.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            user_data: this.props.user_data
        }
    }
    onBack() {
        $(document).trigger("reset");
        this.props.menuAction("Main");
    }
    onMenu() {
        this.props.toggleMenu();
    }
    handleAction(actionType) {
        console.log(actionType);
        this.props.menuAction(actionType);
    }
    logout() {
        this.props.logout();
    }
    render() {
        return (
            <header className="header-wrap">
                <div className="icon-button button-action-main" onClick={this.onBack}>
                    <FontAwesomeIcon icon="arrow-left" />
                </div>
                <div className="header-title">{this.props.headerTitle || (<span>skate</span>)}</div>
                <div 
                className="icon-button button-action-menu" 
                onClick={this.onMenu}
                data-visible={(this.props.user_data) ? 'true' : 'false'}>
                    <FontAwesomeIcon icon="bars" />
                </div>
                <div className="slide-menu" >
                    <div className="slide-menu-close" onClick={this.onMenu}>
                        <FontAwesomeIcon icon="times" />
                    </div>

                    <div className="slide-menu-item" onClick={()=>this.handleAction(MenuActions.Add)}>
                        Add a Spot
                    </div>
                    <div className="slide-menu-item" onClick={()=>this.handleAction(MenuActions.Locator)}>
                        Spots
                    </div>
                    <div className="slide-menu-item" onClick={()=>this.handleAction(MenuActions.Messages)}>
                        Message Board
                    </div>
                    {this.props.user_admin ? (
                        <div className="slide-menu-item" onClick={()=>this.handleAction(MenuActions.Crews)}>
                            Crews
                        </div>
                    ) : (
                        <div className="slide-menu-item" onClick={()=>this.handleAction(MenuActions.Skaters)}>
                            Skaters
                        </div>
                    )}
                    <div className="slide-menu-item" onClick={this.logout}>
                        Logout
                    </div>
                </div>
            </header>
        );
    }
}
