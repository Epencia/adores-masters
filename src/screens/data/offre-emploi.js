import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OffreEmploi() {
  const [isConnected, setIsConnected] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const [webViewKey, setWebViewKey] = useState(0); // Ajout de la clé pour le WebView

  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    setWebViewKey(prevKey => prevKey + 1); // Mettre à jour la clé du WebView pour le recharger
    setRefreshing(false); // Indiquer que le rafraîchissement est terminé
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {isConnected ? (
        <WebView
        key={webViewKey}
          style={{ flex: 1 }}
          //source={{ uri: 'https://emploi.educarriere.ci/nos-offres?typeoffre1=emploi' }}
          //source={{ uri: 'https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0' }}
          //source={{ uri: 'https://www.agenceemploijeunes.ci/site/offres-emplois' }}
          source={{ uri: 'https://www.emploi.ci/recherche-jobs-cote-ivoire' }}
        />
      ) : (
        <View style={styles.noConnection}>
          <MaterialCommunityIcons color="#266EF1" name="access-point-off" size={150}/>
          <Text style={{ fontSize: 18,marginRight:10,marginLeft:10,marginBottom:10}}>
            Pas de connexion internet
            </Text>
          <TouchableOpacity onPress={handleRefresh} style={{ backgroundColor: '#0099cc',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 5,}}>
        <Text style={{ color: 'white',fontSize: 16,fontWeight: 'bold',textAlign: 'center', }}>Réessayer</Text>
      </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noConnection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});