
class Reporter extends React.Component {
    constructor(props) {
        super(props);
        this.generate = this.generate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.compress = this.compress.bind(this);
        this.activate = this.activate.bind(this);

        this.endpoint = "https://www.roberttamayo.com/skate/up.php";
        this.state = {
            spot_name: '',
            spot_description: '',
            image_file: null,
            image_height: 300,
            image_width: 400,
            active: false
        };
    }
    generate(event){
        event.preventDefault();
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                $.ajax(this.endpoint, {
                    method: "POST",
                    data: {
                        lat: position.coords.latitude.toString(),
                        lng: position.coords.longitude.toString(),
                        spot_name: this.state.spot_name
                    }   
                }).then((response)=>{
                    console.log(response);
                });
                //do_something(position.coords.latitude, position.coords.longitude);
            });
        } else {
            alert("You must allow location to report a spot");
        }
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    compress(event) {
        const fileName = event.target.files[0].name;
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                    const elem = document.createElement('canvas');
                    let width = 400;
                    let scaleFactor = width / img.width;
                    let height = Math.floor(img.height * scaleFactor);
                    elem.width = width;
                    elem.height = height;
                    const ctx = elem.getContext('2d');
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    ctx.drawImage(elem, 0, 0, width, height);
                    ctx.canvas.toBlob((blob) => {
                        const file = new File([blob], fileName, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        let image_preview_canvas = document.getElementById('image-preview-canvas');
                        let ctx = image_preview_canvas.getContext('2d');
                        this.setState({
                            image_file: file,
                            image_height: height,
                            image_width: width
                        });
                        ctx.drawImage(img, 0,0,width, height);
                    }, 'image/jpeg', 1);
                },
                reader.onerror = error => console.log(error);
        };
    }
    activate() {
        console.log('activating form');
        this.setState({
            active: true
        })
    }
    render() {
        let rendered = "not rendered";
        if (this.state.image_file !== null) {
            rendered = "rendered";
        }
        if (!this.state.active) {
            return (
                <div className="reporter-wrap">
                    <div className="reporter-cta button-cta" onClick={this.activate}>Up this spot</div>
                </div>
            );
        } else {
            return (
                <div className="reporter-wrap">
                    <div className="reporter-title">Adding new spot</div>
                    <form className="reporter-form" onSubmit={this.generate}>
                        <div>
                            <label className="standard-label" for="spot_name">Name</label>
                            <input type="text" onChange={this.handleChange} value={this.state.spot_name} placeholder="Spot name" id="spot_name" name="spot_name"/>
                        </div>
                        <div>
                            <label className="standard-label" for="spot_description">Description (Optional)</label>
                            <input type="text" onChange={this.handleChange} value={this.state.spot_description} placeholder="Describe this spot (rails, stairs, etc)" id="spot_description" name="spot_description"/>
                        </div>
                        <div>
                            <label for="image_file" className="file-label">Upload an image</label>
                            <input id="image_file" name="image_file" onChange={this.compress} type="file" accept="image/*"/>
                        </div>
                        <div className="image-preview">
                            <canvas style={`display: ${(this.state.image_file) ? 'default' : 'none'}`} width={this.state.image_width} height={this.state.image_height} id="image-preview-canvas"></canvas>
                        </div>
                        <div>
                            <button type="submit" className="button-cta">Submit spot</button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header className="header-wrap">
                
            </header>
        );
    }
}

class Lists extends React.Component {
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

class Maps extends React.Component {
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

class Locator extends React.Component {
    constructor(props) {
        super(props);
        this.endpoint = "https://www.roberttamayo.com/skate/down.php";
        this.gather = this.gather.bind(this);
        this.askUserLocation = this.askUserLocation.bind(this);

        this.state = {
            items: [],
        };
    }
    gather() {
        return new Promise((resolve, reject)=> {
            $.ajax(this.endpoint, {
                method: "POST",
                data: {}
            }).then((response)=>{
                try {
                    const response_data = JSON.parse(response);
                    console.log(response_data);
                    resolve(response_data);
                } catch (e) {
                    console.log(e);
                    resolve({});
                }
            });
        });
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
                alert("You share your location to view locations");
            }
        });
    }
    render() {
        return (
            <div className="locator-wrap">
                <Lists items={this.state.items} />
                <Maps items={this.state.items} />
            </div>
        );
    }
    componentDidMount(){
        this.gather().then((response) => {
            console.log('response in cdm', response);
            this.setState({
                items: response
            });
        });
        // Promise.all([this.gather(), this.askUserLocation()]).then((values) => {
        //     console.log(values);
        // });
    }
}

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer className="footer-wrap">
                
            </footer>
        );
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            user_name: this.props.user_name,
            user_id: this.props.user_id,
            user_magicword: this.props.user_magicword,
            failed: false
        };
    }
    handleChange(event) {
        this.props.onLoginChange({
            name: event.target.name,
            value: event.target.value
        });
    }
    handleLogin(event){
        event.preventDefault();
        this.props.onLogin();
    }
    render(){
        return (
            <form className="login-form" onSubmit={this.handleLogin}>
                <input type="text" value={this.state.user_name} onChange={this.handleChange} name="user_name" placeholder="Username"/>
                <input type="password" value={this.state.user_magicword} name="user_magicword" onChange={this.handleChange} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        
        this.endpoint = 'https://www.roberttamayo.com/skate/login.php';

        this.state = {
            user_data: this.props.user_data,
            user_name: this.props.user_name,
            user_id: this.props.user_id,
            signed_in: this.props.signed_in,
            user_magicword: ''
        };
    }
    handleLogin() {
        $.ajax(this.endpoint, {
            method: "POST",
            data: {
                user_name: this.state.user_name,
                user_magicword: this.state.user_magicword
            }
        }).then((response)=>{
            try {
                let data = JSON.parse(response);
                if (data.success) {
                    const cookie_data_string = JSON.stringify({
                        user_name: data.user_name,
                        user_id: data.user_id
                    });
                    setCookie('user_data', cookie_data_string);
                    this.setState({
                        user_name: data.user_name,
                        user_id: data.user_id,
                        signed_in: true
                    });
                } else {
                    this.setState({
                        signed_in: false,
                        failed: true
                    })
                }
            } catch (e) {

            }
            console.log(response);
        });
    }
    handleLoginChange(data) {
        this.setState({
            [data.name]: data.value
        });
    }
    render() {
        if (this.state.signed_in) {
            return (
                <div className="app-wrap">
                    <Header />

                    <div className="app-body">
                        <Reporter />

                        <Locator />
                    </div>

                    <Footer />
                </div>
            );
        } else {
            return (
                <LoginForm onLogin={this.handleLogin}
                onLoginChange={this.handleLoginChange} 
                user_name={this.user_name} 
                user_magicword={this.user_magicword}/>
            )
        }
    }
}

let user_data = getUserInfo();
let signed_in = (user_data != '');
ReactDOM.render(
    <App user_name={user_data.user_name}
    user_id={user_data.user_id}
    signed_in={signed_in}/>,
    document.getElementById('app')
);

function getUserInfo() {
    let user_cookie = getCookie('user_data');
    if (user_cookie != '') {
        try {
            let user_data = JSON.parse(user_cookie);
            return user_data;
        } catch (e) {
            console.log("error with parsing cookie");
        }
    }
    return false;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
/*
<!-- HTML Part -->
<input id="file" type="file" accept="image/*">
<script>
    document.getElementById("file").addEventListener("change", function (event) {
	compress(event);
});
</script>
*/

