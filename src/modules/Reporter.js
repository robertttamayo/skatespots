import React from "react";
import {Loader} from "./Loader";
import { library } from '@fortawesome/fontawesome-svg-core';
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

library.add(faCamera);

export class Reporter extends React.Component {
    constructor(props) {
        super(props);
        this.generate = this.generate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.compress = this.compress.bind(this);
        this.activate = this.activate.bind(this);
        this.getCoords = this.getCoords.bind(this);
        this.uploadImage = this.uploadImage.bind(this);

        this.crew_id = this.props.crew_id;
        this.image_url = '';

        this.coords = {
            lat: '123.9309230',
            lng: '99.30904290'
        }
        this.endpoints = {
            spot: "https://www.roberttamayo.com/skate/api/up.php",
            image: "https://www.roberttamayo.com/skate/api/image.php",
        }
        this.state = {
            spot_name: '',
            spot_description: '',
            image_file: null,
            has_image: false,
            image_height: 300,
            image_width: 400,
            active: false,
            loading: false,
            image_data_url: null,
            loading_message: 'Uploading image...',
        };
    }
    getCoords() {
        if (this.coords.lat != '') {
            return `Lat: ${this.coords.lat}, Lng: ${this.coords.lng}`;
        } else {
            return ``;
        }
    }
    generate(event){
        // TODO: update this section to upload the image file
        event.preventDefault();

        this.setState({loading: true});

        if ("geolocation" in navigator) {
            this.uploadImage().then(()=>{
                this.setState({loading_message: 'Uploading spot...'});
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(position);
                    this.coords.lat = position.coords.latitude.toString();
                    this.coords.lng = position.coords.latitude.toString();

                    $.ajax(this.endpoints.spot, {
                        method: "POST",
                        data: {
                            lat: position.coords.latitude.toString(),
                            lng: position.coords.longitude.toString(),
                            spot_name: this.state.spot_name,
                            crew_id: this.props.crew_id,
                            spot_added_by: this.props.spot_added_by,
                            spot_description: this.state.spot_description,
                            spot_image_url: this.image_url,
                        }   
                    }).then((response)=>{
                        // TODO: update UI to reflect successful upload
                        console.log(response);
                        alert('Spot uploaded successfully');
                        this.setState({
                            spot_name: '',
                            spot_description: '',
                            image_file: null,
                            has_image: false,
                            image_height: 300,
                            image_width: 400,
                            active: false,
                            loading: false,
                            image_data_url: null,
                            loading_message: 'Uploading image...',
                        });
                    });
                    //do_something(position.coords.latitude, position.coords.longitude);
                }, ()=>{
                    alert(`Unable to determine your location. Spot not uploaded. Try changing your location settings for your browser`);
                    this.setState({loading: false});
                });
            });
        } else {
            alert(`Unable to determine your location. Spot not uploaded. Try changing your location settings for your browser`);
            this.setState({loading: false});
        }
    }
    uploadImage(){
        return new Promise((resolve, reject)=>{
            if (!this.state.has_image) {
                resolve();
            }
            let imgData = new FormData(document.getElementById("reporter-form"));
            console.log(imgData);
            var data = {
                "imgdata": [imgData]
            };
            $.ajax({
                url: this.endpoints.image,
                type: "POST",
                processData: false,
                contentType: false,
                data: imgData
            }).done((_data) => {
                console.log(_data);
                var data = JSON.parse(_data);
                console.log(data);
                if (data.success){
                    this.image_url = data.img_url;
                    resolve();
                } else {
                    reject();
                    alert(data.message);
                }
            });
        });
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
                let width = Math.floor(window.innerWidth * .8);
                let scaleFactor = width / img.width;
                console.log(`scaleFactor: ${scaleFactor}`);
                let height = Math.floor(img.height * scaleFactor);
                console.log(`width: ${width}, height: ${height}`);
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
                        image_width: width,
                        has_image: true,
                    });
                    ctx.drawImage(img, 0,0,width, height);
                    // let dataurl = ctx.canvas.toDataURL("image/jpg");
                    // this.dataurl = dataurl;
                    
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
        // if (!this.state.active) {
        if (false) {
            return (
                <div className="reporter-wrap">
                    <div className="reporter-cta button-cta" onClick={this.activate}>Up this spot</div>
                </div>
            );
        } else {
            return (
                <div className="reporter-wrap">
                    <div className="image-preview">
                        <canvas style={{display: this.state.has_image ? 'block' : 'none'}} width={this.state.image_width} height={this.state.image_height} id="image-preview-canvas"></canvas>
                        <div className="upload-an-image" style={{display: this.state.has_image ? 'none' : 'default'}}>
                            <label htmlFor="image_file" className="upload-an-image-cta">
                                <div><FontAwesomeIcon icon="camera" /></div>
                                <div>Add an Image</div>
                            </label>
                        </div>
                    </div>

                    <div className="reporter-title">Adding a Spot</div>

                    <form className="reporter-form" onSubmit={this.generate} id="reporter-form">
                        <input type="hidden" value={this.props.spot_added_by} name="spot_added_by" readOnly/>
                        <input type="hidden" value={this.props.crew_id} name="crew_id" readOnly/>
                    
                        <div>
                            <label className="standard-label" htmlFor="spot_name">Name</label>
                            <input type="text" onChange={this.handleChange} value={this.state.spot_name} placeholder="Name" id="spot_name" name="spot_name"/>
                        </div>
                        <div>
                            <label className="standard-label" htmlFor="spot_description">Description (Optional)</label>
                            <textarea onChange={this.handleChange} value={this.state.spot_description} placeholder="Description" id="spot_description" name="spot_description"/>
                        </div>
                        <div className="form-button-section">
                            <label htmlFor="image_file[]" className="file-label">Add an Image</label>
                            <button type="submit" className="button-cta">Post</button>
                            <input id="image_file" name="image_file[]" onChange={this.compress} type="file" accept="image/*"/>
                        </div>
                        <div className="coords">
                        </div>
                    </form>

                    <Loader
                    loading={this.state.loading}
                    loading_message={this.state.loading_message}
                    />
                </div>
            );
        }
    }
}