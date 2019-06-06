
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
                            return (
                                <Marker 
                                key={item.spot_id}
                                position={[item.spot_lat, item.spot_lng]} 
                                
                                // icon={L.DivIcon.dataMarkup({
                                //     className:"cmOverlay" + (item.state || ''),
                                //     iconSize: [35, 35],
                                //     iconAnchor: [17.5, 17.5],
                                //     lid: item.locationId, 
                                //     lat: item.lat,
                                //     lng: item.lng,
                                //     visible: true,
                                //     particleGroupNames: ['Location Type'],
                                //     specialties: item.specialties,
                                //     html: `
                                //         <div class="circular-close"></div>
                                //         <div class="circular">${listItems}</div>
                                //         <div class="index count">${index + 1}</div>
                                //         <div class="circular-close"></div>
                                //         <div class="circular"></div>
                                //     `
                                // })}
                                />
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
}