import React from "react";

export class ViewAddCrew extends React.Component {
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
            <div className="mode-add-skater">
                <h3>Add New Skater</h3>
                <input type="text" placeholder="Username"/>
                <input type="text" placeholder="Password"/>
            </div>
        );
    }
}