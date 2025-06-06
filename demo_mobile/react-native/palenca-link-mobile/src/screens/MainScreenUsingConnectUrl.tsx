import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Linking, Text, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

const MainScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

  // Parse deep link parameters when app is opened via deep link
  useEffect(() => {
    const parseDeepLink = (url: string) => {
      try {
        const urlObj = new URL(url);
        const params: Record<string, string> = {};
        urlObj.searchParams.forEach((value, key) => {
          params[key] = value;
        });
        setQueryParams(params);
        console.log('Deep link parameters:', params);
      } catch (error) {
        console.log('Error parsing deep link:', error);
      }
    };

    // Check if app was opened with initial URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        parseDeepLink(url);
      }
    });

    // Listen for deep links while app is running
    const subscription = Linking.addEventListener('url', ({ url }) => {
      parseDeepLink(url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Handle messages from Palenca widget
  const handleEvent = (event: any) => {
    try {
      const eventData = JSON.parse(event.nativeEvent.data);
      console.log('Palenca event received:', eventData);

      switch (eventData.signal) {
        case 'ready':
          console.log('Widget is ready');
          Alert.alert('Palenca', 'Widget is ready');
          break;
        
        case 'user_created':
          console.log('User created:', eventData.response.data);
          Alert.alert('Success', `User created with ID: ${eventData.response.data.user_id}`);
          break;
        
        case 'connection_success':
          console.log('Connection success:', eventData.response.data);
          Alert.alert('Success', `Successfully connected to ${eventData.response.data.platform}`);
          break;
        
        case 'connection_error':
          console.log('Connection error:', eventData.response.mistake);
          Alert.alert('Error', `Connection failed: ${eventData.response.mistake.message}`);
          break;
        
        case 'open_link':
          console.log('Opening external link:', eventData.response.data);
          Alert.alert('Open link', `Open link: ${eventData.response.data}`);
          // Linking.canOpenURL(eventData.response.data).then(supported => {
          //   if (supported) {
          //     Linking.openURL(eventData.response.data);
          //   } else {
          //     console.log("Don't know how to open URI: " + eventData.response.data);
          //   }
          // });|
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

  // Handle navigation requests - only allow Palenca domains
  const onShouldStartLoadWithRequest = (request: any) => {
    console.log('Navigation request:', request.url);
    
    // Allow Palenca domain and initial load
    if (request.url.includes('connect.palenca.com') || 
        request.url.includes('palenca.com') ||
        request.url === 'about:blank') {
      return true;
    }
    
    // Block other external URLs - they should come through open_link event instead
    if (request.url.startsWith('http://') || request.url.startsWith('https://')) {
      console.log('Blocking direct navigation to external URL, should come via open_link event:', request.url);
      return false;
    }
    
    return true;
  };

  // Build Palenca widget URL with parameters
  const widgetId = 'bf36e158-fbc6-4eb1-bc4e-09dc1fe846b2';
  const baseUrl = 'https://connect.palenca.com';
  
  // URL parameters for the widget
  const params = new URLSearchParams({
    widget_id: widgetId,
    primary_color: 'ea4c89',
    border_radius: '999px',
    country: 'mx',
    hide_consent: 'true',
    redirect_url: 'palencalink://app', // This is our deep link
  });

  const widgetUrl = `${baseUrl}?${params.toString()}`;

  return (
    <View style={styles.container}>
      {/* Display deep link parameters if any */}
      {Object.keys(queryParams).length > 0 && (
        <View style={styles.paramContainer}>
          <Text style={styles.paramTitle}>Deep Link Parameters:</Text>
          {Object.entries(queryParams).map(([key, value]) => (
            <Text key={key} style={styles.paramText}>
              {key}: {value}
            </Text>
          ))}
        </View>
      )}
      
      <WebView
        ref={webViewRef}
        source={{ uri: widgetUrl }}
        style={styles.webview}
        onMessage={handleEvent}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        bounces={false}
        allowsBackForwardNavigationGestures={false}
      />
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
  paramContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ea4c89',
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
});

export default MainScreen; 