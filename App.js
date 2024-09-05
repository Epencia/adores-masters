import React, { useEffect,useState, useContext } from "react";
import { View } from 'react-native';
import Routes from './src/routes';
import { GlobalProvider } from './src/global/GlobalState';
import { StagiaireProvider } from './src/global/StagiaireState';
import 'react-native-gesture-handler';



  export default function App ({navigation})  {

  return (
    <View style={{flex:1}}>
      <GlobalProvider>
         <StagiaireProvider>
            <Routes/>
         </StagiaireProvider>
    </GlobalProvider>
    </View>
  );
}
