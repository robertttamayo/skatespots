import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faCamera, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faCamera, faCaretRight, faCaretLeft);

export class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onMapPinClick = this.onMapPinClick.bind(this);
        this.state = {
            count: this.props.items.length,
            index: 0,
            pageCount: 0,
        }
    }
    onNext() {
        let index = this.state.index;
        index += 1;
        if (index > Math.ceil(this.props.items.length / 2) - 1) {
            index = 0;
        }
        this.setState({index});
    }
    onMapPinClick(spot_id) {
        this.props.onMapPinClick(spot_id);
    }
    onPrev() {
        let index = this.state.index;
        index -= 1;
        if (index < 0) {
            index = Math.ceil(this.props.items.length / 2) - 1;
        }
        this.setState({index});
        console.log(this.state);
    }
    render(){
        // use props to render the list instead of state
        const listItems = this.props.items.map((item, index) => 
            <div key={item.spot_id} className="list-item" data-item-id={item.spot_id}>
                <div className="spot-name">
                    <span className="spot-name-left">
                        {index + 1}. <span>{item.spot_name}</span>
                    </span>
                    
                    { (item.spot_image_url) ? (
                        <span className="spot-name-right" onClick={()=>{this.onMapPinClick(item.spot_id)}}>
                            <FontAwesomeIcon icon="camera" />
                        </span>
                    ) : ('')
                    }
                </div>
                <div className="spot-description">
                    {item.spot_description}
                </div>
                <a 
                target="_blank"
                className="directions-link button-cta"
                href={`https://www.google.com/maps?hl=en&saddr=current+location&daddr=${item.spot_lat},${item.spot_lng}`}>
                    Directions
                </a>
            </div>
        );
        let bubbleCounters = new Array(Math.ceil(this.props.items.length / 2)).fill(0);
        return(
            <div className="locator-list" data-active-index={this.state.index}>
                <div className="location-list" style={{marginLeft: `calc(${(-1) * this.state.index * 100}vw + ${this.state.index * 10}px`}}>
                    {listItems}
                </div>

                <div className="locator-list-control">
                    <div className="move-left" onClick={this.onPrev}>
                        <FontAwesomeIcon icon="caret-left" /> Prev
                    </div>
                    
                    <div className="bubbles">
                        {bubbleCounters.map((item, index) => 
                            <div className={`bubble${index == this.state.index ? ' active' : ''}`}></div>)
                        }
                    </div>
                    <div className="move-right" onClick={this.onNext}>
                        Next <FontAwesomeIcon icon="caret-right" />
                    </div>
                </div>
            </div>
        );
    }
}