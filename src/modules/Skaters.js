import React from "react";
import {ViewAddSkater} from "./ViewAddSkater";

export class Skaters extends React.Component {
    constructor(props){
        super(props);
        this.onStartAdd = this.onStartAdd.bind(this);
        this.onFinishAdd = this.onFinishAdd.bind(this);

        this.state = {
            skaters: this.props.skaters
        }
    }
    onStartAdd(){
        
    }
    onFinishAdd(){

    }
    render(){
        const skatersList = this.state.skaters.map(item => 
            <div className="skater-list-item">
                {item.user_name}
            </div>
        );
        return (
            <div className="skaters-wrap">
                <div className="skaters-title">Skaters</div>

                <div className="skaters-list">
                    {skatersList}
                </div>

                <div className="skater-add" onClick={this.onStartAdd}>
                    Add Skater
                </div>

                <ViewAddSkater onFinish={this.onFinishAdd}/>
            </div>
        );
    }
}