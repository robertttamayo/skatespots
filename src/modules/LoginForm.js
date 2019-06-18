import React from "react";

export class LoginForm extends React.Component {
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
            <form className="login-form activate-form" onSubmit={this.handleLogin}>
                <div className="step-two">
                    <div className="input-row-input">
                        <label htmlFor="user_name">Username:</label>
                        <input type="text" value={this.state.user_name} onChange={this.handleChange} name="user_name" placeholder="Username"/>
                        <label htmlFor="user_magicword">Password:</label>
                        <input type="password" value={this.state.user_magicword} name="user_magicword" onChange={this.handleChange} placeholder="Password" />
                        <button type="submit">Login</button>
                    </div>
                </div>
            </form>
        );
    }
}