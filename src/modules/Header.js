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
    }
    onBack() {
        this.props.menuAction("Main");
    }
    onMenu() {
        this.props.toggleMenu();
    }
    menuAddCrew() {
        return (
            <div className="menu-list-item">
                Add Crew
            </div>
        );
    }
    menuAddSkater() {
        return (
            <div className="menu-list-item">
                Add Skater
            </div>
        );
    }
    menuAddCrewLeader() {
        return (
            <div className="menu-list-item">
                Add Crew Leader
            </div>
        );
    }
    render() {
        let menuOptions = this.menuAddCrew() + this.menuAddSkater() + this.menuAddCrewLeader();
        return (
            <header className="header-wrap">
                <div className="icon-button button-action-main" onClick={this.onBack}>
                    &larr;
                </div>
                <div className="icon-button button-action-menu" onClick={this.onMenu}>
                    Menu
                </div>
                <div className="slide-menu">
                    {menuOptions}
                </div>
            </header>
        );
    }
}