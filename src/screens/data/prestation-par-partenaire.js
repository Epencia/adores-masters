import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,TextInput,ActivityIndicator,ScrollView,Linking} from 'react-native';
import React , {useEffect, useState, useContext, useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function PrestationPartenaire ({navigation,route}) {
 
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');


const {item} = route.params;

const [refreshing, setRefreshing] = useState(false);
const handleRefresh = () => {
  setRefreshing(true); // Indiquer que le rafraîchissement est en cours
  getPrestationPartenaire(); // Appeler la fonction de récupération des données
  setRefreshing(false); // Indiquer que le rafraîchissement est terminé
};


useEffect(()=>{
    navigation.setOptions({title: item.raison_sociale});
    getPrestationPartenaire();
    
},[])



// liste
const getPrestationPartenaire = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/prestation-partenaire.php?structure=${item.id}`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setData(newData);
 setIsLoading(false);
} catch (error) {
  setIsLoading(false);
  setError(error);
}
}
// liste 

  
  // api recherche
  const searchItems = useMemo(() => {
    return () => {
    const filteredData = data.filter(item =>
      item.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.statut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.prix.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredData;
  };
  }, [data, searchTerm]);
  // api recherche

// Erreur et Chargement --debut--
if (isLoading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#5500dc" />
    </View>
  );
}

if (error) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
      <MaterialCommunityIcons color="#266EF1" name="access-point-off" size={150}/>
      <Text style={{ fontSize: 18,marginRight:10,marginLeft:10,marginBottom:10}}>
      Pas de connexion internet !
      </Text>
      <TouchableOpacity onPress={handleRefresh} style={{ backgroundColor: '#0099cc',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 5,}}>
        <Text style={{ color: 'white',fontSize: 16,fontWeight: 'bold',textAlign: 'center', }}>Réessayer</Text>
      </TouchableOpacity>
    </View>
  );
}
// Erreur et Chargement --fin--

return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>

{data.length > 0 ? (
<View style={styles.searchBar}>
<FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
<TextInput
 style={styles.input}
 placeholder="Rechercher..."
 onChangeText={text => setSearchTerm(text)}
value={searchTerm}
/>
</View>
) : (
  <View style={{marginTop: 25, marginRight:15,marginLeft:15,
      elevation:5,backgroundColor:'white',borderRadius:6,marginBottom:5,
    }}>
    <Text style={{marginTop: 10, marginRight:15,marginLeft:15,
      marginBottom:15,color:'#888',textAlign:'center'
    }}>Aucune donnée disponible</Text>
    </View>
  )}

 

    <FlatList
       data={searchTerm ? searchItems() : data}
      keyExtractor={(item) => item.code}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Details prestation',{item})}>
                 
                  <MaterialCommunityIcons
                  style={styles.image}
                  name={'shopping'}
                  size={50}
                  color="#007BFF"
                />

        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.libelle}</Text>
          <View style={styles.dataContainer}>
            <FeatherIcon name="user" size={16} color="gray" style={styles.icon} />
            <Text style={styles.dataText}>{parseFloat(item.prix).toLocaleString("fr-FR")} F CFA</Text>
          </View>
          <View style={styles.dataContainer}>
            <FeatherIcon name="info" size={16} color="gray" style={styles.icon} />
            <Text style={styles.dataText}>{item.statut}</Text>
          </View>
        </View>
      </TouchableOpacity>
      )}
    />

     
</View>

<View style={styles.overlay}>
  <View style={styles.footer}>

    <TouchableOpacity
      onPress={()=>{Linking.openURL(`tel:${item.telephone}`);}}
      style={{ flex: 1 }}>
      <View style={styles.btnSecondary}>
        <MaterialCommunityIcons
          color="#fff"
          name="phone"
          size={25}
        />
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={()=>{Linking.openURL(`sms:${item.telephone}`);}}
      style={{ flex: 1, paddingHorizontal: 8 }}>
      <View style={styles.btnSecondary}>
        <MaterialCommunityIcons
          color="#fff"
          name="message-processing"
          size={25}
        />
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={()=>{Linking.openURL(`https://wa.me/${item.telephone}`);}}
      style={{ flex: 1,  }}>
      <View style={styles.btnSecondary}>
        <MaterialCommunityIcons
          color="#fff"
          name="whatsapp"
          size={25}
        />
      </View>
    </TouchableOpacity>

  </View>
</View>

      
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'white', // Fond blanc
  padding: 16,
  marginBottom:80
},
searchBar: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  backgroundColor: 'white', // Fond blanc pour la barre de recherche
  borderRadius: 8,
  borderWidth: 1,
  borderColor: 'gray',
},
searchIcon: {
  padding: 8,
},
input: {
  flex: 1,
  height: 40,
},
listItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  borderRadius: 8, // Bordures arrondies
  backgroundColor: 'white', // Fond gris clair
  padding: 16,
  borderWidth: 1,
  borderColor: '#ccc',
},
image: {
  //width: 50,
  //height: 50,
  borderRadius: 25,
  marginRight: 16,
},
textContainer: {
  flex: 1,
},
text: {
  fontSize: 16,
},
dataText: {
  fontSize: 14,
  color: 'gray',
},
dataContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
icon: {
  marginRight: 8,
},
overlay: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: 12,
  paddingHorizontal: 16,
  paddingBottom: 16,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
},
footer: {
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
btn: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 36,
  borderWidth: 1,
  backgroundColor: '#007BFF',
  borderColor: '#007BFF',
  height: 52,
  //marginRight:10
},
btnSecondary: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderWidth: 1,
  backgroundColor: '#007BFF',
  borderColor: '#007BFF',
  height: 52,
  //marginRight:10
},
btnSecondaryText: {
  fontSize: 13,
  lineHeight: 26,
  fontWeight: '700',
  color: '#fff',
},
btnText: {
  fontSize: 13,
  lineHeight: 26,
  fontWeight: '700',
  color: '#fff',
},
});