!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n.r(t);var u=function(e){function t(e){var n,r,c;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,(n=!(c=a(t).call(this,e))||"object"!==o(c)&&"function"!=typeof c?i(r):c).onBack=n.onBack.bind(i(n)),n.onMenu=n.onMenu.bind(i(n)),n.menuAddCrew=n.menuAddCrew.bind(i(n)),n.menuAddCrewLeader=n.menuAddCrewLeader.bind(i(n)),n.menuAddSkater=n.menuAddSkater.bind(i(n)),n.state={user_data:n.props.user_data},n}var n,u,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(t,React.Component),n=t,(u=[{key:"onBack",value:function(){this.props.menuAction("Main")}},{key:"onMenu",value:function(){this.props.toggleMenu()}},{key:"menuAddCrew",value:function(){return React.createElement("div",{className:"menu-list-item"},"Add Crew")}},{key:"menuAddSkater",value:function(){return React.createElement("div",{className:"menu-list-item"},"Add Skater")}},{key:"menuAddCrewLeader",value:function(){return React.createElement("div",{className:"menu-list-item"},"Add Crew Leader")}},{key:"render",value:function(){var e=this.menuAddCrew()+this.menuAddSkater()+this.menuAddCrewLeader();return React.createElement("header",{className:"header-wrap"},React.createElement("div",{className:"icon-button button-action-main",onClick:this.onBack},"←"),React.createElement("div",{className:"icon-button button-action-menu",onClick:this.onMenu},"Menu"),React.createElement("div",{className:"slide-menu"},e))}}])&&r(n.prototype,u),s&&r(n,s),t}();function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var d=function(e){function t(e){var n,o,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,(n=!(r=f(t).call(this,e))||"object"!==s(r)&&"function"!=typeof r?p(o):r).generate=n.generate.bind(p(n)),n.handleChange=n.handleChange.bind(p(n)),n.compress=n.compress.bind(p(n)),n.activate=n.activate.bind(p(n)),n.getCoords=n.getCoords.bind(p(n)),n.crew_id=n.props.crew_id,n.coords={lat:"123.9309230",lng:"99.30904290"},n.endpoint="https://www.roberttamayo.com/skate/up.php",n.state={spot_name:"",spot_description:"",image_file:null,image_height:300,image_width:400,active:!1},n}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,React.Component),n=t,(o=[{key:"getCoords",value:function(){return""!=this.coords.lat?"Lat: ".concat(this.coords.lat,", Lng: ").concat(this.coords.lng):""}},{key:"generate",value:function(e){var t=this;e.preventDefault(),"geolocation"in navigator?navigator.geolocation.getCurrentPosition(function(e){console.log(e),t.coords.lat=e.coords.latitude.toString(),t.coords.lng=e.coords.latitude.toString(),$.ajax(t.endpoint,{method:"POST",data:{lat:e.coords.latitude.toString(),lng:e.coords.longitude.toString(),spot_name:t.state.spot_name,crew_id:t.crew_id}}).then(function(e){console.log(e)})}):alert("You must allow location to report a spot")}},{key:"handleChange",value:function(e){var t,n,o;this.setState((t={},n=e.target.name,o=e.target.value,n in t?Object.defineProperty(t,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[n]=o,t))}},{key:"compress",value:function(e){var t=this,n=e.target.files[0].name,o=new FileReader;o.readAsDataURL(e.target.files[0]),o.onload=function(e){var r=new Image;r.src=e.target.result,r.onload=function(){var e=document.createElement("canvas"),o=400/r.width,a=Math.floor(r.height*o);e.width=400,e.height=a;var i=e.getContext("2d");i.drawImage(r,0,0,r.width,r.height),i.drawImage(e,0,0,400,a),i.canvas.toBlob(function(e){var o=new File([e],n,{type:"image/jpeg",lastModified:Date.now()}),i=document.getElementById("image-preview-canvas").getContext("2d");t.setState({image_file:o,image_height:a,image_width:400}),i.drawImage(r,0,0,400,a)},"image/jpeg",1)},o.onerror=function(e){return console.log(e)}}}},{key:"activate",value:function(){console.log("activating form"),this.setState({active:!0})}},{key:"render",value:function(){return null!==this.state.image_file&&"rendered",React.createElement("div",{className:"reporter-wrap"},React.createElement("div",{className:"reporter-title"},"Adding a Spot"),React.createElement("form",{className:"reporter-form",onSubmit:this.generate},React.createElement("div",null,React.createElement("label",{className:"standard-label",for:"spot_name"},"Name"),React.createElement("input",{type:"text",onChange:this.handleChange,value:this.state.spot_name,placeholder:"Name",id:"spot_name",name:"spot_name"})),React.createElement("div",null,React.createElement("label",{className:"standard-label",for:"spot_description"},"Description (Optional)"),React.createElement("textarea",{onChange:this.handleChange,value:this.state.spot_description,placeholder:"Description",id:"spot_description",name:"spot_description"})),React.createElement("div",null,React.createElement("label",{for:"image_file",className:"file-label"},"Add an Image"),React.createElement("input",{id:"image_file",name:"image_file",onChange:this.compress,type:"file",accept:"image/*"})),React.createElement("div",{className:"image-preview"},React.createElement("canvas",{style:{display:this.state.image_file?"default":"none"},width:this.state.image_width,height:this.state.image_height,id:"image-preview-canvas"})),React.createElement("div",null,React.createElement("button",{type:"submit",className:"button-cta"},"Post")),React.createElement("div",{className:"coords"},this.getCoords())))}}])&&l(n.prototype,o),r&&l(n,r),t}();function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function b(e,t){return!t||"object"!==y(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var _=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),b(this,g(t).call(this,e))}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,React.Component),n=t,(o=[{key:"render",value:function(){var e=this.props.items.map(function(e){return React.createElement("div",{className:"list-item","data-item-id":e.spot_id},e.spot_name)});return React.createElement("div",{className:"locator-list"},e)}}])&&h(n.prototype,o),r&&h(n,r),t}();function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function j(e,t){return(j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var R=function(e){function t(e){var n,o,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,(n=!(r=S(t).call(this,e))||"object"!==w(r)&&"function"!=typeof r?E(o):r).create=n.create.bind(E(n)),n.preRender=n.preRender.bind(E(n)),n.map={},n.tileLayer={},n.lat=39.5,n.lng=-98.35,n.zoom=4,n.state={items:n.props.items},n}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&j(e,t)}(t,React.Component),n=t,(o=[{key:"create",value:function(){this.map=L.map(this.refs.map,{attributionControl:!1,scrollWheelZoom:!1,doubleClickZoom:"center",zoomSnap:1}).setView([this.lat,this.lng],this.zoom),this.tileLayer=L.gridLayer.googleMutant({type:"roadmap"}).addTo(this.map)}},{key:"preRender",value:function(e){var t=this,n=[],o=[];if(e.forEach(function(e){var r=parseFloat(e.spot_lat),a=parseFloat(e.spot_lng);n.push(r),o.push(a),L.marker([r,a]).addTo(t.map)}),n.sort(function(e,t){return e-t}),o.sort(function(e,t){return e-t}),n.length&&o.length){var r=n[0],a=o[0],i=n[n.length-1],c=o[o.length-1],u=new L.LatLng(r,c),s=new L.LatLng(i,a),l=new L.LatLngBounds(u,s);try{this.map.fitBounds(l,{maxZoom:14,noMoveStart:!0,padding:[80,80]})}catch(e){}}}},{key:"render",value:function(){return this.preRender(this.props.items),React.createElement("div",{className:"locator-map"},React.createElement("div",{id:"map",ref:"map"}))}},{key:"componentDidMount",value:function(){console.log("did mount"),this.create()}}])&&O(n.prototype,o),r&&O(n,r),t}();function k(e){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function N(e,t){return(N=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var M=function(e){function t(e){var n,o,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,(n=!(r=P(t).call(this,e))||"object"!==k(r)&&"function"!=typeof r?A(o):r).endpoint="https://www.roberttamayo.com/skate/down.php",n.gather=n.gather.bind(A(n)),n.askUserLocation=n.askUserLocation.bind(A(n)),n.crew_id=n.props.crew_id,n.state={items:[]},n}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&N(e,t)}(t,React.Component),n=t,(o=[{key:"gather",value:function(){var e=this;return console.log(this.crew_id),new Promise(function(t,n){$.ajax(e.endpoint,{method:"POST",data:{crew_id:e.crew_id}}).then(function(e){try{var n=JSON.parse(e);console.log(n),t(n)}catch(e){console.log(e),t({})}})})}},{key:"askUserLocation",value:function(){var e=this;return new Promise(function(t,n){"geolocation"in navigator?navigator.geolocation.getCurrentPosition(function(n){e.user_lat=n.coords.latitude,e.user_lng=n.coords.longitude,t()}):(n(),alert("You share your location to view locations"))})}},{key:"render",value:function(){return React.createElement("div",{className:"locator-wrap"},React.createElement(_,{items:this.state.items}),React.createElement(R,{items:this.state.items}))}},{key:"componentDidMount",value:function(){var e=this;this.gather().then(function(t){console.log("response in cdm",t),e.setState({items:t})})}}])&&C(n.prototype,o),r&&C(n,r),t}();function T(e){return(T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function B(e,t){return!t||"object"!==T(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function D(e){return(D=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function I(e,t){return(I=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var U=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),B(this,D(t).call(this,e))}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&I(e,t)}(t,React.Component),n=t,(o=[{key:"render",value:function(){return React.createElement("footer",{className:"footer-wrap"})}}])&&x(n.prototype,o),r&&x(n,r),t}();function F(e){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function J(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function V(e){return(V=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function z(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Z(e,t){return(Z=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var Y=function(e){function t(e){var n,o,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,n=!(r=V(t).call(this,e))||"object"!==F(r)&&"function"!=typeof r?z(o):r,console.log(e),n.handleLogin=n.handleLogin.bind(z(n)),n.handleChange=n.handleChange.bind(z(n)),n.state={user_name:n.props.user_name,user_id:n.props.user_id,user_magicword:n.props.user_magicword,failed:!1},n}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Z(e,t)}(t,React.Component),n=t,(o=[{key:"handleChange",value:function(e){this.props.onLoginChange({name:e.target.name,value:e.target.value})}},{key:"handleLogin",value:function(e){e.preventDefault(),this.props.onLogin()}},{key:"render",value:function(){return React.createElement("form",{className:"login-form",onSubmit:this.handleLogin},React.createElement("input",{type:"text",value:this.state.user_name,onChange:this.handleChange,name:"user_name",placeholder:"Username"}),React.createElement("input",{type:"password",value:this.state.user_magicword,name:"user_magicword",onChange:this.handleChange,placeholder:"Password"}),React.createElement("button",{type:"submit"},"Login"))}}])&&J(n.prototype,o),r&&J(n,r),t}();function W(e){return(W="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function q(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function G(e){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function H(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function K(e,t){return(K=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var Q=function(e){function t(e){var n,o,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,(n=!(r=G(t).call(this,e))||"object"!==W(r)&&"function"!=typeof r?H(o):r).handleActionAdd=n.handleActionAdd.bind(H(n)),n.handleActionLocator=n.handleActionLocator.bind(H(n)),n.handleActionMessages=n.handleActionMessages.bind(H(n)),n.handleActionLogout=n.handleActionLogout.bind(H(n)),n}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&K(e,t)}(t,React.Component),n=t,(o=[{key:"handleActionAdd",value:function(){this.props.menuAction("Add")}},{key:"handleActionLocator",value:function(){this.props.menuAction("Locator")}},{key:"handleActionMessages",value:function(){this.props.menuAction("Messages")}},{key:"handleActionLogout",value:function(){this.props.menuAction("Logout")}},{key:"render",value:function(){return React.createElement("div",{className:"home-menu-wrap"},React.createElement("div",{className:"home-menu-button action-add",onClick:this.handleActionAdd},"Add a Spot"),React.createElement("div",{className:"home-menu-button action-locator",onClick:this.handleActionLocator},"Spots"),React.createElement("div",{className:"home-menu-button action-messages",onClick:this.handleActionMessages},"Message Board"),React.createElement("div",{className:"home-menu-button action-logout",onClick:this.handleActionLogout},"Logout"))}}])&&q(n.prototype,o),r&&q(n,r),t}();function X(e){return(X="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ee(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function te(e,t){return!t||"object"!==X(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function ne(e){return(ne=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function oe(e,t){return(oe=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var re=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),te(this,ne(t).call(this,e))}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&oe(e,t)}(t,React.Component),n=t,(o=[{key:"render",value:function(){return React.createElement("div",{className:"message-board"},"Messages")}}])&&ee(n.prototype,o),r&&ee(n,r),t}();function ae(e){return(ae="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ie(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function ce(e){return(ce=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function ue(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function se(e,t){return(se=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var le=function(e){function t(e){var n,o,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,(n=!(r=ce(t).call(this,e))||"object"!==ae(r)&&"function"!=typeof r?ue(o):r).handleLoginChange=n.handleLoginChange.bind(ue(n)),n.handleLogin=n.handleLogin.bind(ue(n)),n.menuAction=n.menuAction.bind(ue(n)),n.toggleMenu=n.toggleMenu.bind(ue(n)),n.endpoint="https://www.roberttamayo.com/skate/login.php",n.views={Add:"Add",Locator:"Locator",Messages:"Messages",Logout:"Logout",Main:"Main"},n.state={user_data:n.props.user_data,user_name:n.props.user_name,user_id:n.props.user_id,crew_id:n.props.crew_id,user_role:n.props.user_role,signed_in:n.props.signed_in,user_magicword:"",activeView:"Main",menuOpen:!1},n}var n,o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&se(e,t)}(t,React.Component),n=t,(o=[{key:"toggleMenu",value:function(){this.setState({menuOpen:!this.state.menuOpen})}},{key:"handleLogin",value:function(){var e=this;$.ajax(this.endpoint,{method:"POST",data:{user_name:this.state.user_name,user_magicword:this.state.user_magicword}}).then(function(t){try{var n=JSON.parse(t);if(n.success)!function(e,t,n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var r="expires="+o.toUTCString();document.cookie=e+"="+t+";"+r+";path=/"}("user_data",JSON.stringify({user_name:n.user_name,user_id:n.user_id,user_role:n.user_role,crew_id:n.crew_id})),e.setState({user_name:n.user_name,user_id:n.user_id,crew_id:n.crew_id,user_role:n.user_role,signed_in:!0});else e.setState({signed_in:!1,failed:!0})}catch(e){}console.log(t)})}},{key:"handleLoginChange",value:function(e){var t,n,o;this.setState((t={},n=e.name,o=e.value,n in t?Object.defineProperty(t,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[n]=o,t))}},{key:"menuAction",value:function(e){this.setState({activeView:e})}},{key:"render",value:function(){return this.state.signed_in?React.createElement("div",{className:"app-wrap ".concat(this.state.activeView," menu-open-").concat(this.state.menuOpen)},React.createElement(u,{menuAction:this.menuAction,user_data:this.user_data,toggleMenu:this.toggleMenu,menuOpen:this.state.menuOpen}),React.createElement("div",{className:"app-body"},React.createElement("div",{className:"app-view app-view-main"},React.createElement(Q,{menuAction:this.menuAction})),React.createElement("div",{className:"app-view app-view-add"},React.createElement(d,{crew_id:this.state.crew_id})),React.createElement("div",{className:"app-view app-view-locator"},React.createElement(M,{crew_id:this.state.crew_id})),React.createElement("div",{className:"app-view app-view-messages"},React.createElement(re,null))),React.createElement(U,null)):React.createElement(Y,{onLogin:this.handleLogin,onLoginChange:this.handleLoginChange,user_name:this.user_name,user_magicword:this.user_magicword})}}])&&ie(n.prototype,o),r&&ie(n,r),t}(),fe=function(){var e=function(e){for(var t=e+"=",n=decodeURIComponent(document.cookie).split(";"),o=0;o<n.length;o++){for(var r=n[o];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return""}("user_data");if(""!=e)try{var t=JSON.parse(e);return t}catch(e){console.log("error with parsing cookie")}return!1}(),pe=""!=fe;ReactDOM.render(React.createElement(le,{user_name:fe.user_name,user_id:fe.user_id,crew_id:fe.crew_id,user_data:fe,user_role:fe.user_role,signed_in:pe}),document.getElementById("app"))}]);