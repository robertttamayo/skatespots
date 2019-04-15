export class Maps extends React.Component {
    constructor(props) {
        super(props);
        this.create = this.create.bind(this);
        this.preRender = this.preRender.bind(this);

        this.map = {};
        this.tileLayer = {};
        this.lat = 39.5;
        this.lng = -98.35;
        this.zoom = 4;

        this.state = {
            items: this.props.items
        }
    }
    create() {
        this.map = L.map(this.refs.map, {
            attributionControl: false,
            scrollWheelZoom: false,
            doubleClickZoom: 'center',
            zoomSnap: 1
        }).setView([this.lat, this.lng], this.zoom);
        
        this.tileLayer = L.gridLayer.googleMutant({
            type: 'roadmap', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
        }).addTo(this.map);
    }
    preRender(items){
        let lats = [];
        let lngs = [];

        items.forEach((item)=>{
            const lat = parseFloat(item.spot_lat);
            const lng = parseFloat(item.spot_lng);
            lats.push(lat);
            lngs.push(lng);

            L.marker([lat, lng]).addTo(this.map);
        });

        lats.sort(function(a, b) {
            return a - b;
        });
        lngs.sort(function(a, b) {
            return a - b;
        });
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
        this.preRender(this.props.items);

        return (
            <div className="locator-map">
                <div id="map" ref="map"></div>
            </div>
        );
    }
    componentDidMount(){
        console.log('did mount');
        this.create();
    }
}