import React from "react";
import {ViewAddSkater} from "./ViewAddSkater";
import { library } from '@fortawesome/fontawesome-svg-core';
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faMapMarkerAlt);

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
            <div key={item.user_id} className="skater-list-item-wrap">
                <div className="skater-list-name">
                    <span>{item.user_name}</span>
                </div>

                <div className="skater-list-cta-group">
                    <div className="skater-list-count">
                        <FontAwesomeIcon icon="map-marker-alt" /> <span>{item.user_spots_added_count}</span> 
                    </div>
                    
                    <div className="skater-list-cta"
                    onClick={()=>this.handleSelectCrew(item.crew_id)}>
                        Select
                    </div>
                </div>
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