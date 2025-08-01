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
    
    // Setup iframe with editable content
    const iframe = document.getElementById('iframe');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write('<html><head><style>body{margin:10px; font-family: sans-serif;}</style></head><body><div contenteditable="true">You can edit this iframe content.</div></body></html>');
    iframeDoc.close();
    
    iframeDoc.body.addEventListener('input', (e) => {
         console.log(`Input event on: iframe`, e.data);
         showLog(`Input on iframe`);
    });

    // Complex editor behaviors
    setupMediumStyleEditor();
    setupNotionStyleEditor();
    setupGoogleDocsStyleEditor();
    setupSlackStyleEditor();
    setupWordWrapEditor();
    setupDynamicEditor();
});

/**
 * Simulates Medium-style editor behavior where each line is wrapped in <p> tags
 */
function setupMediumStyleEditor() {
    const editor = document.getElementById('medium-editor');
    
    editor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            
            // Create new paragraph
            const newP = document.createElement('p');
            newP.innerHTML = '<br>';
            
            // Insert after current paragraph
            const currentP = range.commonAncestorContainer.closest('p') || range.commonAncestorContainer.parentElement.closest('p');
            if (currentP) {
                currentP.parentNode.insertBefore(newP, currentP.nextSibling);
            } else {
                editor.appendChild(newP);
            }
            
            // Move cursor to new paragraph
            range.setStart(newP, 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
}

/**
 * Simulates Notion-style editor with complex nested block structure
 */
function setupNotionStyleEditor() {
    const editor = document.getElementById('notion-editor');
    let blockCounter = 1;
    
    editor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            blockCounter++;
            
            const newBlock = document.createElement('div');
            newBlock.setAttribute('data-block-id', blockCounter.toString());
            
            const newP = document.createElement('p');
            const newSpan = document.createElement('span');
            newSpan.setAttribute('data-text', 'true');
            newSpan.innerHTML = '<br>';
            newP.appendChild(newSpan);
            newBlock.appendChild(newP);
            
            editor.appendChild(newBlock);
            
            // Move cursor to new block
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(newSpan, 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
}

/**
 * Simulates Google Docs style where everything is wrapped in spans with complex styling
 */
function setupGoogleDocsStyleEditor() {
    const editor = document.getElementById('gdocs-editor');
    
    editor.addEventListener('input', (e) => {
        // Wrap any plain text in styled spans
        const walker = document.createTreeWalker(
            editor,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.trim() && node.parentElement === editor) {
                textNodes.push(node);
            }
        }
        
        textNodes.forEach(textNode => {
            if (textNode.nodeValue.trim()) {
                const span = document.createElement('span');
                span.style.cssText = 'font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;';
                span.textContent = textNode.nodeValue;
                textNode.parentNode.replaceChild(span, textNode);
            }
        });
    });
}

/**
 * Simulates Slack-style editor with ProseMirror-like attributes
 */
function setupSlackStyleEditor() {
    const editor = document.getElementById('slack-editor');
    
    editor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            const newP = document.createElement('p');
            newP.setAttribute('data-stringify-type', 'paragraph');
            newP.setAttribute('data-pm-slice', '1 1 []');
            newP.innerHTML = '<br>';
            
            editor.appendChild(newP);
            
            // Move cursor to new paragraph
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(newP, 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
}

/**
 * Simulates editors that wrap each word in individual spans
 */
function setupWordWrapEditor() {
    const editor = document.getElementById('word-wrap-editor');
    
    editor.addEventListener('input', (e) => {
        setTimeout(() => {
            const p = editor.querySelector('p');
            if (p && p.textContent.trim()) {
                const words = p.textContent.split(/(\s+)/);
                p.innerHTML = '';
                
                words.forEach(word => {
                    if (word.trim()) {
                        const span = document.createElement('span');
                        span.textContent = word;
                        p.appendChild(span);
                    } else if (word) {
                        p.appendChild(document.createTextNode(word));
                    }
                });
            }
        }, 10);
    });
}

/**
 * Simulates dynamic editors that create new elements as you type
 */
function setupDynamicEditor() {
    const editor = document.getElementById('dynamic-editor');
    let lineCounter = 1;
    
    editor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            lineCounter++;
            
            const newP = document.createElement('p');
            newP.setAttribute('data-line', lineCounter.toString());
            newP.innerHTML = '<br>';
            
            editor.appendChild(newP);
            
            // Move cursor to new line
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(newP, 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
}
