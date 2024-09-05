import React , {useEffect, useState, useContext, useMemo } from 'react';
import { View,StyleSheet,Text, TouchableOpacity, Linking } from 'react-native';
import PDFReader from '@valli_/rn-pdf-reader-js';

export default function PDFURL({ navigation,route }) {


  const [pdfUri, setPdfUri] = React.useState(null);
  const {item} = route.params;


  const handleDownloadPdf = () => {
      Linking.openURL(item.url_cours);
  };

  const pdfSource = item.url_cours ? { uri: item.url_cours } : {uri: 'https://adores.tech/upload/erreur.pdf'};

  useEffect(()=>{
    navigation.setOptions({ title: item.titre_cours });
  },[])

  return (
    <View style={{ flex: 1 }}>
      <PDFReader
        //source={{ uri: item.url_cours }}
        source={pdfSource}
       // onLoad={handleLoad}
      />
      <TouchableOpacity onPress={handleDownloadPdf} style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Télécharger</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    downloadButton: {
        position: 'absolute',
        bottom: 20,
        left: '30%', // Au centre horizontalement
        right: '30%',
        width: 150,
        backgroundColor: '#0099cc',
        padding: 10,
        borderRadius: 5,
      },
      
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: "center"
  },
});
