var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reporter = function (_React$Component) {
    _inherits(Reporter, _React$Component);

    function Reporter(props) {
        _classCallCheck(this, Reporter);

        var _this = _possibleConstructorReturn(this, (Reporter.__proto__ || Object.getPrototypeOf(Reporter)).call(this, props));

        _this.generate = _this.generate.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);

        _this.endpoint = "https://www.roberttamayo.com/skate/up.php";
        _this.state = {
            spot_name: ''
        };
        return _this;
    }

    _createClass(Reporter, [{
        key: "generate",
        value: function generate(event) {
            var _this2 = this;

            event.preventDefault();
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.log(position);
                    $.ajax(_this2.endpoint, {
                        method: "POST",
                        data: {
                            lat: position.coords.latitude.toString(),
                            lng: position.coords.longitude.toString(),
                            spot_name: _this2.state.spot_name
                        }
                    }).then(function (response) {
                        console.log(response);
                    });
                    //do_something(position.coords.latitude, position.coords.longitude);
                });
            } else {
                alert("You must allow location to report a spot");
            }
        }
    }, {
        key: "handleChange",
        value: function handleChange(event) {
            this.setState(_defineProperty({}, event.target.name, event.target.value));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "reporter-wrap" },
                React.createElement(
                    "div",
                    { "class": "reporter-cta" },
                    "Up this spot"
                ),
                React.createElement(
                    "form",
                    { "class": "reporter-form", onSubmit: this.generate },
                    React.createElement("input", { type: "text", onChange: this.handleChange, value: this.state.spot_name, placeholder: "Spot name", name: "spot_name" }),
                    React.createElement(
                        "button",
                        { type: "submit" },
                        "Add"
                    )
                )
            );
        }
    }]);

    return Reporter;
}(React.Component);

var Header = function (_React$Component2) {
    _inherits(Header, _React$Component2);

    function Header(props) {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
    }

    _createClass(Header, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "header",
                { "class": "header-wrap" },
                "Header"
            );
        }
    }]);

    return Header;
}(React.Component);

var Lists = function (_React$Component3) {
    _inherits(Lists, _React$Component3);

    function Lists(props) {
        _classCallCheck(this, Lists);

        return _possibleConstructorReturn(this, (Lists.__proto__ || Object.getPrototypeOf(Lists)).call(this, props));
    }

    _createClass(Lists, [{
        key: "render",
        value: function render() {
            // use props to render the list instead of state
            var listItems = this.props.items.map(function (item) {
                return React.createElement(
                    "div",
                    { "class": "list-item", "data-item-id": item.spot_id },
                    item.spot_name
                );
            });
            return React.createElement(
                "div",
                { "class": "locator-list" },
                listItems
            );
        }
    }]);

    return Lists;
}(React.Component);

