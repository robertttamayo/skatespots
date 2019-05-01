import React from "react";
import ReactDOM from "react-dom";
import {MenuAddCrew, MenuAddCrewLeader, MenuAddSkater} from "./SlideMenuActions";
import { library } from '@fortawesome/fontawesome-svg-core';
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft, faTimes, faSnowboarding } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faArrowLeft, faTimes, faSnowboarding);

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onBack = this.onBack.bind(this);
        this.onMenu = this.onMenu.bind(this);
        this.menuAddCrew = this.menuAddCrew.bind(this);
        this.menuAddCrewLeader = this.menuAddCrewLeader.bind(this);
        this.menuAddSkater = this.menuAddSkater.bind(this);
        this.state = {
            user_data: this.props.user_data
        }
        console.log(this.state.user_data);
    }
    onBack() {
        this.props.menuAction("Main");
    }
    onMenu() {
        this.props.toggleMenu();
    }
    menuAddCrew() {
        
    }
    menuAddSkater() {
        
    }
    menuAddCrewLeader() {
        
    }
    render() {
        return (
            <header className="header-wrap">
                <div className="icon-button button-action-main" onClick={this.onBack}>
                    <FontAwesomeIcon icon="arrow-left" />
                </div>
                <div className="icon-button button-action-menu" onClick={this.onMenu}>
                    <FontAwesomeIcon icon="bars" />
                </div>
                <div className="slide-menu">
                    <div className="slide-menu-close" onClick={this.onMenu}>
                        <FontAwesomeIcon icon="times" />
                    </div>

                    <MenuAddCrew user_data={this.state.user_data} menuAction={this.menuAddCrew}/>
                    <MenuAddSkater user_data={this.state.user_data} menuAction={this.menuAddSkater}/>
                    <MenuAddCrewLeader user_data={this.state.user_data} menuAction={this.menuAddCrewLeader}/>
                </div>
            </header>
        );
    }
}
