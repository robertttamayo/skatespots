import React from "react";
import {Loader} from "./Loader";
import {endpoints} from "./Endpoints";
import { library } from '@fortawesome/fontawesome-svg-core';
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";

library.add(faTrashAlt, faEdit);

export class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.fetchMessages = this.fetchMessages.bind(this);
        this.onChange = this.onChange.bind(this);
        this.postMessage = this.postMessage.bind(this);

        this.state = {
            posting: false,
            loading: false,
            loading_message: 'Fetching messages...',
            messages: [],
            user_id: this.props.user_id,
            crew_id: this.props.crew_id,
        }
    }
    fetchMessages() {
        console.log(`crew_id: ${this.props.crew_id}`);
        console.log(`user_id: ${this.props.user_id}`);
        $.ajax(endpoints.messages, {
            method: "GET",
            data: {
                crew_id: this.props.crew_id,
            }
        }).then((response)=>{
            try {
                let messages = JSON.parse(response);
                this.setState({
                    loading: false,
                    messages
                })
            } catch (e) {
                this.setState({loading: false});
            }
        });
    }
    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    postMessage(event){
        event.preventDefault();
        this.setState({posting: true});
        $.ajax(endpoints.messages, {
            method: "POST",
            data: {
                message: this.state.message,
                user_id: this.props.user_id,
                crew_id: this.props.crew_id,
            }
        }).then((response)=>{
            try {
            let messages = JSON.parse(response);
                this.setState({
                    posting: false,
                    message: '',
                    messages
                });
            } catch (e) {
                this.setState({
                    posting: false,
                });
            }
        });
    }
    render(){
        const user_id = this.props.user_id;
        const messages = this.state.messages.map((item, index) => 
            <div className="message" key={item.message_id} data-own={(item.user_id == this.props.user_id)}>
                <div className="message-message">
                    {item.message}
                </div>
                <div className="message-meta">
                    <span className="message-date">{moment(item.message_date, 'YYYY-MM-DD HH:mm:ss').format(`MMM DD, YYYY`)}</span>
                    <span> by </span>
                    <span className="message-author">{item.user_name}</span>
                </div>
                {(item.user_id == user_id) ? (
                    <div className="edit-message-options">
                        <div className="message-action-edit message-action">
                            <FontAwesomeIcon icon="edit" />
                        </div>
                        <div className="message-action-delete message-action">
                            <FontAwesomeIcon icon="trash-alt" />
                        </div>
                    </div>
                ) : ('')}
            </div>
        );
        return (
            <div className="messages-section">
                <div className="message-list">{messages}</div>

                <div className="message-create">
                    <form action="#" method="POST" className="message-form" onSubmit={this.postMessage}>
                        <input name="user_id" type="hidden" value={this.props.user_id} onChange={this.fetchMessages}/>
                        <input name="crew_id" type="hidden" value={this.props.crew_id} onChange={this.fetchMessages}/>
                        <textarea 
                        onChange={this.onChange} 
                        className="message-text" 
                        name="message" 
                        value={this.state.message}/>
                        <button type="submit" className="message-submit">
                            {(this.state.posting) ? 'Posting...' : 'Submit'}
                        </button>
                    </form>
                </div>

                <Loader
                loading={this.state.loading}
                loading_message={this.state.loading_message} />
            </div>
        );
    }
    componentDidMount() {
        if (this.props.crew_id && this.props.user_id) {
            this.fetchMessages();
        }
    }
}