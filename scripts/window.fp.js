const check_res = (props) => {
    let inconsistencies = 0
    props.forEach(prop => {
        if (document.getElementById(`sw-${prop}`).innerHTML === document.getElementById(`br-${prop}`).innerHTML) {
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
}

const broadcast = new BroadcastChannel('sw-channel');
broadcast.onmessage = (event) => {
    for (const [key, value] of Object.entries(event.data)) {
        document.getElementById(`sw-${key}`).innerHTML = value
    }
    check_res(Object.keys(event.data))
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

    tbody.appendChild(tr)
}

document.getElementById('results-table').appendChild(tbody)

for (const [key, value] of Object.entries(props)) {
    document.getElementById(`br-${key}`).innerHTML = value
}