// Session helper 
function sessionHelper(encrypt) {
	encrypt = (typeof(encrypt) == 'boolean') ? encrypt : true; // encrypt by default

    const EXPITATION_IN_MINUTES = 30; // values are valid for 30 minutes by default

    window.SessionHelper = {
		
		_encrypt: true,

        // get from session (if the value expired it is destroyed)
        get: function (key) {
            let stringValue = window.sessionStorage.getItem(key);
            if (stringValue !== null) {
                let data = JSON.parse(stringValue);
                let expirationDate = new Date(data.expirationDate)
                if (expirationDate > new Date()) {					
					return (this._encrypt ? this.decodeB64Unicode(data.value) : data.value);					
                } else {
                    window.sessionStorage.removeItem(key);
                }
            }
            return null;
        },

        // add into session
        set: function (key, value, expirationInMin) {
            expirationInMin = expirationInMin || EXPITATION_IN_MINUTES;
            let expirationDate = new Date(new Date().getTime() + (60000 * expirationInMin));
            let data = {
                value: (this._encrypt ? this.encodeB64Unicode(value) : value),
                expirationDate: expirationDate.toISOString()
            }
            window.sessionStorage.setItem(key, JSON.stringify(data));
        },

        // remove a key
        remove: function (key) {
            let stringValue = window.sessionStorage.getItem(key);
            if (stringValue !== null) {
                window.sessionStorage.removeItem(key);
            }
        },

        // clear all data
        clear: function () {
            window.sessionStorage.clear();
        },

        encodeB64Unicode: function(str) {
            // first we use encodeURIComponent to get percent-encoded UTF-8,
            // then we convert the percent encodings into raw bytes which
            // can be fed into btoa.
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
            }));
        },

        decodeB64Unicode: function(str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }
    };
	
	window.SessionHelper._encrypt = encrypt;

    return window.SessionHelper;
}
