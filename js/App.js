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
        _this.compress = _this.compress.bind(_this);
        _this.activate = _this.activate.bind(_this);

        _this.endpoint = "https://www.roberttamayo.com/skate/up.php";
        _this.state = {
            spot_name: '',
            spot_description: '',
            image_file: null,
            image_height: 300,
            image_width: 400,
            active: false
        };
        return _this;
    }

    _createClass(Reporter, [{
        key: 'generate',
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
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState(_defineProperty({}, event.target.name, event.target.value));
        }
    }, {
        key: 'compress',
        value: function compress(event) {
            var _this3 = this;

            var fileName = event.target.files[0].name;
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function (event) {
                var img = new Image();
                img.src = event.target.result;
                img.onload = function () {
                    var elem = document.createElement('canvas');
                    var width = 400;
                    var scaleFactor = width / img.width;
                    var height = Math.floor(img.height * scaleFactor);
                    elem.width = width;
                    elem.height = height;
                    var ctx = elem.getContext('2d');
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    ctx.drawImage(elem, 0, 0, width, height);
                    ctx.canvas.toBlob(function (blob) {
                        var file = new File([blob], fileName, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        var image_preview_canvas = document.getElementById('image-preview-canvas');
                        var ctx = image_preview_canvas.getContext('2d');
                        _this3.setState({
                            image_file: file,
                            image_height: height,
                            image_width: width
                        });
                        ctx.drawImage(img, 0, 0, width, height);
                    }, 'image/jpeg', 1);
                }, reader.onerror = function (error) {
                    return console.log(error);
                };
            };
        }
    }, {
        key: 'activate',
        value: function activate() {
            console.log('activating form');
            this.setState({
                active: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var rendered = "not rendered";
            if (this.state.image_file !== null) {
                rendered = "rendered";
            }
            if (!this.state.active) {
                return React.createElement(
                    'div',
                    { className: 'reporter-wrap' },
                    React.createElement(
                        'div',
                        { className: 'reporter-cta button-cta', onClick: this.activate },
                        'Up this spot'
                    )
                );
            } else {
                return React.createElement(
                    'div',
                    { className: 'reporter-wrap' },
                    React.createElement(
                        'div',
                        { className: 'reporter-title' },
                        'Adding new spot'
                    ),
                    React.createElement(
                        'form',
                        { className: 'reporter-form', onSubmit: this.generate },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'label',
                                { className: 'standard-label', 'for': 'spot_name' },
                                'Name'
                            ),
                            React.createElement('input', { type: 'text', onChange: this.handleChange, value: this.state.spot_name, placeholder: 'Spot name', id: 'spot_name', name: 'spot_name' })
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'label',
                                { className: 'standard-label', 'for': 'spot_description' },
                                'Description (Optional)'
                            ),
                            React.createElement('input', { type: 'text', onChange: this.handleChange, value: this.state.spot_description, placeholder: 'Describe this spot (rails, stairs, etc)', id: 'spot_description', name: 'spot_description' })
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'label',
                                { 'for': 'image_file', className: 'file-label' },
                                'Upload an image'
                            ),
                            React.createElement('input', { id: 'image_file', name: 'image_file', onChange: this.compress, type: 'file', accept: 'image/*' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'image-preview' },
                            React.createElement('canvas', { width: this.state.image_width, height: this.state.image_height, id: 'image-preview-canvas' })
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'button',
                                { type: 'submit', className: 'button-cta' },
                                'Submit spot'
                            )
                        )
                    )
                );
            }
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
        key: 'render',
        value: function render() {
            return React.createElement(
                'header',
                { className: 'header-wrap' },
                React.createElement('img', { src: 'https://www.roberttamayo.com/skate/assets/images/noskate.png', alt: 'no skateboarding' })
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
        key: 'render',
        value: function render() {
            // use props to render the list instead of state
            var listItems = this.props.items.map(function (item) {
                return React.createElement(
                    'div',
                    { className: 'list-item', 'data-item-id': item.spot_id },
                    item.spot_name
                );
            });
            return React.createElement(
                'div',
                { className: 'locator-list' },
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

        var _this6 = _possibleConstructorReturn(this, (Maps.__proto__ || Object.getPrototypeOf(Maps)).call(this, props));

        _this6.create = _this6.create.bind(_this6);
        _this6.preRender = _this6.preRender.bind(_this6);

        _this6.map = {};
        _this6.tileLayer = {};
        _this6.lat = 39.5;
        _this6.lng = -98.35;
        _this6.zoom = 4;

        _this6.state = {
            items: _this6.props.items
        };
        return _this6;
    }

    _createClass(Maps, [{
        key: 'create',
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
        key: 'preRender',
        value: function preRender(items) {
            var _this7 = this;

            var lats = [];
            var lngs = [];

            items.forEach(function (item) {
                var lat = parseFloat(item.spot_lat);
                var lng = parseFloat(item.spot_lng);
                lats.push(lat);
                lngs.push(lng);

                L.marker([lat, lng]).addTo(_this7.map);
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
        key: 'render',
        value: function render() {
            this.preRender(this.props.items);

            return React.createElement(
                'div',
                { className: 'locator-map' },
                React.createElement('div', { id: 'map', ref: 'map' })
            );
        }
    }, {
        key: 'componentDidMount',
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

        var _this8 = _possibleConstructorReturn(this, (Locator.__proto__ || Object.getPrototypeOf(Locator)).call(this, props));

        _this8.endpoint = "https://www.roberttamayo.com/skate/down.php";
        _this8.gather = _this8.gather.bind(_this8);
        _this8.askUserLocation = _this8.askUserLocation.bind(_this8);

        _this8.state = {
            items: []
        };
        return _this8;
    }

    _createClass(Locator, [{
        key: 'gather',
        value: function gather() {
            var _this9 = this;

            return new Promise(function (resolve, reject) {
                $.ajax(_this9.endpoint, {
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
        key: 'askUserLocation',
        value: function askUserLocation() {
            var _this10 = this;

            return new Promise(function (resolve, reject) {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        _this10.user_lat = position.coords.latitude;
                        _this10.user_lng = position.coords.longitude;
                        resolve();
                    });
                } else {
                    reject();
                    alert("You share your location to view locations");
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'locator-wrap' },
                React.createElement(Lists, { items: this.state.items }),
                React.createElement(Maps, { items: this.state.items })
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this11 = this;

            this.gather().then(function (response) {
                console.log('response in cdm', response);
                _this11.setState({
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
        key: 'render',
        value: function render() {
            return React.createElement(
                'footer',
                { className: 'footer-wrap' },
                'Footer',
                React.createElement(
                    'a',
                    { href: '/credits.html' },
                    'No Skating by b farias from the Noun Project'
                )
            );
        }
    }]);

    return Footer;
}(React.Component);

var LoginForm = function (_React$Component7) {
    _inherits(LoginForm, _React$Component7);

    function LoginForm(props) {
        _classCallCheck(this, LoginForm);

        var _this13 = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

        console.log(props);
        _this13.handleLogin = _this13.handleLogin.bind(_this13);
        _this13.handleChange = _this13.handleChange.bind(_this13);
        _this13.state = {
            user_name: _this13.props.user_name,
            user_id: _this13.props.user_id,
            user_magicword: _this13.props.user_magicword,
            failed: false
        };
        return _this13;
    }

    _createClass(LoginForm, [{
        key: 'handleChange',
        value: function handleChange(event) {
            this.props.onLoginChange({
                name: event.target.name,
                value: event.target.value
            });
        }
    }, {
        key: 'handleLogin',
        value: function handleLogin(event) {
            event.preventDefault();
            this.props.onLogin();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { className: 'login-form', onSubmit: this.handleLogin },
                React.createElement('input', { type: 'text', value: this.state.user_name, onChange: this.handleChange, name: 'user_name', placeholder: 'Username' }),
                React.createElement('input', { type: 'password', value: this.state.user_magicword, name: 'user_magicword', onChange: this.handleChange, placeholder: 'Password' }),
                React.createElement(
                    'button',
                    { type: 'submit' },
                    'Login'
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

        var _this14 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this14.handleLoginChange = _this14.handleLoginChange.bind(_this14);
        _this14.handleLogin = _this14.handleLogin.bind(_this14);

        _this14.endpoint = 'https://www.roberttamayo.com/skate/login.php';

        _this14.state = {
            user_data: _this14.props.user_data,
            user_name: _this14.props.user_name,
            user_id: _this14.props.user_id,
            signed_in: _this14.props.signed_in,
            user_magicword: ''
        };
        return _this14;
    }

    _createClass(App, [{
        key: 'handleLogin',
        value: function handleLogin() {
            var _this15 = this;

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
                        setCookie('user_data', cookie_data_string);
                        _this15.setState({
                            user_name: data.user_name,
                            user_id: data.user_id,
                            signed_in: true
                        });
                    } else {
                        _this15.setState({
                            signed_in: false,
                            failed: true
                        });
                    }
                } catch (e) {}
                console.log(response);
            });
        }
    }, {
        key: 'handleLoginChange',
        value: function handleLoginChange(data) {
            this.setState(_defineProperty({}, data.name, data.value));
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.signed_in) {
                return React.createElement(
                    'div',
                    { className: 'app-wrap' },
                    React.createElement(Header, null),
                    React.createElement(
                        'div',
                        { className: 'app-body' },
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
/*
<!-- HTML Part -->
<input id="file" type="file" accept="image/*">
<script>
    document.getElementById("file").addEventListener("change", function (event) {
	compress(event);
});
</script>
*/