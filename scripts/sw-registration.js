if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {scope: './'})
    .then((registration) => {
        document.getElementById('sw').innerHTML = 'registered'  
    }, (error) => {
        console.error(`Service worker registration failed: ${error}`);
    });
} else {
    document.getElementById('sw').innerHTML = 'unsupported'
}