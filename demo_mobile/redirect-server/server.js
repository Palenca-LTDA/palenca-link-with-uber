const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Palenca Redirect Server is running',
    endpoints: [
      'GET /redirect-to-app - Redirect to deeplink with query parameters',
      'GET /health - Health check'
    ]
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Main redirect endpoint
app.get('/redirect-to-app', (req, res) => {
  // Get all query parameters
  const queryParams = req.query;
  
  // Convert query params to URL search params string
  const urlParams = new URLSearchParams(queryParams).toString();
  
  // Build the deeplink URL
  const deeplinkUrl = `palencalink://app${urlParams ? '?' + urlParams : ''}`;
  
  // Log the redirect for debugging
  console.log('Redirecting with parameters:', queryParams);
  console.log('Deeplink URL:', deeplinkUrl);
  
  // Create HTML page that redirects to deeplink
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting to Palenca Link App...</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #ea4c89 0%, #f06292 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 16px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            margin: 20px;
        }
        .logo {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .manual-link {
            display: inline-block;
            background: white;
            color: #ea4c89;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            transition: transform 0.2s;
        }
        .manual-link:hover {
            transform: translateY(-2px);
        }
        .debug-info {
            margin-top: 30px;
            text-align: left;
            background: rgba(0, 0, 0, 0.2);
            padding: 15px;
            border-radius: 8px;
            font-size: 12px;
            font-family: 'Monaco', 'Courier New', monospace;
        }
        .success-message {
            display: none;
            background: rgba(76, 175, 80, 0.2);
            border: 1px solid rgba(76, 175, 80, 0.5);
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🔗 Palenca Link</div>
        <h2 id="status">Redirecting to App...</h2>
        <div class="spinner" id="spinner"></div>
        <p id="message">Please wait while we redirect you to the Palenca Link app.</p>
        
        <div id="manualRedirect" style="display: none;">
            <p>If you weren't redirected automatically:</p>
            <a href="${deeplinkUrl}" class="manual-link" id="manualLink">Open Palenca Link App</a>
        </div>
        
        <div class="success-message" id="successMessage">
            <strong>✅ Success!</strong> The app should open shortly.
        </div>
        
        <details class="debug-info">
            <summary style="cursor: pointer; margin-bottom: 10px;">🔍 Debug Information</summary>
            <div><strong>Deeplink URL:</strong></div>
            <div style="word-break: break-all; margin-bottom: 10px;">${deeplinkUrl}</div>
            <div><strong>Parameters received:</strong></div>
            <pre>${JSON.stringify(queryParams, null, 2)}</pre>
        </details>
    </div>

    <script>
        const deeplinkUrl = '${deeplinkUrl}';
        
        // Try to redirect immediately
        console.log('Attempting to redirect to:', deeplinkUrl);
        
        // Set the manual link
        document.getElementById('manualLink').href = deeplinkUrl;
        
        // Attempt redirect
        try {
            window.location.href = deeplinkUrl;
            
            // Show success message briefly
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'block';
            }, 500);
            
        } catch (error) {
            console.error('Redirect failed:', error);
            showManualRedirect();
        }
        
        // Show manual redirect option after 3 seconds
        setTimeout(() => {
            showManualRedirect();
        }, 3000);
        
        function showManualRedirect() {
            document.getElementById('spinner').style.display = 'none';
            document.getElementById('status').textContent = 'Open the App';
            document.getElementById('message').textContent = 'Click the button below to open the Palenca Link app:';
            document.getElementById('manualRedirect').style.display = 'block';
        }
        
        // Listen for visibility changes to detect if user came back
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                console.log('User returned to browser - deeplink might have failed');
                showManualRedirect();
            }
        });
        
        // Alternative method: try using window.open as fallback
        setTimeout(() => {
            try {
                window.open(deeplinkUrl, '_self');
            } catch (e) {
                console.log('window.open failed:', e);
            }
        }, 1000);
    </script>
</body>
</html>
  `;
  
  res.send(html);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Palenca Redirect Server is running on port ${PORT}`);
  console.log(`📱 Redirect endpoint: http://localhost:${PORT}/redirect-to-app`);
  console.log(`🔍 Example: http://localhost:${PORT}/redirect-to-app?widget_id=123&account_id=456&user_id=789&status=success&status_details=connected`);
});

module.exports = app; 