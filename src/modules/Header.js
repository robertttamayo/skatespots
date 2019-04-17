export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onBack = this.onBack.bind(this);
    }
    onBack() {
        this.props.menuAction("Main");
    }
    render() {
        return (
            <header className="header-wrap">
                <div className="icon-button button-action-main" onClick={this.onBack}>
                    &larr;
                </div>
            </header>
        );
    }
}