const path = new URL(location)
const broadcastPath = new BroadcastChannel('sw-path')
broadcastPath.postMessage(path.href)

let res = {}

try { res["navigator.userAgent"] = navigator.userAgent } 
catch (e) { res["navigator.userAgent"] = e.toString() }
try { res["navigator.language"] = navigator.language } 
catch (e) { res["navigator.language"] = e.toString() }
try { res["navigator.languages"] = navigator.languages } 
catch (e) { res["navigator.languages"] = e.toString() }
try { res["navigator.webdriver"] = navigator.webdriver } 
catch (e) { res["navigator.webdriver"] = e.toString() }
try { res["navigator.platform"] = navigator.platform } 
catch (e) { res["navigator.platform"] = e.toString() }
try { res["navigator.appName"] = navigator.appName } 
catch (e) { res["navigator.appName"] = e.toString() }
try { res["navigator.appCodeName"] = navigator.appCodeName } 
catch (e) { res["navigator.appCodeName"] = e.toString() }
try { res["navigator.deviceMemory"] = navigator.deviceMemory } 
catch (e) { res["navigator.deviceMemory"] = e.toString() }
try { res["navigator.hardwareConcurrency"] = navigator.hardwareConcurrency } 
catch (e) { res["navigator.hardwareConcurrency"] = e.toString() } 
try { const date = new Date(); res["date.getTimezoneOffset"] = date.getTimezoneOffset() } 
catch (e) { res["date.getTimezoneOffset"] = e.toString() } 

Object.defineProperty(navigator, "platform", {
    get: () => {return 'FakeBorwser'}
});

try { res["fake.navigator.platfrom"] = navigator.platform } 
catch (e) { res["fake.navigator.platfrom"] = e.toString() } 

const props = {
    'navigator.userAgent':res['navigator.userAgent'],
    'navigator.language':res['navigator.language'],
    'navigator.languages':res['navigator.languages'],
    'navigator.platform':res['navigator.platform'],
    'navigator.appName':res['navigator.appName'],
    'navigator.appCodeName':res['navigator.appCodeName'],
    'navigator.deviceMemory':res['navigator.deviceMemory'],
    'navigator.hardwareConcurrency': res['navigator.hardwareConcurrency'],
    'date.getTimezoneOffset': res["date.getTimezoneOffset"],
    'fake.navigator.platfrom': res["fake.navigator.platfrom"],
}

self.postMessage(props)