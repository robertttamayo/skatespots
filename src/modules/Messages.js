import React from "react";
import {Loader} from "./Loader";
import {endpoints} from "../constants/Endpoints";
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
        this.onEdit = this.onEdit.bind(this);
        this.onEditFinish = this.onEditFinish.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onDeleteFinish = this.onDeleteFinish.bind(this);

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
    onDelete(message_id) {
        if (confirm('Are you sure want to delete this message')) {
            this.onDeleteFinish(message_id);
        }
    }
    onDeleteFinish(message_id){
        this.setState({loading: true, loading_message: 'Deleting message...'});
        $.ajax(endpoints.messages, {
            method: "POST",
            data: {
                mode: 'delete',
                message_id,
                user_id: this.props.user_id,
                crew_id: this.props.crew_id,
            }
        }).then((response) => {
            try {
                let messages = JSON.parse(response);
                this.setState({messages, loading: false});
            } catch (e) {
                this.setState({loading: false});
            }
        });
    }
    onEdit(message_id, message) {
        var edited = prompt('Edit message', message);
        if (edited != message) {
            console.log('change occurred');
            this.onEditFinish(message_id, edited);
        }
    }
    onEditFinish(message_id, message){
        this.setState({
            loading: true,
            loading_message: "Saving changes...",
        });
        $.ajax(endpoints.messages, {
            method: "POST",
            data: {
                mode: 'edit',
                message_id,
                message,
                user_id: this.props.user_id,
                crew_id: this.props.crew_id,
            }
        }).then((response)=>{
            try {
            let messages = JSON.parse(response);
            this.setState({
                loading: false,
                messages
            });
            } catch (e) {
                console.log(e);
                this.setState({loading: false});
            }
        });
    }
    postMessage(event){
        event.preventDefault();
        this.setState({
            posting: true,
            loading: false,
            loading_message: "Posting message...",
        });
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
                    loading: false,
                    message: '',
                    messages
                });
            } catch (e) {
                this.setState({
                    posting: false,
                    loading: false,
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
                    <span className="message-author">
                        {(item.user_id == this.props.user_id) ? 'you' : item.user_name}
                    </span>
                    { (item.message_edited == 1) ? (
                        <span> <i>(Edited)</i></span>
                    ) 
                    : ('')
                    }
                </div>

                {(item.user_id == user_id) ? (
                    <div className="edit-message-options">
                        <div className="message-action-delete message-action" onClick={()=>this.onDelete(item.message_id)}>
                            <span>Delete</span> <FontAwesomeIcon icon="trash-alt" />
                        </div>
                        <div className="message-action-edit message-action" onClick={()=>this.onEdit(item.message_id, item.message)}>
                            <span>Edit</span> <FontAwesomeIcon icon="edit" />
                        </div>
                    </div>
                ) : ('')}
            </div>
        );
        return (
            <div className="messages-section">
                <div className="message-list">{messages}</div>

                <Loader
                loading={this.state.loading}
                loading_message={this.state.loading_message} />

                <div className="message-create">
                    <form action="#" method="POST" className="message-form" onSubmit={this.postMessage}>
                        <input name="user_id" type="hidden" value={this.props.user_id} onChange={this.fetchMessages}/>
                        <input name="crew_id" type="hidden" value={this.props.crew_id} onChange={this.fetchMessages}/>
                        <textarea 
                        onChange={this.onChange} 
                        className="message-text" 
                        name="message" 
                        id="message-text"
                        placeholder="Enter a new message..."
                        maxLength="140"
                        value={this.state.message}/>
                        <button type="submit" className="message-submit">
                            {(this.state.posting) ? 'Posting...' : 'Submit'}
                        </button>
                    </form>
                </div>

                
            </div>
        );
    }
    componentDidMount() {
        if (this.props.crew_id && this.props.user_id) {
            this.fetchMessages();
        }
    }
}