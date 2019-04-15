export class Reporter extends React.Component {
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