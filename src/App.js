import {Header} from "./modules/Header"; 
import {Reporter} from "./modules/Reporter"; 
import {Locator} from "./modules/Locator"; 
import {Footer} from "./modules/Footer"; 
import {LoginForm} from "./modules/LoginForm"; 
import {HomeMenu} from "./modules/HomeMenu";
import {Messages} from "./modules/Messages";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        
        this.endpoint = 'https://www.roberttamayo.com/skate/login.php';

        this.state = {
            user_data: this.props.user_data,
            user_name: this.props.user_name,
            user_id: this.props.user_id,
            signed_in: this.props.signed_in,
            user_magicword: ''
        };
    }
    handleLogin() {
        $.ajax(this.endpoint, {
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
                        user_id: data.user_id
                    });
                    setCookie('user_data', cookie_data_string);
                    this.setState({
                        user_name: data.user_name,
                        user_id: data.user_id,
                        signed_in: true
                    });
                } else {
                    this.setState({
                        signed_in: false,
                        failed: true
                    })
                }
            } catch (e) {

            }
            console.log(response);
        });
    }
    handleLoginChange(data) {
        this.setState({
            [data.name]: data.value
        });
    }
    render() {
        if (this.state.signed_in) {
            return (
                <div className="app-wrap">
                    <Header />

                    <div className="app-body">
                        <div className="app-view app-view-main">
                            <HomeMenu />
                        </div>

                        <div className="app-view app-view-locator">
                            <Reporter />

                            <Locator />
                        </div>

                        <div className="app-view app-view-messages">
                            <Messages />
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
}

let user_data = getUserInfo();
let signed_in = (user_data != '');
ReactDOM.render(
    <App user_name={user_data.user_name}
    user_id={user_data.user_id}
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
