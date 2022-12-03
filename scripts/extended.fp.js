let more = {}

try { more["navigator.plugins.length"] = navigator.plugins.length } 
catch (e) { more["navigator.plugins.length"] = e.toString() }
try { more["navigator.mimeTypes.length"] = navigator.mimeTypes.length } 
catch (e) { more["navigator.mimeTypes.length"] = e.toString() }
try { more["navigator.webdriver"] = navigator.webdriver } 
catch (e) { more["navigator.webdriver"] = e.toString() }
try { more["navigator.cookieEnabled"] = navigator.cookieEnabled } 
catch (e) { more["navigator.cookieEnabled"] = e.toString() }
try { more["navigator.vendor"] = navigator.vendor } 
catch (e) { more["navigator.vendor"] = e.toString() }
try { more["navigator.javaEnabled"] = navigator.javaEnabled() } 
catch (e) { more["navigator.javaEnabled"] = e.toString() }
try { more["screen.width"] = screen.width } 
catch (e) { more["screen.width"] = e.toString() }
try { more["screen.height"] = screen.height } 
catch (e) { more["screen.height"] = e.toString() }
try { more["screen.availWidth"] = screen.availWidth } 
catch (e) { more["screen.availWidth"] = e.toString() }
try { more["screen.availHeight"] = screen.availHeight } 
catch (e) { more["screen.availHeight"] = e.toString() }
try { more["devicePixelRatio"] = window.devicePixelRatio } 
catch (e) { more["devicePixelRatio"] = e.toString() }
try { more["document.documentElement.clientWidth"] = document.documentElement.clientWidth } 
catch (e) { more["document.documentElement.clientWidth"] = e.toString() }
try { more["document.documentElement.clientHeight"] = document.documentElement.clientHeight } 
catch (e) { more["document.documentElement.clientHeight"] = e.toString() }
try { more["screen.colorDepth"] = screen.colorDepth } 
catch (e) { more["screen.colorDepth"] = e.toString() }
try { more["window.chrome"] = "app" in window.chrome } 
catch (e) { more["window.chrome"] = e.toString() }
try { more["window.barcodeDetector"] = "BarcodeDetector" in window } 
catch (e) { more["window.barcodeDetector"] = e.toString() }

const exteded_props = {
    'navigator.plugins.length':more['navigator.plugins.length'],
    'navigator.mimeTypes.length':more['navigator.mimeTypes.length'],
    'navigator.webdriver':more['navigator.webdriver'],
    'navigator.cookieEnabled':more['navigator.cookieEnabled'],
    'navigator.vendor':more['navigator.vendor'],
    'navigator.javaEnabled':more['navigator.javaEnabled'],
    'screen.width':more['screen.width'],
    'screen.height':more['screen.height'],
    'screen.availWidth':more['screen.availWidth'],
    'screen.availHeight':more['screen.availHeight'],
    'devicePixelRatio':more['devicePixelRatio'],
    'document.documentElement.clientWidth':more['document.documentElement.clientWidth'],
    'document.documentElement.clientHeight':more['document.documentElement.clientHeight'],
    'screen.colorDepth':more['screen.colorDepth'],
    'window.chrome':more['window.chrome'],
    'window.barcodeDetector':more['window.barcodeDetector'],
}

for (const [key, value] of Object.entries(exteded_props)) {
    let ext = document.createElement('li')
    ext.classList.add('list-group-item')
    ext.classList.add('font-weight-bold')
    if (key === 'navigator.webdriver' && value === true) {
        ext.classList.add('list-group-item-danger')
        let alert_webdriver = document.createElement('h2')
        alert_webdriver.classList.add('text-danger')
        alert_webdriver.innerHTML = '🚨 WEBDRIVER DETECTED 🚨'
        document.getElementById('head').appendChild(alert_webdriver)
    }
    ext.innerHTML = `${key}: ${value}`
    document.getElementById('extended-results').appendChild(ext)
}