import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Home } from './src/screens/Home';
import AppLoading from 'expo-app-loading';

import { AuthProvider } from './src/hooks/auth';



import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <AuthProvider>
     <StatusBar translucent backgroundColor="transparent"/>
      <Home/>
    </AuthProvider>
  );
}

