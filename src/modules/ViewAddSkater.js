
import React from "react";

export class ViewAddSkater extends React.Component {
    constructor(props) {
        super(props);
        this.endpoint = "https://www.roberttamayo.com/skate/add.php";
        this.crew_id = this.props.crew_id;
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            skater_username: '',
            skater_password: ''
        };
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    submit() {
        $.ajax(this.endpoint, {
            method: "POST",
            data: {
                skater_username: this.state.skater_username,
                skater_password: this.state.skater_password,
                crew_id: this.crew_id
            }
        }).then((response) => {
            // TODO: update UI to reflect successful upload
            console.log(response);
            this.props.onFinish();
        });
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
        <div className="mode-add-skater">
            <h3>Add New Skater</h3>
            <div className="form-wrap">
                <form className="mode-form view-add-skater-form" onSubmit={this.submit}>
                    <input name="skater_username" type="text" placeholder="Username" value={this.state.skater_username} onChange={this.handleChange} />
                    <input name="skater_password" type="text" placeholder="Password" value={this.state.skater_password} onChange={this.handleChange} />
                </form>
            </div>
        </div>
        );
    }
}
