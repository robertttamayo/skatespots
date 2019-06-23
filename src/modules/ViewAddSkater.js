
import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);

export class ViewAddSkater extends React.Component {
    constructor(props) {
        super(props);
        this.endpoint = this.props.endpoint;
        this.crew_id = this.props.crew_id;
        this.handleChange = this.handleChange.bind(this);
        this.handleAddNewSkater = this.handleAddNewSkater.bind(this);
        this.copyShareLink = this.copyShareLink.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.onShareLinkClose = this.onShareLinkClose.bind(this);
        this.getEmailSubject = this.getEmailSubject.bind(this);
        this.state = {
            skater_username: '',
            skater_password: '',
            skater_is_crew_leader: false,
            skater_is_skater: true,
            crew_id: this.props.crew_id,
            crew_name: this.props.crew_name,
            copyLinkText: 'Copy Link',
            shareLinkAvailable: true,
            skater_type_created: 'Skater'
        };
    }
    getEmailSubject(crew_name) {
        return `You're invited to join the Skate At crew "${crew_name}"`;
    }
    handleRadioChange(skater_is_crew_leader) {
        this.setState({
            skater_is_crew_leader,
            skater_is_skater: !skater_is_crew_leader
        });
    }
    onShareLinkClose() {
        this.setState({shareLinkAvailable: false});
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.name == 'skater_is_crew_leader' ? event.target.checked : event.target.value
        });
    }
    handleAddNewSkater(crew_id) {
        this.setState({
            crew_id,
            shareLinkAvailable: true,
            skater_type_created: this.state.skater_is_crew_leader ? 'Crew Leader' : 'Skater',
        });
        this.props.handleAddNewSkater(Object.assign({}, {...this.state}));
    }
    handleChange(event){
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
        let shareLinkUrlEncoded = '';
        if (this.props.shareLink != '') {
            shareLinkUrlEncoded = encodeURIComponent(`<a href="${this.props.shareLink}">Click to join</a>`);
            shareLinkUrlEncoded = encodeURIComponent(this.props.shareLink);
        }
        let shareLinkVisible = this.props.shareLink !== '' && this.state.shareLinkAvailable;
        return (
        <React.Fragment>
            <div className="mode-add-skater">
                <h2 className="skaters-crew-name with-border">{this.props.crew_name}</h2>

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
                        className="skater-type" data-selected={this.state.skater_is_skater}>
                            Skater
                            <span className="skater-type-radio"><span></span></span>
                        </label>
                        <input 
                        id="skater_is_skater" 
                        type="radio" 
                        name="skater_is_crew_leader" 
                        value={false}
                        checked={this.skater_is_skater}
                        onChange={()=>this.handleRadioChange(false)}/>

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
                        checked={this.state.skater_is_crew_leader}
                        onChange={()=>this.handleRadioChange(true)}/>

                        <button type="submit">Create</button>
                    </form>
                </div>
                )}
            </div>
            {shareLinkVisible == '' ? (
                ''
            ) : (
            <div className="skater-share-link" data-visible={shareLinkVisible}>
                <div className="slide-menu-close" onClick={this.onShareLinkClose}>
                    <FontAwesomeIcon icon="times" />
                </div>
                <div className="skater-share-title">
                    {this.state.skater_type_created} Created
                </div>
                <div className="skater-share-instructions">
                    Share the activation link with the new user. They will be able to create a username and password.
                </div>

                <div className="share-links">
                    <a className="sms-link android" data-crew-name={this.props.crew_name} href={`sms:&body=${shareLinkUrlEncoded}`}>Send SMS</a>
                    <a className="sms-link ios" data-crew-name={this.props.crew_name} href={`sms:?&body=${shareLinkUrlEncoded}`}>Send SMS</a>

                    <a className="email-link" href={`mailto:?subject=${encodeURIComponent(this.getEmailSubject(this.props.crew_name))}&body=${encodeURIComponent('Click to activate your account: ')}${shareLinkUrlEncoded}`}>Send email</a>
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
