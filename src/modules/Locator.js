import React from "react";

import {Lists} from "./Lists";
import {Maps} from "./Maps";

export class Locator extends React.Component {
    constructor(props) {
        super(props);
        this.endpoint = "https://www.roberttamayo.com/skate/api/down.php";
        this.gather = this.gather.bind(this);
        this.askUserLocation = this.askUserLocation.bind(this);
        this.onMapPinClick = this.onMapPinClick.bind(this);

        this.crew_id = this.props.crew_id;
        this.state = {
            items: [],
            activeSpotId: null,
        };
    }
    gather() {
        return new Promise((resolve, reject)=> {
            $.ajax(this.endpoint, {
                method: "POST",
                data: {
                    crew_id: this.crew_id
                }
            }).then((response)=>{
                try {
                    const response_data = JSON.parse(response);
                    resolve(response_data);
                } catch (e) {
                    console.log(e, reponse);
                    resolve({});
                }
            });
        });
    }
    onMapPinClick(spot_id) {
        this.setState({activeSpotId: spot_id});
        $(document).trigger('map_popup_open', {spot_id});
    }
    askUserLocation() {
        return new Promise((resolve, reject)=> {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.user_lat = position.coords.latitude;
                    this.user_lng = position.coords.longitude;
                    resolve();
                });
            } else {
                reject();
            }
        });
    }
    render() {
        return (
            <div className="locator-wrap">
                <Maps items={this.state.items}
                onMapPinClick={this.onMapPinClick} 
                activeSpotId={this.state.activeSpotId}/>
                <Lists 
                items={this.state.items}
                onMapPinClick={this.onMapPinClick}
                activeSpotId={this.state.activeSpotId}/>
            </div>
        );
    }
    componentDidMount(){
        this.gather().then((response) => {
            this.setState({
                items: response
            });
            $(document).trigger('center_map', {items: response});
            console.log(response);
        });
        // Promise.all([this.gather(), this.askUserLocation()]).then((values) => {
        //     console.log(values);
        // });
    }
}
