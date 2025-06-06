# Palenca Link HTML Example

A simple HTML/JavaScript implementation demonstrating how to integrate Palenca Link widget for Uber login flows.

## 🚀 Quick Start

### 1. Configure Your Credentials

Edit `index.html` and replace the placeholder values:

```javascript
let widgetId = "YOUR_WIDGET_ID";        // Replace with your widget ID
let publicApiKey = "YOUR_PUBLIC_API_KEY"; // Replace with your public API key
```

### 2. Open in Browser

Simply open `index.html` in your browser - that's it!

## 📋 What's Included

- **`index.html`** - Main HTML file with Palenca widget integration
- **`style.css`** - Basic styling for the widget container

## 🔧 Configuration

The widget is configured with:

```javascript
let renderConfig = {
  "configuration": {
    "hideConsent": true,
    "country": "mx",
    "uberRedirectUrl": "https://palenca.com"
  },
  appearance: {
    primaryColor: "#ea4c89",
    borderRadius: "999px"
  }
}
```

## 📱 Events

The widget will log events to the browser console:
- `ready` - Widget loaded
- `connection_success` - login successful
- `connection_error` - login failed
- `open_link` - External link opened

Open browser developer tools to see the events in action! 