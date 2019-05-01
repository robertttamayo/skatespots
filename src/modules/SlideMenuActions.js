import React from "react";
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
        if (this.state.user_data.user_role < 2) {
            return (
                <div className="slide-menu-item" onClick={this.menuAction}>
                    Add Skater
                </div>
            );
        } else {
            return '';
        }
    }
}