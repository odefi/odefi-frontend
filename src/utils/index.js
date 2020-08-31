const Utils = {
    formatCurrency(amount, decimalCount = 8, decimal = ".", thousands = ",") {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 8 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseFloat(parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()).toString()
        let j = (i.length > 3) ? i.length % 3 : 0;

        let decimalPart = decimalCount ? Math.abs(amount - i).toFixed(decimalCount).slice(2) : ""
        decimalPart = '0.' + decimalPart

        if (parseFloat(decimalPart) === 0) {
            decimalPart = ''
        } else {
            decimalPart = parseFloat(decimalPart).toString().substring(1, decimalPart.length)
        }

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + decimalPart;
    },

    convertDate(timestamp) {
        var a = new Date(timestamp);
        var year = a.getFullYear();
        var month = a.getMonth() + 1;
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var realHour = hour > 12 ? hour - 12 : hour
        var time = date + '-' + month + '-' + year + ' | ' + realHour + ':' + min + (hour > 12 ? ' PM' : ' AM');
        return time;
    },

    properCase(string) {
        return string.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    },

    setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },

    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

export default Utils