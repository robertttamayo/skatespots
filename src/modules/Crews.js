import React from "react";
import {ViewAddCrew} from "./ViewAddCrew";

export class Crews extends React.Component {
    constructor(props){
        super(props);
        this.handleSelectCrew = this.handleSelectCrew.bind(this);
        this.handleAddNewCrew = this.handleAddNewCrew.bind(this);
        
        this.state = {
            loading: false
        }
    }
    handleSelectCrew(crew_id){
        this.props.handleSelectCrew(crew_id);
    }
    handleAddNewCrew(crew_name){
        this.setState({loading: true});
        this.props.handleAddNewCrew(crew_name).then((response)=>{
            console.log(response);
            this.setState({loading: false});
        });
    }
    render(){
        const crewsList = this.props.crews.map(item => 
            <div className="skater-list-item-wrap">
                <div className="skater-list-name">{item.crew_name}</div>
                <div className="skater-list-cta-group">
                    <div className="skater-list-cta"
                    onClick={()=>this.handleSelectCrew(item.crew_id)}>
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