var Maps = function (_React$Component4) {
    _inherits(Maps, _React$Component4);

    function Maps(props) {
        _classCallCheck(this, Maps);

        var _this5 = _possibleConstructorReturn(this, (Maps.__proto__ || Object.getPrototypeOf(Maps)).call(this, props));

        _this5.create = _this5.create.bind(_this5);
        _this5.preRender = _this5.preRender.bind(_this5);

        _this5.map = {};
        _this5.tileLayer = {};
        _this5.lat = 39.5;
        _this5.lng = -98.35;
        _this5.zoom = 4;

        _this5.state = {
            items: _this5.props.items
        };
        return _this5;
    }

    _createClass(Maps, [{
        key: "create",
        value: function create() {
            this.map = L.map(this.refs.map, {
                attributionControl: false,
                scrollWheelZoom: false,
                doubleClickZoom: 'center',
                zoomSnap: 1
            }).setView([this.lat, this.lng], this.zoom);

            this.tileLayer = L.gridLayer.googleMutant({
                type: 'roadmap' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
            }).addTo(this.map);
        }
    }, {
        key: "preRender",
        value: function preRender(items) {
            var _this6 = this;

            var lats = [];
            var lngs = [];

            items.forEach(function (item) {
                var lat = parseFloat(item.spot_lat);
                var lng = parseFloat(item.spot_lng);
                lats.push(lat);
                lngs.push(lng);

                L.marker([lat, lng]).addTo(_this6.map);
            });

            lats.sort(function (a, b) {
                return a - b;
            });
            lngs.sort(function (a, b) {
                return a - b;
            });
            if (lats.length && lngs.length) {
                var minLat = lats[0];
                var minLng = lngs[0];
                var maxLat = lats[lats.length - 1];
                var maxLng = lngs[lngs.length - 1];

                var southWest = new L.LatLng(minLat, maxLng);
                var northEast = new L.LatLng(maxLat, minLng);
                var bounds = new L.LatLngBounds(southWest, northEast);

                var options = {
                    maxZoom: 14,
                    noMoveStart: true,
                    padding: [80, 80]
                };

                try {
                    this.map.fitBounds(bounds, options);
                } catch (e) {}
            }
        }
    }, {
        key: "render",
        value: function render() {
            this.preRender(this.props.items);

            return React.createElement(
                "div",
                { "class": "locator-map" },
                React.createElement("div", { id: "map", ref: "map" })
            );
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            console.log('did mount');
            this.create();
        }
    }]);

    return Maps;
}(React.Component);

var Locator = function (_React$Component5) {
    _inherits(Locator, _React$Component5);

    function Locator(props) {
        _classCallCheck(this, Locator);

        var _this7 = _possibleConstructorReturn(this, (Locator.__proto__ || Object.getPrototypeOf(Locator)).call(this, props));

        _this7.endpoint = "https://www.roberttamayo.com/skate/down.php";
        _this7.gather = _this7.gather.bind(_this7);
        _this7.askUserLocation = _this7.askUserLocation.bind(_this7);

        _this7.state = {
            items: []
        };
        return _this7;
    }

    _createClass(Locator, [{
        key: "gather",
        value: function gather() {
            var _this8 = this;

            return new Promise(function (resolve, reject) {
                $.ajax(_this8.endpoint, {
                    method: "POST",
                    data: {}
                }).then(function (response) {
                    try {
                        var response_data = JSON.parse(response);
                        console.log(response_data);
                        resolve(response_data);
                    } catch (e) {
                        console.log(e);
                        resolve({});
                    }
                });
            });
        }
    }, {
        key: "askUserLocation",
        value: function askUserLocation() {
            var _this9 = this;

            return new Promise(function (resolve, reject) {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        console.log(position);
                        _this9.user_lat = position.coords.latitude;
                        _this9.user_lng = position.coords.longitude;
                        resolve();
                    });
                } else {
                    reject();
                    alert("You share your location to view locations");
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "locator-wrap" },
                React.createElement(Lists, { items: this.state.items }),
                React.createElement(Maps, { items: this.state.items })
            );
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this10 = this;

            this.gather().then(function (response) {
                console.log('response in cdm', response);
                _this10.setState({
                    items: response
                });
            });
            // Promise.all([this.gather(), this.askUserLocation()]).then((values) => {
            //     console.log(values);
            // });
        }
    }]);

    return Locator;
}(React.Component);

var Footer = function (_React$Component6) {
    _inherits(Footer, _React$Component6);

    function Footer(props) {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));
    }

    _createClass(Footer, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "footer",
                { "class": "footer-wrap" },
                "Footer"
            );
        }
    }]);

    return Footer;
}(React.Component);

