import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { palencaSdkContent } from '../palencaSdk.js';

const MainScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

  // Parse deep link parameters when app is opened via deep link
  useEffect(() => {
    const parseDeepLink = (url: string) => {
      try {
        console.log('🔗 Parsing deeplink URL:', url);
        const urlObj = new URL(url);
        const params: Record<string, string> = {};
        urlObj.searchParams.forEach((value, key) => {
          params[key] = value;
        });
        setQueryParams(params);
        console.log('🔗 Deep link parameters parsed:', params);
      } catch (error) {
        console.log('❌ Error parsing deep link:', error);
      }
    };

    // Function to handle URL events
    const handleUrl = ({ url }: { url: string }) => {
      console.log('🔗 URL event received:', url);
      parseDeepLink(url);
    };

    // Check if app was opened with initial URL
    const checkInitialUrl = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        console.log('🔗 Initial URL check:', initialUrl);
        if (initialUrl) {
          parseDeepLink(initialUrl);
        }
      } catch (error) {
        console.log('❌ Error getting initial URL:', error);
      }
    };

    checkInitialUrl();

    // Listen for incoming URLs while app is running
    const subscription = Linking.addEventListener('url', handleUrl);
    
    console.log('🔗 Deeplink listener setup complete');

    return () => {
      subscription?.remove();
      console.log('🔗 Deeplink listener removed');
    };
  }, []);

  // Inject JavaScript to initialize Palenca Link
  const injectedJavaScript = `
    // Debug function to monitor iframe creation
    function debugIframes() {
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Element node
              if (node.tagName === 'IFRAME') {
                console.log('New iframe created:', node.src);
                window.ReactNativeWebView.postMessage(JSON.stringify({ 
                  signal: "debug",
                  message: "iframe_created",
                  data: { src: node.src, id: node.id, className: node.className }
                }));
              }
              // Also check for iframes within added nodes
              const iframes = node.querySelectorAll ? node.querySelectorAll('iframe') : [];
              iframes.forEach(function(iframe) {
                console.log('Iframe found in added node:', iframe.src);
                window.ReactNativeWebView.postMessage(JSON.stringify({ 
                  signal: "debug",
                  message: "iframe_found",
                  data: { src: iframe.src, id: iframe.id, className: iframe.className }
                }));
              });
            }
          });
        });
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    // Start monitoring before Palenca loads
    debugIframes();

    let widgetId = "bf36e158-fbc6-4eb1-bc4e-09dc1fe846b2";
    let publicApiKey = "public_1fac_4b75_bcab_09ad7945b182";
    let renderConfig = {
      "configuration": {
        "hideConsent": true,
        "country": "mx",
        "uberRedirectUrl": "https://localpalenca.tunn.dev/redirect-to-app"
      },
      appearance: {
        primaryColor: "#ea4c89",
        borderRadius: "999px"
      }
    };

    window.ReactNativeWebView.postMessage(JSON.stringify({ 
      signal: "debug",
      message: "palenca_config",
      data: { widgetId, publicApiKey, renderConfig }
    }));

    window.palenca.loadLink(publicApiKey, widgetId).then(link => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ 
        signal: "debug",
        message: "palenca_loaded",
        data: "Palenca link loaded successfully"
      }));

      link.on("ready", () => {
        console.log("Widget is ready");
        
        // Check for iframes after widget is ready
        setTimeout(() => {
          const container = document.getElementById('container');
          if (container) {
            const iframes = container.querySelectorAll('iframe');
            console.log('Iframes in container:', iframes.length);
            iframes.forEach((iframe, index) => {
              console.log('Iframe', index, ':', iframe.src);
              window.ReactNativeWebView.postMessage(JSON.stringify({ 
                signal: "debug",
                message: "container_iframe",
                data: { index, src: iframe.src, id: iframe.id }
              }));
            });
          }
        }, 1000);

        window.ReactNativeWebView.postMessage(JSON.stringify({ 
          signal: "ready" 
        }));
      });

      link.on("user_created", (event) => {
        console.log("User created", event);
        window.ReactNativeWebView.postMessage(JSON.stringify({ 
          signal: "user_created",
          response: {
            success: true,
            data: event.data
          }
        }));
      });

      link.on("connection_success", (event) => {
        console.log("Connection success", event);
        window.ReactNativeWebView.postMessage(JSON.stringify({ 
          signal: "connection_success",
          response: {
            success: true,
            data: event.data
          }
        }));
      });

      link.on("connection_error", (event) => {
        console.log("Connection error", event);
        window.ReactNativeWebView.postMessage(JSON.stringify({ 
          signal: "connection_error",
          response: {
            success: false,
            mistake: event.data.error
          }
        }));
      });

      link.on("open_link", (event) => {
        console.log("Open link", event.data);
        window.ReactNativeWebView.postMessage(JSON.stringify({ 
          signal: "open_link",
          response: {
            success: true,
            data: event.data
          }
        }));
      });

      // Before rendering, log the config
      console.log("About to render with config:", JSON.stringify(renderConfig, null, 2));
      window.ReactNativeWebView.postMessage(JSON.stringify({ 
        signal: "debug",
        message: "about_to_render",
        data: renderConfig
      }));

      link.render("container", renderConfig);

      // Debug the container after rendering
      setTimeout(() => {
        const container = document.getElementById('container');
        if (container) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ 
            signal: "debug",
            message: "container_content",
            data: { 
              innerHTML: container.innerHTML.substring(0, 500) + '...',
              childElementCount: container.childElementCount
            }
          }));
        }
      }, 2000);

    }, error => {
      console.log("Palenca error:", error);
      window.ReactNativeWebView.postMessage(JSON.stringify({ 
        signal: "error",
        response: {
          success: false,
          mistake: { message: error.toString() }
        }
      }));
    });

    true;
  `;

  // Handle messages from Palenca widget
  const handleEvent = (event: any) => {
    try {
      const eventData = JSON.parse(event.nativeEvent.data);
      console.log('Palenca event received:', eventData);

      switch (eventData.signal) {
        case 'ready':
          console.log('Widget is ready');
          break;
        
        case 'user_created':
          console.log('User created:', eventData.response.data);
          break;
        
        case 'connection_success':
          console.log('Connection success:', eventData.response.data);
          break;
        
        case 'connection_error':
          console.log('Connection error:', eventData.response.mistake);
          break;
        
        case 'open_link':
          console.log('Opening external link:', eventData.response.data);
          Linking.canOpenURL(eventData.response.data).then(supported => {
            if (supported) {
              Linking.openURL(eventData.response.data);
            } else {
              console.log("Don't know how to open URI: " + eventData.response.data);
            }
          });
          break;
        
        case 'debug':
          console.log('Debug message:', eventData.message, eventData.data);
          switch (eventData.message) {
            case 'iframe_created':
            case 'iframe_found':
              console.log('IFRAME URL:', eventData.data.src);
              break;
            case 'container_iframe':
              console.log('CONTAINER IFRAME:', eventData.data.src);
              break;
            case 'palenca_config':
              console.log('PALENCA CONFIG:', eventData.data);
              break;
            case 'palenca_loaded':
              console.log('PALENCA LOADED:', eventData.data);
              break;
            case 'container_content':
              console.log('CONTAINER CONTENT:', eventData.data);
              break;
            default:
              console.log('Unknown debug message:', eventData.message);
          }
          break;
        
        case 'error':
          console.log('Palenca error:', eventData.response.mistake);
          break;
        
        default:
          console.log('Unknown event:', eventData);
      }
    } catch (error) {
      console.log('Error parsing event data:', error);
      // Handle non-JSON messages (might be other WebView events)
      console.log('Raw event data:', event.nativeEvent.data);
    }
  };

  // HTML content with Palenca SDK
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>Palenca Link</title>
      <script>${palencaSdkContent}</script>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #fafafa;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .wrapper {
          display: flex;
          height: 100vh;
          align-items: center;
          justify-content: center;
        }
        .card {
          background-color: #ffffff;
          border-radius: 6px;
          box-shadow: 0 5px 10px rgba(102,102,102,0.16);
          width: 90%;
          max-width: 400px;
        }
        .container {
          display: flow-root;
          width: 100%;
          height: 600px;
          overflow: hidden;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div id="container" class="container"></div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Test deeplink function
  const testDeeplink = () => {
    console.log('🔧 Testing deeplink manually');
    // Simulate receiving the deeplink
    const testParams = {
      test: 'true',
      timestamp: Date.now().toString(),
      manual: 'true',
      status: 'test_success',
      widget_id: 'test_widget'
    };
    setQueryParams(testParams);
    console.log('🔧 Manual test params set:', testParams);
  };

  return (
    <View style={styles.container}>
      {/* Test button for debugging */}
      <View style={styles.debugContainer}>
        <TouchableOpacity style={styles.testButton} onPress={testDeeplink}>
          <Text style={styles.testButtonText}>🔧 Test Deeplink</Text>
        </TouchableOpacity>
        <Text style={styles.debugText}>
          Listening for: palencalink://app
        </Text>
        {Object.keys(queryParams).length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={() => {
              setQueryParams({});
              console.log('🔄 Parameters cleared - showing Palenca widget');
            }}
          >
            <Text style={styles.clearButtonText}>🔄 Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Display deep link parameters if any */}
      {Object.keys(queryParams).length > 0 && (
        <View style={styles.paramContainer}>
          <Text style={styles.paramTitle}>🎉 Deep Link Parameters Received!</Text>
          {Object.entries(queryParams).map(([key, value]) => (
            <Text key={key} style={styles.paramText}>
              <Text style={styles.paramKey}>{key}:</Text> {value}
            </Text>
          ))}
          <Text style={styles.paramCount}>
            Total: {Object.keys(queryParams).length} parameters
          </Text>
          <Text style={styles.instructionText}>
            💡 Tap "🔄 Clear" above to return to the Palenca widget
          </Text>
        </View>
      )}
      
      {/* Only show the Palenca widget when no deeplink parameters are present */}
      {Object.keys(queryParams).length === 0 && (
        <WebView
          ref={webViewRef}
          source={{ html: htmlContent }}
          style={styles.webview}
          injectedJavaScript={injectedJavaScript}
          onMessage={handleEvent}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          bounces={false}
          allowsBackForwardNavigationGestures={false}
        />
      )}

      {/* Show a welcome message when no deeplink parameters */}
      {Object.keys(queryParams).length === 0 && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            👋 Welcome to Palenca Link
          </Text>
          <Text style={styles.welcomeSubText}>
            Use the widget above to connect your account, or test deeplinks with the button.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  webview: {
    flex: 1,
  },
  debugContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  testButton: {
    backgroundColor: '#ea4c89',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  testButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  paramContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ea4c89',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paramTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ea4c89',
    marginBottom: 8,
  },
  paramText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  paramKey: {
    fontWeight: 'bold',
    color: '#ea4c89',
  },
  paramCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#ea4c89',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  instructionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ea4c89',
    marginBottom: 10,
  },
  welcomeSubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default MainScreen; 