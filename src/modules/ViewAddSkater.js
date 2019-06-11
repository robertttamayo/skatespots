
import React from "react";

export class ViewAddSkater extends React.Component {
    constructor(props) {
        super(props);
        this.endpoint = this.props.endpoint;
        this.crew_id = this.props.crew_id;
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleAddNewSkater = this.handleAddNewSkater.bind(this);
        this.copyShareLink = this.copyShareLink.bind(this);
        this.state = {
            skater_username: '',
            skater_password: '',
            skater_is_crew_leader: false,
            crew_id: this.props.crew_id,
            copyLinkText: 'Copy Link',
        };
    }
    handleChange(event) {
        console.log(event.target);
        this.setState({
            [event.target.name]: event.target.name == 'skater_is_crew_leader' ? event.target.checked : event.target.value
        });
    }
    handleAddNewSkater(crew_id) {
        console.log('adding new skater in crew ' + crew_id);
        this.setState({crew_id});
        console.log(this.state);
        this.props.handleAddNewSkater(Object.assign({}, {...this.state}));
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleCheckboxChange(event) {
        console.log(event.target.name, event.target.checked);
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    copyShareLink(){
        let element = document.getElementById('copy-link');
        element.select();
        document.execCommand('copy');
        this.setState({copyLinkText: 'Copied!'});
        window.setTimeout(()=>this.setState({copyLinkText: 'Copy Link'}), 3000);
    }
    render() {
        console.log('updating view add skater');
        return (
        <React.Fragment>
            <div className="mode-add-skater">
                <h3>{this.props.headerText}</h3>
                {this.props.loading ? (
                    <div className="loading-inline">Loading</div>
                ) 
                : (
                <div className="form-wrap">
                    <form className="mode-form view-add-skater-form" onSubmit={()=>this.handleAddNewSkater(this.props.crew_id)}>
                        <input name="skater_username" readOnly type="hidden" placeholder="Username" value={this.state.skater_username} onChange={this.handleChange} />

                        <label 
                        htmlFor="skater_is_skater"
                        className="skater-type" data-selected={!this.state.skater_is_crew_leader}>
                            Skater
                            <span className="skater-type-radio"><span></span></span>
                        </label>
                        <input 
                        id="skater_is_skater" 
                        type="radio" 
                        name="skater_is_crew_leader" 
                        value={false}
                        checked={true}
                        onChange={this.handleCheckboxChange}/>

                        <label 
                        htmlFor="skater_is_crew_leader"
                        className="skater-type" data-selected={this.state.skater_is_crew_leader}>
                            Crew Leader
                            <span className="skater-type-radio"><span></span></span>
                        </label>
                        <input 
                        id="skater_is_crew_leader" 
                        type="radio"
                        name="skater_is_crew_leader" 
                        value={true}
                        onChange={this.handleCheckboxChange}/>

                        <button type="submit">Create</button>
                    </form>
                </div>
                )}
            </div>
            {this.props.shareLink == '' ? (
                ''
            ) : (
            <div className="skater-share-link" data-visible={this.props.shareLink}>
                <div>
                    Success! Click on one of the options below to share the activation link:
                </div>

                <div>
                    <a className="sms-link" href={`sms:&body=${encodeURI(this.props.shareLink)}`}>Send SMS</a>
                </div>

                <div>
                    <a className="email-link" href={`mailto:?body=${encodeURI(this.props.shareLink)}`}>Send via email</a>
                </div>

                <div className="copy-link-wrap">
                    <input id="copy-link" type="text" className="copy-link" value={this.props.shareLink} readOnly/>
                    <button  className="copy-link-button" onClick={this.copyShareLink}>{this.state.copyLinkText}</button>
                </div>
            </div>
            )}
        </React.Fragment>
        );
    }
}
