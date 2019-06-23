
export const CookieNames = {
    server: 'user_data',
    client: 'skate_data',
}

export function validateCookies(){
    let cookiesDoMatch = true;

    let clientCookie = getCookie(CookieNames.client);
    let serverCookie = getCookie(CookieNames.server);
    try {
        let clientData = JSON.parse(clientCookie)[0];
        let serverData = JSON.parse(serverCookie)[0];
        let clientKeys = Object.keys(clientData);
        let serverKeys = Object.keys(serverData);
        
        for (let i = 0; i < clientKeys.length; i++) {
            let key = clientKeys[i];
            if (serverData[key] && serverData[key] == clientData[key]) {} else {
                cookiesDoMatch = false;
                break;
            }
        }

        if (cookiesDoMatch) {
            for (let i = 0; i < serverKeys.length; i++) {
                let key = serverKeys[i];
                if (clientData[key] && clientData[key] == serverData[key]) {} else {
                    cookiesDoMatch = false;
                    break;
                }
            }
        }
    } catch (e) {
        cookiesDoMatch = false;
        console.error("error with parsing cookies");
    }
    return cookiesDoMatch;
}
export function getUserInfo() {
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

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
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
export function deleteCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}