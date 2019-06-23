import React from "react";
import { MenuActions } from "../constants/MenuActions";
import { library } from '@fortawesome/fontawesome-svg-core';
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPlus, faUsers, faCommentDots } from '@fortawesome/free-solid-svg-icons';
library.add(faMapMarkerAlt, faPlus, faUsers, faCommentDots);
export class HomeMenu extends React.Component {
    constructor(props) {
        super(props);

        this.handleAction = this.handleAction.bind(this);

    }
    handleAction(actionType) {
        this.props.menuAction(actionType);
    }
    render(){
        return (
            <div className="home-menu-wrap">
                <div className="home-menu-button action-add" onClick={()=>this.handleAction(MenuActions.Add)}>
                    <span className="icon"><FontAwesomeIcon icon="plus" /></span>
                    <span>Add a Spot</span>
                </div>
                <div className="home-menu-button action-locator" onClick={()=>this.handleAction(MenuActions.Locator)}>
                    <span className="icon"><FontAwesomeIcon icon="map-marker-alt" /></span>
                    <span>Spots</span>
                </div>
                <div className="home-menu-button action-messages" onClick={()=>this.handleAction(MenuActions.Messages)}>
                    <span className="icon"><FontAwesomeIcon icon="comment-dots" /></span>
                    <span>Message<br/>Board</span>
                </div>
                {this.props.user_admin ?
                    (<div className="home-menu-button action-crews" onClick={()=>this.handleAction(MenuActions.Crews)}>
                        <span className="icon"><FontAwesomeIcon icon="users" /></span>
                        <span>Crews</span>
                    </div>)
                    : 
                    (<div className="home-menu-button action-skaters" onClick={()=>this.handleAction(MenuActions.Skaters)}>
                        <span className="icon"><FontAwesomeIcon icon="users" /></span>
                        <span>Skaters</span>
                    </div>
                    )
                }
            </div>
        );
    }
}