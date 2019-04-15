export class Lists extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        // use props to render the list instead of state
        const listItems = this.props.items.map(item => 
            <div className="list-item" data-item-id={item.spot_id}>
                {item.spot_name}
            </div>
        );
        return(
            <div className="locator-list">
                {listItems}
            </div>
        );
    }
}