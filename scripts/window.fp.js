const w_body_hash = 'acca31f4'
const sw_body_hash = '0d74bd9e'

/** Thank you https://github.com/abrahamjuliot/creepjs/ */
const hashMini =  x => {
    if (!x) return x
    const json = `${JSON.stringify(x)}`
    const hash = json.split('').reduce((hash, char, i) => {
        return Math.imul(31, hash) + json.charCodeAt(i) | 0
    }, 0x811c9dc5)
    return ('0000000' + (hash >>> 0).toString(16)).substr(-8)
}
/** Give abrahamjuliot's project a star! */

const check_res = (props) => {
    let inconsistencies = 0
    props.forEach(prop => {
        if (!document.getElementById(`w-${prop}`).innerHTML || !document.getElementById(`sw-${prop}`).innerHTML) return
        if (document.getElementById(`sw-${prop}`).innerHTML === document.getElementById(`br-${prop}`).innerHTML && document.getElementById(`br-${prop}`).innerHTML === document.getElementById(`w-${prop}`).innerHTML) {
            document.getElementById(`sw-${prop}`).parentElement.classList.add('table-success')
        } else {
            inconsistencies += 1
            document.getElementById(`sw-${prop}`).parentElement.classList.add('table-danger')
        }
        if (prop === 'navigator.webdriver' && document.getElementById(`sw-${prop}`).innerHTML === 'true' || document.getElementById(`br-${prop}`).innerHTML == true) {
            document.getElementById(`sw-${prop}`).parentElement.classList.add('table-danger')
        }
    });

    if (inconsistencies !== 0) { 
        document.getElementById('consisency').innerHTML = 'False'
    }
    else {
        document.getElementById('consisency').innerHTML = 'True'
    }

    const doneTesting = document.createElement('div')
    doneTesting.setAttribute('id','doneTesting')
    document.getElementById('results-table').appendChild(doneTesting)
}

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
    'fake.navigator.platfrom': res["fake.navigator.platfrom"]
}

const broadcast = new BroadcastChannel('sw-channel');
broadcast.onmessage = (event) => {
    fetch(event.data.url).then((res) => {
        return res.text()
    }).then((data)=>{
        document.getElementById('sw-body').innerHTML = data
        if ( hashMini(data) !== sw_body_hash ) {
            document.getElementById('sw-body-title').innerHTML = 'Altered Service Worker Body:'
            document.getElementById('consisency').innerHTML = 'False'
            document.getElementById('sw-body').classList.add('bg-danger')
            document.getElementById('sw-body').classList.add('text-white')
        }
    })
    for (const [key, value] of Object.entries(event.data.props)) {
        document.getElementById(`sw-${key}`).innerHTML = value
    }
    check_res(Object.keys(event.data.props))
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister()
        } 
    })
};

const tbody = document.createElement('tbody')
tbody.setAttribute('id', 'fp-results')

for (const [key, value] of Object.entries(props)) {
    let tr = document.createElement('tr')

    let th = document.createElement('th')
    th.setAttribute('scope', 'row')
    th.innerHTML = key
    tr.appendChild(th)

    let td_br = document.createElement('th')
    td_br.setAttribute('id', `br-${key}`)
    td_br.setAttribute('style', "word-break:break-all;" )
    tr.appendChild(td_br)

    let td_sw = document.createElement('th')
    td_sw.setAttribute('id', `sw-${key}`)
    td_sw.setAttribute('style', "word-break:break-all;" )
    tr.appendChild(td_sw)

    let td_w = document.createElement('th')
    td_w.setAttribute('id', `w-${key}`)
    td_w.setAttribute('style', "word-break:break-all;" )
    tr.appendChild(td_w)

    tbody.appendChild(tr)
}

document.getElementById('results-table').appendChild(tbody)

for (const [key, value] of Object.entries(props)) {
    document.getElementById(`br-${key}`).innerHTML = value
}

if (window.Worker) {
    const webWorker = new Worker('w.js');
    webWorker.onmessage = (event) => {
        console.log(event.data.url)
        for (const [key, value] of Object.entries(event.data.props)) {
            document.getElementById(`w-${key}`).innerHTML = value
        }
        fetch(event.data.url).then((res) => {
            return res.text()
        }).then((data)=>{
            document.getElementById('w-body').innerHTML = data
            if ( hashMini(data) !== w_body_hash ) {
                document.getElementById('w-body-title').innerHTML = 'Altered Web Worker Body:'
                document.getElementById('consisency').innerHTML = 'False'
                document.getElementById('w-body').classList.add('bg-danger')
                document.getElementById('w-body').classList.add('text-white')
            }
        })
        check_res(Object.keys(event.data.props))
    }
}