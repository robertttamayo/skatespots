import React from "react";
import {ViewAddSkater} from "./ViewAddSkater";

export class Skaters extends React.Component {
    constructor(props){
        super(props);
        this.activateEndpoint = this.props.activateEndpoint;
        this.handleAddNewSkater = this.handleAddNewSkater.bind(this);
        this.state = {
            loading: false,
            shareLink: '',
        }
    }
    handleAddNewSkater(skater_data){
        console.log(skater_data);
        this.setState({
            loading: true
        });
        this.props.handleAddNewSkater(skater_data).then((response)=>{
            console.log('Done adding new skater', response);
            let shareLink = `${this.activateEndpoint}?user_id=${response.user_id}&key=${response.user_activate_key}`;
            this.setState({
                loading: false,
                shareLink
            })
        });
    }
    render(){
        const skatersList = this.props.skaters.map(item => 
            <div className="skater-list-item">
                {item.user_name}
            </div>
        );
        return (
            <div className="skaters-wrap">
                {this.props.user_can_add ? (
                    <ViewAddSkater 
                    handleAddNewSkater={this.handleAddNewSkater}
                    loading={this.state.loading}
                    crew_id={this.props.crew_id}
                    shareLink={this.state.shareLink}/>
                ) : (
                    ''
                )}
                
                <div className="skaters-list">
                    {skatersList}
                </div>
            </div>
        );
    }
}