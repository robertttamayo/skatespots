import React from "react";
import {ViewAddCrew} from "./ViewAddCrew";
import { library } from '@fortawesome/fontawesome-svg-core';
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faMapMarkerAlt);

export class Crews extends React.Component {
    constructor(props){
        super(props);
        this.handleSelectCrew = this.handleSelectCrew.bind(this);
        this.handleAddNewCrew = this.handleAddNewCrew.bind(this);
        
        this.state = {
            loading: false
        }
    }
    handleSelectCrew(crew_id, crew_name){
        this.props.handleSelectCrew(crew_id, crew_name);
    }
    handleAddNewCrew(crew_name){
        this.setState({loading: true});
        this.props.handleAddNewCrew(crew_name).then((response)=>{
            this.setState({loading: false});
        });
    }
    render(){
        const crewsList = this.props.crews.map(item => 
            <div key={item.crew_id} className="skater-list-item-wrap">
                <div className="skater-list-name">
                    <span>{item.crew_name}</span>
                </div>

                <div className="skater-list-cta-group">
                    <div className="skater-list-count">
                        <FontAwesomeIcon icon="user" /> <span>{item.crew_member_count}</span> 
                    </div>

                    <div className="skater-list-count">
                        <FontAwesomeIcon icon="map-marker-alt" /> <span>{item.crew_spot_count}</span> 
                    </div>
                    
                    <div className="skater-list-cta"
                    onClick={()=>this.handleSelectCrew(item.crew_id, item.crew_name)}>
                        Select
                    </div>
                </div>
            </div>
        );
        return (
            <div className="skaters-wrap">
                <ViewAddCrew 
                loading={this.state.loading}
                handleAddNewCrew={this.handleAddNewCrew}/>

                <div className="skaters-list">
                    {crewsList}
                </div>
            </div>
        );
    }
}