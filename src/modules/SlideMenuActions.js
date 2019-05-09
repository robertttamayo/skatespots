import React from "react";
import {ViewAddSkater} from "./ViewAddSkater";

export class MenuAddCrew extends React.Component {
    constructor(props) {
        super(props);
        this.menuAction = this.menuAction.bind(this);
        this.state = {
            user_data: this.props.user_data
        }
        console.log(this.state.user_data);
    }
    menuAction() {
        this.props.menuAction();
    }
    render(){
        if (this.state.user_data.user_role == 0) {
            return (
                <div className="slide-menu-item" onClick={this.menuAction}>
                    Add Crew
                </div>
            );
        } else {
            return '';
        }
    }
}
export class MenuAddCrewLeader extends React.Component {
    constructor(props) {
        super(props);
        this.menuAction = this.menuAction.bind(this);
        this.state = {
            user_data: this.props.user_data
        }
    }
    menuAction() {
        this.props.menuAction();
    }
    render(){
        if (this.state.user_data.user_role < 1) {
            return (
                <div className="slide-menu-item" onClick={this.menuAction}>
                    Add Crew Leader
                </div>
            );
        } else {
            return '';
        }
    }
}
export class MenuAddSkater extends React.Component {
    constructor(props) {
        super(props);
        this.menuAction = this.menuAction.bind(this);
        this.state = {
            user_data: this.props.user_data
        }
    }
    menuAction() {
        this.props.menuAction();
    }
    render(){
        if (this.state.user_data.user_role <= 1) {
            return (
                <React.Fragment>
                    <div className="slide-menu-item">
                        <ViewAddSkater crew_id={this.state.user_data.crew_id} />
                    </div>
                </React.Fragment>
            );
        } else {
            return '';
        }
    }
}