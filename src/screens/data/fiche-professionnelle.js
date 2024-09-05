import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View,StyleSheet,Text, TouchableOpacity, Linking } from 'react-native';
import PDFReader from '@valli_/rn-pdf-reader-js';
import { GlobalContext } from '../../global/GlobalState';

export default function FicheProfessionnelle({ navigation }) {

  const [pdfUri, setPdfUri] = React.useState(null);
  const [user, setUser] = useContext(GlobalContext);


  const handleDownloadPdf = () => {

      Linking.openURL(`https://www.adores.tech/api/data/fiche-professionnelle.php?matricule=${user[0].matricule}`);

  };

  return (
    <View style={{ flex: 1 }}>
      <PDFReader
        source={{
          uri: `https://www.adores.tech/api/data/fiche-professionnelle.php?matricule=${user[0].matricule}`,
        }}
      />
      <TouchableOpacity onPress={handleDownloadPdf} style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Télécharger le PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
