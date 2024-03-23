import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen
import Login from './App/Screen/LoginScreen/Login';
import { ClerkProvider, SignedIn, SignedOut} from "@clerk/clerk-expo";


export default function App() {
  const [fontsLoaded] = useFonts({
    'dekko': require('./assets/fonts/Dekko-Regular.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync(); // Prevent SplashScreen from auto-hiding
    return () => {
      SplashScreen.hideAsync(); // Make sure SplashScreen is hidden when component unmounts
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={'pk_test_Z3Jvd24tcmFwdG9yLTQ1LmNsZXJrLmFjY291bnRzLmRldiQ'}>
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* Sign In Component */}
      <SignedIn>
        <Text>You are Signed in</Text>
      </SignedIn>
      {/* SignOut */}
      <SignedOut>
        <Login/>
      </SignedOut>
      <StatusBar style="auto"/>
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:25
  },
});
