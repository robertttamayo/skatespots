import React from "react";
import ReactDOM from "react-dom";
import {MenuActions} from "./constants/MenuActions";
import {Header} from "./modules/Header"; 
import {Reporter} from "./modules/Reporter"; 
import {Locator} from "./modules/Locator"; 
import {Footer} from "./modules/Footer"; 
import {LoginForm} from "./modules/LoginForm"; 
import {HomeMenu} from "./modules/HomeMenu";
import {Messages} from "./modules/Messages";
import {Skaters} from "./modules/Skaters";
import {Crews} from "./modules/Crews";
import {Loader} from "./modules/Loader";
import {getUserInfo, setCookie, getCookie, deleteCookie, CookieNames} from "./utils/Cookies";
import {endpoints} from "./constants/Endpoints";

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
            crew_name: this.props.crew_name,
            user_role: this.props.user_role,
            signed_in: this.props.signed_in,
            user_magicword: '',
            activeView: 'Main',
            menuOpen: false,
            skaters: [],
            crews: [],
            headerTitle: '',
            selected_crew_id: '',
            selected_crew_name: '',
            loading: false,
            loading_message: 'Loading data...',
        };
    }
    fetchCrews() {
        return new Promise((resolve, reject) => {
            let endpoint = endpoints.crews;
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
    handleSelectCrew(crew_id, crew_name) {
        console.log(crew_name);
        this.setState({
            selected_crew_id: crew_id,
            selected_crew_name: crew_name
        });
        this.fetchSkaters(crew_id).then(()=>{
            this.menuAction('Users');
        });
    }
    fetchSkaters(crew_id){
        return new Promise((resolve, reject) => {
            let endpoint = endpoints.skaters;
            $.ajax(endpoint, {
                method: "POST",
                data: {
                    crew_id
                }
            }).then((response)=>{
                try {
                    let data = JSON.parse(response);
                    console.log(data);
                    this.setState({
                        skaters: data,
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
        this.setState({loading: true, loading_message: 'Logging in...'});
        $.ajax(endpoints.login, {
            method: "POST",
            data: {
                user_name: this.state.user_name,
                user_magicword: this.state.user_magicword
            },
            withCredentials: true,
        }).then((response)=>{
            try {
                let data = JSON.parse(response);
                if (data.status == 'success') {
                    const cookie_data_string = JSON.stringify({
                        user_name: data.user_name,
                        user_id: data.user_id,
                        user_role: data.user_role,
                        crew_id: data.crew_id,
                        crew_name: data.crew_name,
                    });
                    setCookie(CookieNames.server, cookie_data_string);
                    let loading_message = data.user_role == 0 ? 'Fetching crews...' : 'Fetching skaters...';
                    this.setState({
                        user_name: data.user_name,
                        user_id: data.user_id,
                        crew_id: data.crew_id,
                        crew_name: data.crew_name,
                        user_role: data.user_role,
                        signed_in: true,
                        loading_message,
                        user_data: getUserInfo(),
                    });
                    if (data.user_role == 0) {
                        this.fetchCrews().then((response) => {
                            this.setState({loading: false});
                        });
                    } else {
                        this.fetchSkaters(data.crew_id).then((response) => {
                            this.setState({loading: false});
                        });
                    }
                } else {
                    this.setState({
                        signed_in: false,
                        failed: true,
                        loading: false,
                    })
                }
            } catch (e) {
                this.setState({
                    signed_in: false,
                    failed: true,
                    loading: false,
                })
                console.log(e, response);
            }
        });
    }
    handleAddNewCrew(crew_name){
        return new Promise((resolve, reject)=>{
            $.ajax(endpoints.crew, {
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
            $.ajax(endpoints.user, {
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
        console.log(actionName);
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
        let headerTitle = this.getHeaderTitleFromActionName(actionName);
        this.setState({
            activeView: actionName,
            headerTitle,
            menuOpen: false,
        });
        if (actionName == this.views.Locator) {
            window.setTimeout(()=>$(document).trigger('center_map'), 200);
        }
    }
    handleLogout(){
        deleteCookie('user_data');
        let headerTitle = this.getHeaderTitleFromActionName(MenuActions.Main);
        this.setState({
            activeView: MenuActions.Main,
            headerTitle,
            user_name: '',
            user_id: '',
            user_role: '',
            crew_id: '',
            signed_in: false,
            menuOpen: false,
            user_data: null,
        });
    }
    render() {
        return (    
            <div className={`app-wrap ${this.state.activeView} menu-open-${this.state.menuOpen}`}>
                <Header menuAction={this.menuAction} 
                user_data={this.state.user_data}
                toggleMenu={this.toggleMenu}
                menuOpen={this.state.menuOpen}
                logout={this.handleLogout}
                headerTitle={this.state.headerTitle}
                user_admin={this.state.user_role == 0}/>

                {(this.state.signed_in) ? (
                    <div className="app-body">
                        <div className="app-view app-view-main">
                            <HomeMenu 
                            menuAction={this.menuAction}
                            user_admin={this.state.user_role == 0}/>
                        </div>

                        <div className="app-view app-view-add">
                            <Reporter 
                            crew_id={this.state.crew_id}
                            spot_added_by={this.state.user_id}/>
                        </div>

                        <div className="app-view app-view-locator">
                            <Locator 
                            crew_id={this.state.crew_id}/>
                        </div>

                        <div className="app-view app-view-messages">
                            <Messages 
                            user_id={this.state.user_id}
                            crew_id={this.state.crew_id}/>
                        </div>

                        <div className="app-view app-view-skaters">
                            <Skaters 
                            skaters={this.state.skaters} 
                            crew_id={(this.state.user_role == 0) ? this.state.selected_crew_id : this.state.crew_id}
                            crew_name={(this.state.user_role == 0) ? this.state.selected_crew_name : this.state.crew_name}
                            user_can_add={this.state.user_role <= 1} 
                            handleAddNewSkater={this.handleAddNewSkater} 
                            activateEndpoint={endpoints.activate} 
                            />
                        </div>

                        <div className="app-view app-view-crews">
                            <Crews 
                            crews={this.state.crews}
                            user_id={this.state.user_id}
                            handleSelectCrew={this.handleSelectCrew}
                            handleAddNewCrew={this.handleAddNewCrew}/>
                        </div>
                    </div>
                ) : (
                    <div className="login-wrapper">
                        <LoginForm onLogin={this.handleLogin}
                        onLoginChange={this.handleLoginChange} 
                        user_name={this.user_name} 
                        user_magicword={this.user_magicword}/>
                    </div>
                )
                }

                <Loader
                loading={this.state.loading}
                loading_message={this.state.loading_message}
                />

                <Footer />
            </div>
        );
    }
    componentDidMount(){
        if (this.state.user_data) {
            if (this.state.user_data.user_role == 0) {
                this.fetchCrews();
            } else {
                this.fetchSkaters(this.state.user_data.crew_id);
            }
        }
    }
}

let user_data = getUserInfo();
let signed_in = (user_data != '');

ReactDOM.render(
    <App user_name={user_data.user_name}
    user_id={user_data.user_id}
    crew_id={user_data.crew_id}
    crew_name={user_data.crew_name}
    user_data={user_data}
    user_role={user_data.user_role}
    signed_in={signed_in}/>,
    document.getElementById('app')
);
