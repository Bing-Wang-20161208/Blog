//浏览器限制
function getBrowser(){
    var browser = {
        msie: false, firefox: false, opera: false, safari: false, 
        chrome: false, netscape: false, appname: 'unknown', version: 0 
    };
    userAgent = window.navigator.userAgent.toLowerCase(); 
    if ( /(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test( userAgent ) ){ 
        browser[RegExp.$1] = true; 
        browser.appname = RegExp.$1; 
        browser.version = RegExp.$2; 
    } else if ( /version\D+(\d[\d.]*).*safari/.test( userAgent ) ){ // safari 
        browser.safari = true; 
        browser.appname = 'safari'; 
        browser.version = RegExp.$2; 
    } 
    return [browser.appname, browser.version];
}
if ((getBrowser()[0] === 'msie' && parseInt(getBrowser()[1]) <= 9)) {
    alert('脚本不支持IE10以下的IE浏览器，请使用IE10及以上IE浏览器或者其他浏览器！！！');
}