import * as React from 'react';
import { View,StyleSheet,Text, TouchableOpacity, Linking } from 'react-native';
import PDFReader from '@valli_/rn-pdf-reader-js';

export default function Exemple({ navigation }) {
  const [pdfUri, setPdfUri] = React.useState(null);


  const handleDownloadPdf = () => {
    if (pdfUri) {
      Linking.openURL('https://lycee-ci.online/pluginfile.php/49524/mod_resource/content/4/TleC_PHY_L1_Cinématique%20du%20point.pdf');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <PDFReader
        source={{
          uri: 'https://lycee-ci.online/pluginfile.php/49524/mod_resource/content/4/TleC_PHY_L1_Cinématique%20du%20point.pdf',
        }}
       // onLoad={handleLoad}
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
    backgroundColor: '#0099cc',
    padding: 10,
    borderRadius: 5,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
