class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="app-wrap">
                <Header />
                <Reporter />
                <Locator />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('app')
);
