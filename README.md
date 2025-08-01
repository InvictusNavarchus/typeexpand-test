# TypeExpand Test Page

A comprehensive testing ground for writable HTML elements designed to help developers test snippet expansion functionality across different input types and scenarios.

## Purpose

This test page was created to validate the **TypeExpand** browser extension - a snippet expansion tool that allows users to create custom snippets and use them on any website. When a user types a snippet trigger (like `/time`), it expands to the configured content (like the current time).

The main challenge in developing TypeExpand is ensuring it works reliably across all types of writable HTML elements found on various websites. This test page provides a controlled environment to verify compatibility and functionality.

## What's Included

### Input Types Tested
- **Standard Inputs**: text, password, email, search
- **Specialized Inputs**: number, telephone, URL
- **Date/Time Inputs**: date, datetime-local, month, week, time
- **Text Areas**: multi-line text input
- **Content Editable Elements**: 
  - Simple div elements
  - Rich text simulation with paragraphs and lists
- **Iframe Content**: editable content within iframes

### Features
- Real-time input event logging in the browser console
- Visual feedback system showing which element received input
- Responsive grid layout for easy testing across different screen sizes
- Hover effects and smooth transitions for better UX

## How to Use

1. **Open the test page**: Simply open `index.html` in your web browser
2. **Test snippet expansion**: Try typing snippet triggers (like `/time`) in any of the input fields
3. **Monitor events**: Open browser developer tools to see console logs of input events
4. **Visual feedback**: Watch the bottom-right corner for input event notifications

## File Structure

```
├── index.html          # Main test page with all input types
├── script.js           # JavaScript for event handling and logging
├── style.css           # Styling and layout
└── README.md           # This documentation
```

## Testing Scenarios

When testing your TypeExpand extension with this page, consider:

1. **Basic functionality**: Does snippet expansion work in standard text inputs?
2. **Specialized inputs**: How does the extension handle email, URL, and number inputs?
3. **Rich text environments**: Does expansion work in contenteditable divs with existing formatting?
4. **Cross-frame compatibility**: Can snippets expand within iframe content?
5. **Event handling**: Are input events properly captured and processed?
6. **Cursor positioning**: Does the cursor remain in the correct position after expansion?

## Development Notes

- The page uses modern CSS Grid for responsive layout
- JavaScript uses event delegation for efficient event handling
- All input events are logged with element identification for debugging
- The iframe is dynamically populated with editable content for cross-frame testing

## Browser Compatibility

This test page works in all modern browsers that support:
- CSS Grid Layout
- ES6+ JavaScript features
- HTML5 input types
- ContentEditable API

## Contributing

If you discover edge cases or additional input types that should be tested, feel free to extend this test page by adding new input elements to the grid layout.