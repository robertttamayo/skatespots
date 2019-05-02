import React from "react";

export class ViewAddSkaterAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.endpoint = "https://www.roberttamayo.com/skate/add.php";
        this.state = {
            skater_username: '',
            skater_password: '',
            skater_crew: ''
        };
    }
    render(){
        return(
            <div className="mode-add-skater-admin">
                <h3>Add New Skater (Admin)</h3>
                <input type="text" placeholder="Username"/>
                <input type="text" placeholder="Password"/>
                <select>
                    
                </select>
            </div>
        );
    }
}