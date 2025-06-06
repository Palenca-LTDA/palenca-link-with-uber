# Palenca Link React Native Example

A complete React Native application demonstrating how to integrate Palenca Link with proper deeplink handling for Uber login flow. This example includes both the mobile app and a redirect server to handle web-to-app transitions.

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Native  │    │  Redirect Server │    │   Your Backend  │
│      App        │◄───┤   (Node.js)      │◄───┤                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         ▲                        │
         │                        │
         └────── deeplink ─────────┘
        palencalink://app?params...
```

### Flow:
1. **User opens app** → Shows Palenca Link widget
2. **User clicks Uber login** → Opens browser for Uber login
3. **Uber login completes** → Backend redirects to redirect server
4. **Redirect server** → Creates landing page that redirects to deeplink
5. **App receives deeplink** → Displays parameters received by the deeplink

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Expo CLI: `npm install -g @expo/cli`
- EAS CLI: `npm install -g eas-cli`
- Android device or emulator (for testing deeplinks)

### 1. Setup the Redirect Server

```bash
# Navigate to the redirect server
cd ../redirect-server

# Install dependencies
npm install

# Start the server
npm start
```

The server will be available at `http://localhost:3001`

### 2. Setup the React Native App

```bash
# Install dependencies
npm install

# Install additional packages for deeplinks
npm install expo-linking expo-dev-client

# Login to Expo (if not already logged in)
npx expo login
```

### 3. Create Development Build

For proper deeplink support, you need a development build:

```bash
# Build for Android (recommended for testing)
eas build --profile development --platform android
```

Download and install the APK/IPA when the build completes.

### 4. Configure Tunnel for Testing

Since the redirect server needs to be accessible from your backend, use a tunnel:

```bash
# Install ngrok (or use any tunneling service)
npm install -g ngrok

# Create tunnel to your redirect server
ngrok http 3001
```

Copy the ngrok URL (e.g., `https://abc123.ngrok.io`) and update the configuration.

### 5. Update Configuration

Edit `src/screens/MainScreen.tsx` and update the `uberRedirectUrl`:

```javascript
let renderConfig = {
  "configuration": {
    "hideConsent": true,
    "country": "mx",
    "uberRedirectUrl": "https://your-ngrok-url.ngrok.io/redirect-to-app"
  },
  // ...
};
```

### 6. Start Development

```bash
# Start the Expo development server
npx expo start

# Scan QR code with your development build app
```

## 📱 App Features

### Main Screen Components

- **🔧 Test Deeplink Button**: Manually test deeplink parameter handling
- **Palenca Widget**: Embedded iframe for Uber login flows
- **Parameter Display**: Shows received deeplink parameters
- **🔄 Clear Button**: Returns to widget after viewing parameters

### Deeplink Handling

- **Scheme**: `palencalink://app`
- **Automatic parsing**: URL parameters are automatically extracted and displayed
- **Smart UI**: Widget hides when parameters are received
- **Console logging**: All events are logged for debugging

## 🛠️ Configuration Files

### `app.json`
```json
{
  "expo": {
    "scheme": "palencalink",
    "linking": {
      "prefixes": ["palencalink://"]
    },
    "ios": {
      "bundleIdentifier": "com.palenca.palencalinkmobile"
    },
    "android": {
      "package": "com.palenca.palencalinkmobile"
    }
  }
}
```

### `eas.json`
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}
```

## 🔗 Redirect Server

### Endpoints

- **`GET /`** - Server info and health check
- **`GET /health`** - Health check endpoint
- **`GET /redirect-to-app`** - Main redirect endpoint

### Example Usage

```bash
# Your backend should redirect to:
https://your-ngrok-url.ngrok.io/redirect-to-app?widget_id=123&account_id=456&user_id=789&status=success

# This will create a landing page that redirects to:
palencalink://app?widget_id=123&account_id=456&user_id=789&status=success
```

### Customization

Edit `server.js` to customize:
- Deeplink scheme (`palencalink://app`)
- Landing page styling
- Redirect timeout (currently 3 seconds)
- Debug information displayed

## 🧪 Testing

### 1. Test Manual Deeplink
1. Open the development build
2. Tap "🔧 Test Deeplink"
3. Verify parameters appear and widget hides

### 2. Test Redirect Server
```bash
# Test in browser
open "http://localhost:3001/redirect-to-app?test=123&status=success"

# Should show landing page and attempt deeplink redirect
```

### 3. Test Full Uber Login Flow
1. Use Palenca widget to start Uber login
2. Complete Uber login in browser
3. Verify redirect to your ngrok URL
4. Verify app opens with parameters

## 🐛 Troubleshooting

### Deeplinks Not Working
- ✅ Ensure you're using a **development build**, not Expo Go
- ✅ Verify custom URL scheme is properly registered
- ✅ Check device logs for deeplink events
- ✅ Test manual deeplink in device browser: `palencalink://app?test=123`

### Redirect Server Issues
- ✅ Confirm server is running on port 3001
- ✅ Test health endpoint: `curl http://localhost:3001/health`
- ✅ Verify ngrok tunnel is active and accessible
- ✅ Check server logs for incoming requests

### Widget Not Loading
- ✅ Verify Palenca SDK is properly embedded
- ✅ Check WebView console logs
- ✅ Ensure widget ID and API key are correct

### Build Issues
- ✅ Run `npx expo doctor` to check for issues
- ✅ Clear Expo cache: `npx expo r -c`
- ✅ Verify EAS CLI is logged in: `eas whoami`
- ✅ Check build logs in Expo dashboard


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 