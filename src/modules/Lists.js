import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faCamera, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faCamera, faCaretRight, faCaretLeft);

export class Lists extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        // use props to render the list instead of state
        const listItems = this.props.items.map((item, index) => 
            <div key={item.spot_id} className="list-item" data-item-id={item.spot_id}>
                <div className="spot-name">
                    <span className="spot-name-left">
                        {index + 1}. <span>{item.spot_name}</span>
                    </span>

                    <span className="spot-name-right">
                        <FontAwesomeIcon icon="camera" />
                    </span>
                </div>
                <div className="spot-description">
                    {item.spot_description}
                </div>
                <div className="directions-link button-cta">Directions</div>
            </div>
        );
        return(
            <div className="locator-list">
                <div className="location-list">
                    {listItems}
                </div>

                <div className="locator-list-control">
                    <div className="move-left">
                        <FontAwesomeIcon icon="caret-left" /> Prev
                    </div>
                    <div className="bubbles">
                        <div className="bubble active"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                    </div>
                    <div className="move-right">
                        Next <FontAwesomeIcon icon="caret-right" />
                    </div>
                </div>
            </div>
        );
    }
}