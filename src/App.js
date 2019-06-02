import React from "react";
import ReactDOM from "react-dom";
import {Header} from "./modules/Header"; 
import {Reporter} from "./modules/Reporter"; 
import {Locator} from "./modules/Locator"; 
import {Footer} from "./modules/Footer"; 
import {LoginForm} from "./modules/LoginForm"; 
import {HomeMenu} from "./modules/HomeMenu";
import {Messages} from "./modules/Messages";
import {Skaters} from "./modules/Skaters";
import {Crews} from "./modules/Crews";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.menuAction = this.menuAction.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.fetchCrews = this.fetchCrews.bind(this);
        this.fetchSkaters = this.fetchSkaters.bind(this);
        this.handleSelectCrew = this.handleSelectCrew.bind(this);
        this.getHeaderTitleFromActionName = this.getHeaderTitleFromActionName.bind(this);
        this.handleAddNewCrew = this.handleAddNewCrew.bind(this);
        this.handleAddNewSkater = this.handleAddNewSkater.bind(this);

        this.baseUrl = 'https://www.roberttamayo.com/skate/api/';
        this.endpoints = {
            login: `${this.baseUrl}login.php`,
            skaters: `${this.baseUrl}skaters.php`,
            crews: `${this.baseUrl}crews.php`,
            spots: `${this.baseUrl}down.php`,
            uploadSpot: `${this.baseUrl}up.php`,
            user: `${this.baseUrl}user.php`,
            crew: `${this.baseUrl}crew.php`,
            activate: `${this.baseUrl}activate.php`,
        }
        this.views = {
            Add: "Add",
            Locator: "Locator",
            Messages: "Messages",
            Logout: "Logout",
            Main: "Main",
            Users: "Users",
            Crews: "Crews",
            Back: "Back",
        }
        this.lastView= this.views.Main;

        this.state = {
            user_data: this.props.user_data,
            user_name: this.props.user_name,
            user_id: this.props.user_id,
            crew_id: this.props.crew_id,
            user_role: this.props.user_role,
            signed_in: this.props.signed_in,
            user_magicword: '',
            activeView: 'Main',
            menuOpen: false,
            skaters: [],
            crews: [],
            headerTitle: '',
            selected_crew_id: ''
        };
    }
    fetchCrews() {
        return new Promise((resolve, reject) => {
            let endpoint = this.endpoints.crews;
            $.ajax(endpoint, {
                method: "POST",
                data: {}
            }).then((response)=>{
                try {
                    let data = JSON.parse(response);
                    console.log(data);
                    this.setState({
                        crews: data
                    });
                    resolve();
                } catch (e) {
                    console.log(e, response);
                    reject();
                }
            });
        });
    }  
    handleSelectCrew(crew_id) {
        this.setState({selected_crew_id: crew_id});
        this.fetchSkaters(crew_id).then(()=>{
            this.menuAction('Users');
        });
    }
    fetchSkaters(crew_id){
        return new Promise((resolve, reject) => {
            let endpoint = this.endpoints.skaters;
            $.ajax(endpoint, {
                method: "POST",
                data: {
                    crew_id
                }
            }).then((response)=>{
                try {
                    let data = JSON.parse(response);
                    this.setState({
                        skaters: data
                    });
                    resolve();
                } catch (e) {
                    console.log(e, response);
                    reject();
                }
            });
        });
    }
    toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }
    handleLogin() {
        $.ajax(this.endpoints.login, {
            method: "POST",
            data: {
                user_name: this.state.user_name,
                user_magicword: this.state.user_magicword
            }
        }).then((response)=>{
            try {
                let data = JSON.parse(response);
                if (data.success) {
                    const cookie_data_string = JSON.stringify({
                        user_name: data.user_name,
                        user_id: data.user_id,
                        user_role: data.user_role,
                        crew_id: data.crew_id
                    });
                    setCookie('user_data', cookie_data_string);
                    this.setState({
                        user_name: data.user_name,
                        user_id: data.user_id,
                        crew_id: data.crew_id,
                        user_role: data.user_role,
                        signed_in: true
                    });
                } else {
                    this.setState({
                        signed_in: false,
                        failed: true
                    })
                }
            } catch (e) {
                console.log(e, response);
            }
        });
    }
    handleAddNewCrew(crew_name){
        return new Promise((resolve, reject)=>{
            $.ajax(this.endpoints.crew, {
                method: "POST",
                data: {
                    crew_name,
                    action: 'create',
                }
            }).then((response)=>{
                try {
                    let crew = JSON.parse(response);
                    if (crew.crew_id && crew.crew_is_active && crew.crew_name) {
                        let crews = [...this.state.crews];
                        crews.push(crew);
                        this.setState({crews});
                    }
                    resolve(crew);
                } catch (e) {
                    console.error(e, response);
                    reject();
                }
            });
        });
    }
    handleAddNewSkater(skater_data) {
        return new Promise((resolve, reject) => {
            $.ajax(this.endpoints.user, {
                method: "POST",
                data: {
                    crew_id: this.state.selected_crew_id,
                    action: 'create',
                    user_name: skater_data.skater_username,
                    user_role: skater_data.skater_is_crew_leader ? 1 : 2,
                }
            }).then((response)=>{
                try{
                    let data = JSON.parse(response);
                    resolve(data);
                } catch(e) {
                    console.log(e, response);
                    reject();
                }
            });
        });
    }
    handleLoginChange(data) {
        this.setState({
            [data.name]: data.value
        });
    }
    getHeaderTitleFromActionName(actionName){
        let headerTitle = '';
        switch (actionName) {
            case "Add":
            headerTitle = 'Add';
            break;
            case "Locator":
            headerTitle = 'Spots';
            break;
            case "Messages":
            headerTitle = 'Messages';
            break;
            case "Logout":
            headerTitle = '';
            break;
            case "Main":
            headerTitle = '';
            break;
            case "Users":
            headerTitle = 'Skaters';
            break;
            case "Crews":
            headerTitle = 'Crews';
            break;
        }
        return headerTitle;
    }
    menuAction(actionName) {
        if (actionName == this.views.Main) {
            
        }
        let headerTitle = this.getHeaderTitleFromActionName(actionName);
        this.setState({
            activeView: actionName,
            headerTitle
        });
    }
    handleLogout(){
        const cookie_data_string = JSON.stringify({
            user_name: '',
            user_id: '',
            user_role: '',
            crew_id: ''
        });
        setCookie('user_data', cookie_data_string);
        this.setState({
            user_name: '',
            user_id: '',
            user_role: '',
            crew_id: '',
            signed_in: false
        });
    }
    render() {
        if (this.state.signed_in) {
            return (
                <div className={`app-wrap ${this.state.activeView} menu-open-${this.state.menuOpen}`}>
                    <Header menuAction={this.menuAction} 
                    user_data={this.state.user_data}
                    toggleMenu={this.toggleMenu}
                    menuOpen={this.state.menuOpen}
                    logout={this.handleLogout}
                    headerTitle={this.state.headerTitle}/>

                    <div className="app-body">
                        <div className="app-view app-view-main">
                            <HomeMenu 
                            menuAction={this.menuAction}
                            user_admin={this.state.user_data.user_role == 0}/>
                        </div>
 
                        <div className="app-view app-view-add">
                            <Reporter 
                            crew_id={this.state.crew_id}/>
                        </div>

                        <div className="app-view app-view-locator">
                            <Locator 
                            crew_id={this.state.crew_id}/>
                        </div>

                        <div className="app-view app-view-messages">
                            <Messages />
                        </div>

                        <div className="app-view app-view-skaters">
                            <Skaters 
                            skaters={this.state.skaters} 
                            crew_id={this.state.selected_crew_id}
                            user_can_add={this.state.user_role <= 1} 
                            handleAddNewSkater={this.handleAddNewSkater} 
                            activateEndpoint={this.endpoints.activate} />
                        </div>

                        <div className="app-view app-view-crews">
                            <Crews 
                            crews={this.state.crews}
                            user_id={this.state.user_id}
                            handleSelectCrew={this.handleSelectCrew}
                            handleAddNewCrew={this.handleAddNewCrew}/>
                        </div>
                    </div>

                    <Footer />
                </div>
            );
        } else {
            return (
                <LoginForm onLogin={this.handleLogin}
                onLoginChange={this.handleLoginChange} 
                user_name={this.user_name} 
                user_magicword={this.user_magicword}/>
            )
        }
    }
    componentDidMount(){
        if (this.state.user_data.user_role == 0) {
            this.fetchCrews();
        } else if (this.state.user_data.user_role == 1) {
            this.fetchSkaters(this.state.user_data.crew_id);
        }
    }
}

let user_data = getUserInfo();
let signed_in = (user_data != '');
ReactDOM.render(
    <App user_name={user_data.user_name}
    user_id={user_data.user_id}
    crew_id={user_data.crew_id}
    user_data={user_data}
    user_role={user_data.user_role}
    signed_in={signed_in}/>,
    document.getElementById('app')
);

function getUserInfo() {
    let user_cookie = getCookie('user_data');
    if (user_cookie != '') {
        try {
            let user_data = JSON.parse(user_cookie);
            return user_data;
        } catch (e) {
            console.log("error with parsing cookie");
        }
    }
    return false;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
