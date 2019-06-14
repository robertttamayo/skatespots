
import React from "react";
import * as L from "leaflet";
import { Map, TileLayer, Marker, Popup, LayersControl, ZoomControl } from 'react-leaflet';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

export class Maps extends React.Component {
    constructor(props) {
        super(props);
        this.center = this.center.bind(this);

        this.map = {};
        this.tileLayer = {};
        this.lat = 39.5;
        this.lng = -98.35;
        this.zoom = 4;
        this.key = "AIzaSyCqjAzVHf3SRY1HIr-yYTCyNhOCHV1p5AE";
        this.iconUrl = "https://www.roberttamayo.com/skate/assets/images/icon.svg";

        this.markerRefs = [];
        this.popupRefs = [];

        this.state = {
            items: this.props.items
        }
        $(document).on('center_map', (event, data)=>{
            this.map.invalidateSize();
            if (data && data.items) {
                this.center(data.items);
            } else {
                this.center(this.props.items);
            }
        });
        $(document).on('map_popup_open', (event, data) => {
            let spot_id = data.spot_id;
            console.log(spot_id);
            this.markerRefs.forEach((marker)=>{
                if (marker && marker.props && marker.props.spot_id == spot_id) {
                    marker.leafletElement.openPopup();
                }
            });
        });
    }
    center(_items){
        let items = _items || this.props.items;
        let lats = [];
        let lngs = [];

        items.forEach((item)=>{
            let lat = parseFloat(item.spot_lat);
            let lng = parseFloat(item.spot_lng);
            lats.push(lat);
            lngs.push(lng);
        });

        lats.sort(function(a, b) {
            return a - b;
        });
        lngs.sort(function(a, b) {
            return a - b;
        });
        console.log(lats, lngs);
        if (lats.length && lngs.length) {
            var minLat = lats[0];
            var minLng = lngs[0];
            var maxLat = lats[lats.length - 1];
            var maxLng = lngs[lngs.length - 1];
            
            var southWest = new L.LatLng(minLat, maxLng);
            var northEast = new L.LatLng(maxLat, minLng);
            var bounds = new L.LatLngBounds(southWest, northEast);
    
            let options = {
                maxZoom: 14,
                noMoveStart: true,
                padding: [80, 80]
            };
    
            try {
                this.map.fitBounds(bounds, options);
            } catch (e) {}
        }
    }
    render(){
        return (
            <div className="locator-map">
                <div id="map">
                    <Map 
                    zoom={this.zoom} 
                    center={[this.lat, this.lng]}
                    scrollWheelZoom={false}
                    zoomControl={false}
                    ref="map"
                    >
                        <ReactLeafletGoogleLayer 
                        googleMapsLoaderConf={{
                            KEY: this.key, 
                            VERSION: '3.36'
                        }} 
                        type="roadmap" />

                        {this.props.items.map((item, index) => {
                            let listItems = '';
                            let icon = L.divIcon({
                                iconSize: [30, 40],
                                iconAnchor: [15, 20],
                                html: '<div class="center"></div>'
                            });
                            return (
                                <Marker
                                key={item.spot_id}
                                position={[item.spot_lat, item.spot_lng]} 
                                icon={icon}
                                spot_id={item.spot_id}
                                ref={(marker) => {this.markerRefs.push(marker)}}
                                autoPan={true}
                                >
                                    <Popup
                                    ref={(popup) => {this.popupRefs.push(popup)}}
                                    spot_id={item.spot_id}
                                    keepInView={true}>
                                        <div className="popup-wrap">
                                            <div className="popup-image">
                                                {(item.spot_image_url) ? (
                                                    <img src={item.spot_image_url} alt="spot image"/>
                                                ) : (
                                                    <div className="no-image">No image for this spot</div>
                                                )
                                                }
                                            </div>
                                            <div className="popup-info">
                                                <div className="popup-name">{item.spot_name}</div>
                                                <div className="popup-description">{item.spot_description}</div>
                                                <a 
                                                target="_blank"
                                                className="directions-link button-cta"
                                                href={`https://www.google.com/maps?hl=en&saddr=current+location&daddr=${item.spot_lat},${item.spot_lng}`}>
                                                    Directions
                                                </a>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        })}
                        <ZoomControl 
                        position="bottomright"/>
                    </Map>
                </div>
            </div>
        );
    }
    componentDidMount(){
        this.map = this.refs.map.leafletElement;
        this.center(this.props.items);
    }
    componentDidUpdate(){
        this.markerRefs.forEach((marker) =>{
            console.log(marker);
        })
    }
}