import React from "react";

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
                <div className="home-menu-button action-add" onClick={()=>this.handleAction('Add')}>
                    Add a Spot
                </div>
                <div className="home-menu-button action-locator" onClick={()=>this.handleAction('Locator')}>
                    Spots
                </div>
                <div className="home-menu-button action-messages" onClick={()=>this.handleAction('Messages')}>
                    Message Board
                </div>
                {this.props.user_admin ?
                    (<div className="home-menu-button action-crews" onClick={()=>this.handleAction('Crews')}>
                        Crews
                    </div>)
                    : 
                    (<div className="home-menu-button action-skaters" onClick={()=>this.handleAction('Skaters')}>
                        Skaters
                    </div>
                    )
                }
            </div>
        );
    }
}