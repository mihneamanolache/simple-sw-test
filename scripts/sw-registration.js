if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {scope: './'})
    .then((registration) => {
        document.getElementById('sw').innerHTML = 'registered'  
    }, (error) => {
        document.getElementById('sw').innerHTML = 'failed'  
        console.error(`Service worker registration failed: ${error}`);
    });
} else {
    document.getElementById('sw').innerHTML = 'unsupported'
}