var LoginForm = function (_React$Component7) {
    _inherits(LoginForm, _React$Component7);

    function LoginForm(props) {
        _classCallCheck(this, LoginForm);

        var _this12 = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

        console.log(props);
        _this12.handleLogin = _this12.handleLogin.bind(_this12);
        _this12.handleChange = _this12.handleChange.bind(_this12);
        _this12.state = {
            user_name: _this12.props.user_name,
            user_id: _this12.props.user_id,
            user_magicword: _this12.props.user_magicword,
            failed: false
        };
        return _this12;
    }

    _createClass(LoginForm, [{
        key: "handleChange",
        value: function handleChange(event) {
            this.props.onLoginChange({
                name: event.target.name,
                value: event.target.value
            });
        }
    }, {
        key: "handleLogin",
        value: function handleLogin(event) {
            event.preventDefault();
            this.props.onLogin();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { "class": "login-form", onSubmit: this.handleLogin },
                React.createElement("input", { type: "text", value: this.state.user_name, onChange: this.handleChange, name: "user_name", placeholder: "Username" }),
                React.createElement("input", { type: "password", value: this.state.user_magicword, name: "user_magicword", onChange: this.handleChange, placeholder: "Password" }),
                React.createElement(
                    "button",
                    { type: "submit" },
                    "Login"
                )
            );
        }
    }]);

    return LoginForm;
}(React.Component);

var App = function (_React$Component8) {
    _inherits(App, _React$Component8);

    function App(props) {
        _classCallCheck(this, App);

        var _this13 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this13.handleLoginChange = _this13.handleLoginChange.bind(_this13);
        _this13.handleLogin = _this13.handleLogin.bind(_this13);

        _this13.endpoint = 'https://www.roberttamayo.com/skate/login.php';

        _this13.state = {
            user_data: _this13.props.user_data,
            user_name: _this13.props.user_name,
            user_id: _this13.props.user_id,
            signed_in: _this13.props.signed_in,
            user_magicword: ''
        };
        return _this13;
    }

    _createClass(App, [{
        key: "handleLogin",
        value: function handleLogin() {
            var _this14 = this;

            $.ajax(this.endpoint, {
                method: "POST",
                data: {
                    user_name: this.state.user_name,
                    user_magicword: this.state.user_magicword
                }
            }).then(function (response) {
                try {
                    var data = JSON.parse(response);
                    if (data.success) {
                        var cookie_data_string = JSON.stringify({
                            user_name: data.user_name,
                            user_id: data.user_id
                        });
                        console.log(cookie_data_string);
                        setCookie('user_data', cookie_data_string);
                        _this14.setState({
                            user_name: data.user_name,
                            user_id: data.user_id,
                            signed_in: true
                        });
                    } else {
                        _this14.setState({
                            signed_in: false,
                            failed: true
                        });
                    }
                } catch (e) {}
                console.log(response);
            });
        }
    }, {
        key: "handleLoginChange",
        value: function handleLoginChange(data) {
            this.setState(_defineProperty({}, data.name, data.value));
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.signed_in) {
                return React.createElement(
                    "div",
                    { "class": "app-wrap" },
                    React.createElement(Header, null),
                    React.createElement(
                        "div",
                        { "class": "app-body" },
                        React.createElement(Reporter, null),
                        React.createElement(Locator, null)
                    ),
                    React.createElement(Footer, null)
                );
            } else {
                return React.createElement(LoginForm, { onLogin: this.handleLogin,
                    onLoginChange: this.handleLoginChange,
                    user_name: this.user_name,
                    user_magicword: this.user_magicword });
            }
        }
    }]);

    return App;
}(React.Component);

var user_data = getUserInfo();
var signed_in = user_data != '';
ReactDOM.render(React.createElement(App, { user_name: user_data.user_name,
    user_id: user_data.user_id,
    signed_in: signed_in }), document.getElementById('app'));

function getUserInfo() {
    var user_cookie = getCookie('user_data');
    if (user_cookie != '') {
        try {
            var _user_data = JSON.parse(user_cookie);
            return _user_data;
        } catch (e) {
            console.log("error with parsing cookie");
        }
    }
    return false;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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