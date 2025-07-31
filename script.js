document.addEventListener('DOMContentLoaded', () => {
    const writableElements = document.querySelectorAll('input, textarea, [contenteditable]');
    const log = document.getElementById('log');
    let timeout;

    const showLog = (message) => {
        log.textContent = message;
        log.style.opacity = 1;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            log.style.opacity = 0;
        }, 2000);
    };
    
    writableElements.forEach(el => {
        el.addEventListener('input', (e) => {
            const name = e.target.id || e.target.tagName.toLowerCase();
            console.log(`Input event on: ${name}`, e.data);
            showLog(`Input on ${name}`);
        });
    });
    
    const iframe = document.getElementById('iframe');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write('<html><head><style>body{margin:10px; font-family: sans-serif;}</style></head><body><div contenteditable="true">You can edit this iframe content.</div></body></html>');
    iframeDoc.close();
    
    iframeDoc.body.addEventListener('input', (e) => {
         console.log(`Input event on: iframe`, e.data);
         showLog(`Input on iframe`);
    });
});
