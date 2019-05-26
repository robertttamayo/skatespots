import React from "react";
import {ViewAddSkater} from "./ViewAddSkater";

export class Skaters extends React.Component {
    constructor(props){
        super(props);
        this.onStartAdd = this.onStartAdd.bind(this);
        this.onFinishAdd = this.onFinishAdd.bind(this);
    }
    onStartAdd(){
        
    }
    onFinishAdd(){

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
                    <ViewAddSkater onFinish={this.onFinishAdd}/>
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