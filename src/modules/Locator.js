import {Lists} from "./Lists";
import {Maps} from "./Maps";

export class Locator extends React.Component {
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
