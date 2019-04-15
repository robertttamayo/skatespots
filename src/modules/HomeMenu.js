export class HomeMenu extends React.Component {
    constructor(props) {
        super(props);

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
                <div className="home-menu-button action-logout" onClick={this.handleActionLogout}>
                    Logout
                </div>
            </div>
        );
    }
}