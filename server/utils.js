'use strict';

function getBrowserInfo(userAgent) {
    if (!userAgent) {
        return {name: '', version: '', versionNumber: 0};
    }
    userAgent = userAgent.toLowerCase();

    var match = /(edge)\/([\w.]+)/.exec(userAgent) ||
        /(opr)[\/]([\w.]+)/.exec(userAgent) ||
        /(chrome)[ \/]([\w.]+)/.exec(userAgent) ||
        /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(userAgent) ||
        /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(userAgent) ||
        /(webkit)[ \/]([\w.]+)/.exec(userAgent) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(userAgent) ||
        /(msie) ([\w.]+)/.exec(userAgent) ||
        userAgent.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(userAgent) ||
        userAgent.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(userAgent) ||
        [];

    var platformMatch = /(ipad)/.exec(userAgent) ||
        /(ipod)/.exec(userAgent) ||
        /(iphone)/.exec(userAgent) ||
        /(kindle)/.exec(userAgent) ||
        /(silk)/.exec(userAgent) ||
        /(android)/.exec(userAgent) ||
        /(windows phone)/.exec(userAgent) ||
        /(win)/.exec(userAgent) ||
        /(mac)/.exec(userAgent) ||
        /(linux)/.exec(userAgent) ||
        /(cros)/.exec(userAgent) ||
        /(playbook)/.exec(userAgent) ||
        /(bb)/.exec(userAgent) ||
        /(blackberry)/.exec(userAgent) ||
        [];

    var browser = {},
        matched = {
            browser: match[5] || match[3] || match[1] || '',
            version: match[2] || match[4] || '0',
            versionNumber: match[4] || match[2] || 0,
            platform: platformMatch[0] || ''
        };

    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
        browser.versionNumber = parseInt(matched.versionNumber, 10);
    }

    if (matched.platform) {
        browser[matched.platform] = true;
    }

    // These are all considered mobile platforms, meaning they run a mobile browser
    if (browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone ||
        browser.ipod || browser.kindle || browser.playbook || browser.silk || browser['windows phone']
    ) {
        browser.mobile = true;
    }

    // These are all considered desktop platforms, meaning they run a desktop browser
    if (browser.cros || browser.mac || browser.linux || browser.win) {
        browser.desktop = true;
    }

    // Chrome, Opera 15+ and Safari are webkit based browsers
    if (browser.chrome || browser.opr || browser.safari) {
        browser.webkit = true;
    }

    // IE11 has a new token so we will assign it msie to avoid breaking changes
    // IE12 disguises itself as Chrome, but adds a new Edge token.
    if (browser.rv) {
        var ie = 'msie';

        matched.browser = ie;
        browser[ie] = true;
    }

    // Detect IE11 in Compatibility Mode
    if (browser.msie && /msie 7.*trident.?7\./i.test(userAgent)) {
        browser.inCompatibility = true;
    }

    // Blackberry browsers are marked as Safari on BlackBerry
    if (browser.safari && browser.blackberry) {
        var blackberry = 'blackberry';

        matched.browser = blackberry;
        browser[blackberry] = true;
    }

    // Playbook browsers are marked as Safari on Playbook
    if (browser.safari && browser.playbook) {
        var playbook = 'playbook';

        matched.browser = playbook;
        browser[playbook] = true;
    }

    // BB10 is a newer OS version of BlackBerry
    if (browser.bb) {
        var bb = 'blackberry';

        matched.browser = bb;
        browser[bb] = true;
    }

    // Opera 15+ are identified as opr
    if (browser.opr) {
        var opera = 'opera';

        matched.browser = opera;
        browser[opera] = true;
    }

    // Stock Android browsers are marked as Safari on Android.
    if (browser.safari && browser.android) {
        var android = 'android';

        matched.browser = android;
        browser[android] = true;
    }

    // Kindle browsers are marked as Safari on Kindle
    if (browser.safari && browser.kindle) {
        var kindle = 'kindle';

        matched.browser = kindle;
        browser[kindle] = true;
    }

    // Kindle Silk browsers are marked as Safari on Kindle
    if (browser.safari && browser.silk) {
        var silk = 'silk';

        matched.browser = silk;
        browser[silk] = true;
    }

    // Assign the name and platform variable
    browser.name = matched.browser;
    browser.platform = matched.platform;
    return browser;
}
exports.getBrowserInfo = getBrowserInfo;