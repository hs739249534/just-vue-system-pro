/* eslint-disable */
import debug from './debug'

const mobile = {}

/**
 * 运行环境检测
 */
mobile.runningEnvironment = function () {
    let ua = navigator.userAgent
    let platform = navigator.platform
    let webkit = ua.match(/Web[kK]it[\/]{01}([\d.]+)/)
    let android = ua.match(/(Android);?[\s\/]+([\d.]+)?/)
    let osx = !!ua.match(/\(Macintosh\; Intel /)
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
    let ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/)
    let iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
    let webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)
    let win = /Win\d{2}|Windows/.test(platform)
    let wp = ua.match(/Windows Phone ([\d.]+)/)
    let touchpad = webos && ua.match(/TouchPad/)
    let kindle = ua.match(/Kindle\/([\d.]+)/)
    let silk = ua.match(/Silk\/([\d._]+)/)
    let blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/)
    let bb10 = ua.match(/(BB10).*Version\/([\d.]+)/)
    let rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/)
    let playbook = ua.match(/PlayBook/)
    let chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)
    let firefox = ua.match(/Firefox\/([\d.]+)/)
    let firefoxos = ua.match(/\((?=Mobile|Tablet); rv=([\d.]+)\).*Firefox\/[\d.]+/)
    let ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv=([0-9.].)/)
    let webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)
    let safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)
    return {
        webkit,
        android,
        osx,
        ipad,
        ipod,
        iphone,
        webos,
        win,
        wp,
        touchpad,
        kindle,
        silk,
        blackberry,
        bb10,
        rimtabletos,
        playbook,
        chrome,
        firefox,
        firefoxos,
        ie,
        webview,
        safari
    }
}

/**
 * 初始化 iOS JSBridge
 * https://github.com/marcuswestin/WebViewJavascriptBridge
 * https://www.jianshu.com/p/d12ec047ce52
 */
mobile.initIOS = function () {
    let WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
    }, 0)
}

mobile.jsCallIOS = function (iOSMethod, jsParams, jsCallback) {
    debug.log(`调用 ios:${iOSMethod}，参数为:${JSON.stringify(jsParams)}`)
    if (!window.WebViewJavascriptBridge) {
        this.initIOS()
    }
    // 在 chrome 开发者模式时，运行环境会被判定为移动端，但是内部并未有 WebViewJavascriptBridge 对象及其 callHandler 方法
    // 故增加此判断，以免执行该方法抛出 TypeError: Cannot read property 'callHandler' of undefined
    if (window.WebViewJavascriptBridge) {
        window.WebViewJavascriptBridge.callHandler(iOSMethod, jsParams, iosData => {
            jsCallback(iosData)
        })
    }
}

mobile.iOSCallJs = function (callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
}

mobile.initAndroid = function () {
}

mobile.jsCallAndroid = function (androidMethod, jsParams, jsCallback) {
    // https://github.com/lzyzsd/JsBridge
    debug.log(`调用 android:${androidMethod}，参数为:${JSON.stringify(jsParams)}`)
    if (window.WebViewJavascriptBridge) {
        window.WebViewJavascriptBridge.callHandler(androidMethod, jsParams, androidData => {
            jsCallback(androidData)
        })
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', () => {
            window.WebViewJavascriptBridge.callHandler(androidMethod, jsParams, androidData => {
                jsCallback(androidData)
            })
        }, false)
    }
}

mobile.androidCallJs = function () {

}

mobile.jsCall = function (method, params) {
    let platform = this.runningEnvironment()
    return new Promise((resolve, reject) => {
        if (platform.iphone) {
            this.jsCallIOS(method, params, (ret) => {
                debug.log(`调用 iphone:${method} 成功，结果为:${JSON.stringify(ret)}`)
                resolve(ret)
            })
        } else if (platform.android) {
            this.jsCallAndroid(method, params, (ret) => {
                debug.log(`调用 android:${method} 成功，结果为:${JSON.stringify(ret)}`)
                resolve(JSON.parse(ret))
            })
        } else {
            debug.error(`调用 mobile:${method} 失败`)
        }
    })
}

export default mobile
