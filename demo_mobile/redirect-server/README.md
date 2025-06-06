# Palenca Redirect Server

A simple Node.js server that handles redirects from web URLs to mobile app deeplinks. This server is designed to bridge the gap between web-based Uber login flows and mobile app deeplinks.

## Overview

When users authenticate with third-party services (like Uber) through a web browser, they need to be redirected back to the mobile app. However, direct deeplink redirects from server responses don't always work reliably across different browsers and platforms. This server provides a web landing page that handles the deeplink redirect using JavaScript.

## Features

- ✅ Accepts any query parameters and forwards them to the deeplink
- ✅ Beautiful loading page with automatic redirect
- ✅ Manual fallback button if automatic redirect fails
- ✅ Debug information for troubleshooting
- ✅ CORS enabled for cross-origin requests
- ✅ Health check endpoint

## Installation

```bash
cd examples/redirect-server
npm install
```

## Usage

### Start the server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on port 3001 by default.

### Endpoints

#### `GET /`
Returns server information and available endpoints.

#### `GET /health`
Health check endpoint that returns server status.

#### `GET /redirect-to-app`
Main redirect endpoint that accepts query parameters and redirects to the mobile app.

**Example:**
```
http://localhost:3001/redirect-to-app?widget_id=123&account_id=456&user_id=789&status=success&status_details=connected
```

This will redirect to:
```
palencalink://app?widget_id=123&account_id=456&user_id=789&status=success&status_details=connected
```

## Integration with Palenca Link

1. **Update your React Native app configuration:**
   ```javascript
   let renderConfig = {
     "configuration": {
       "hideConsent": true,
       "country": "mx",
       "uberRedirectUrl": "https://your-tunnel-url.ngrok.io/redirect-to-app"
     },
     // ... other config
   };
   ```

2. **Update your backend to redirect to this server:**
   ```python
   # Instead of redirecting directly to deeplink:
   return f"palencalink://app?widget_id={widget_id}&..."
   
   # Redirect to this server:
   return f"https://your-tunnel-url.ngrok.io/redirect-to-app?widget_id={widget_id}&..."
   ```

## Testing with ngrok

1. **Start the server:**
   ```bash
   npm start
   ```

2. **In another terminal, start ngrok:**
   ```bash
   ngrok http 3001
   ```

3. **Use the ngrok URL in your configuration:**
   ```
   https://abc123.ngrok.io/redirect-to-app
   ```

4. **Test the redirect:**
   Navigate to the ngrok URL with test parameters:
   ```
   https://abc123.ngrok.io/redirect-to-app?widget_id=test&account_id=123&status=success
   ```

## How It Works

1. **User completes Uber login flow** → Backend redirects to your ngrok URL
2. **Browser loads the landing page** → Shows loading spinner and redirect message
3. **JavaScript attempts deeplink redirect** → `window.location.href = 'palencalink://app?...'`
4. **Mobile app receives deeplink** → App displays the query parameters
5. **Fallback mechanism** → If redirect fails, shows manual button after 3 seconds

## Environment Variables

- `PORT` - Server port (default: 3001)

## Customization

You can customize the redirect behavior by modifying:

- **Deeplink scheme:** Change `palencalink://app` to your app's custom scheme
- **Styling:** Update the CSS in the HTML template
- **Timeout:** Adjust the fallback timing (currently 3 seconds)
- **Debug info:** Add or remove debug information displayed

## Troubleshooting

### Deeplink not working?
1. Check that your mobile app is installed
2. Verify the custom URL scheme is correctly configured
3. Test the deeplink manually in the browser
4. Check the debug information on the landing page

### Server not accessible?
1. Ensure the server is running on the correct port
2. Check firewall settings
3. Verify ngrok is properly forwarding requests
4. Test the health endpoint: `GET /health`

## Production Deployment

For production use, consider:

- Setting up proper SSL certificates
- Using a reverse proxy (nginx, Apache)
- Implementing rate limiting
- Adding request logging
- Setting up monitoring and alerting
- Using environment-specific configurations 