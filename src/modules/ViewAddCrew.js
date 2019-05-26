import React from "react";

export class ViewAddCrew extends React.Component {
    constructor(props) {
        super(props);
        this.endpoint = "https://www.roberttamayo.com/skate/add.php";
        this.handleChange = this.handleChange.bind(this);
        this.handleAddNewCrew = this.handleAddNewCrew.bind(this);

        this.state = {
            crew_name: ''
        };
    }
    handleAddNewCrew(){
        this.props.handleAddNewCrew(this.state.crew_name);
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render(){
        return(
            <div className="mode-add-skater">
                <h3>Add New Crew</h3>
                {this.props.loading ? (
                    <div className="loading-inline">Loading</div>
                ) 
                : (
                    <div className="form-wrap">
                        <form onSubmit={this.handleAddNewCrew}>
                            <input type="text" required name="crew_name" value={this.state.crew_name} onChange={this.handleChange} placeholder="Crew Name"/>
                            <button onClick={this.onAddCrew}>Submit</button>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}