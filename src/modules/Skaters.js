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
            addSkaterHeaderText: 'Add New Skater',
        }

        this.originalState = Object.assign({}, {...this.state});
        $(document).on('reset', ()=>{
            this.setState(Object.assign({}, {...this.originalState}));
        });
    }
    handleAddNewSkater(skater_data){
        this.setState({
            loading: true
        });
        this.props.handleAddNewSkater(skater_data).then((response)=>{
            let shareLink = `${this.activateEndpoint}?user_id=${response.user_id}&key=${response.user_activate_key}`;
            this.setState({
                loading: false,
                shareLink,
                addSkaterHeaderText: 'Add Another Skater',
            })
        });
    }
    render(){
        const skatersList = this.props.skaters.map(item => 
            <div key={item.user_id} className="skater-list-item">
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
                    shareLink={this.state.shareLink}
                    headerText={this.state.addSkaterHeaderText}/>
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