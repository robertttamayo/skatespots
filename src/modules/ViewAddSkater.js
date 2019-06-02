
import React from "react";

export class ViewAddSkater extends React.Component {
    constructor(props) {
        super(props);
        this.endpoint = this.props.endpoint;
        this.crew_id = this.props.crew_id;
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleAddNewSkater = this.handleAddNewSkater.bind(this);
        this.state = {
            skater_username: '',
            skater_password: '',
            skater_is_crew_leader: false,
            crew_id: this.props.crew_id,
        };
    }
    handleChange(event) {
        console.log(event.target);
        this.setState({
            [event.target.name]: event.target.name == 'skater_is_crew_leader' ? event.target.checked : event.target.value
        });
    }
    handleAddNewSkater() {
        console.log('adding new skater');
        this.props.handleAddNewSkater(Object.assign({}, {...this.state}));
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleCheckboxChange(event) {
        this.setState({
            [event.target.name]: event.target.checked
        });
    }
    render() {
        return (
        <React.Fragment>
            <div className="mode-add-skater">
                <h3>Add New Skater</h3>
                {this.props.loading ? (
                    <div className="loading-inline">Loading</div>
                ) 
                : (
                <div className="form-wrap">
                    <form className="mode-form view-add-skater-form" onSubmit={this.handleAddNewSkater}>
                        <input name="skater_username" type="text" placeholder="Username" value={this.state.skater_username} onChange={this.handleChange} />
                        <label htmlFor="user_role">Crew Leader?</label>
                        <input type="checkbox" name="skater_is_crew_leader" checked={this.state.skater_is_crew_leader} onChange={this.handleCheckboxChange}/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                )}
            </div>
            {this.props.shareLink == '' ? (
                ''
            ) : (
            <div className="skater-share-link" data-visible={this.props.shareLink}>
                Success! Click on the link to share with the new skater:
                <a class="sms-link" href={`sms:&body=${encodeURI(this.props.shareLink)}`}>Send SMS</a>
                <a class="email-link" href={`mailto:?body=${encodeURI(this.props.shareLink)}`}>Send via email</a>
                <a class="copy-link" onClick={document.execCommand('copy')}>{this.props.shareLink}</a>
            </div>
            )}
        </React.Fragment>
        );
    }
}
