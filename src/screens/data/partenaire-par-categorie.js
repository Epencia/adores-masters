import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,TextInput,ActivityIndicator,ScrollView} from 'react-native';
import React , {useEffect, useState, useContext, useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function PartenaireCategorie ({navigation,route}) {

  // liste des categories
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {item} = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getPartenaire(); // Appeler la fonction de récupération des données
    setRefreshing(false); // Indiquer que le rafraîchissement est terminé
  };

useEffect(()=>{
navigation.setOptions({title: item.titre});
// Exécuter la fonction avec cache
const delay = 60000; // Définir le délai à 1 minute
getPartenaire(); 
// Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
const intervalId = setInterval(getPartenaire2, delay);
// Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
return () => clearInterval(intervalId);
},[])



// liste
const getPartenaire = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/categorie-partenaire.php?categorie=${item.code}`, {
    headers: {
      //'Cache-Control': 'no-cache',
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
const getPartenaire2 = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/data/categorie-partenaire.php?categorie=${item.code}`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setData(newData);
} catch (error) {
  setError(error);
}
}


  // api recherche
  const searchItems = useMemo(() => {
    return () => {
    const filteredData = data.filter(item =>
      item.raison_sociale.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ville.toLowerCase().includes(searchTerm.toLowerCase())   ||
      item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.adresse.toLowerCase().includes(searchTerm.toLowerCase())
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
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Prestations par partenaire',{item})}>
                 {item.photo64 ? (
          <Image
alt=""
source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}` }}
style={styles.image}
/>
) : (
<Image
alt=""
source={require("../../assets/images/user.jpg")}
style={styles.image}
/>
)}

        <View style={styles.textContainer}>

          <Text style={styles.text}>{item.nom_prenom ? item.nom_prenom : "Aucune dénomination"}</Text>

          <View style={styles.dataContainer}>
            <FeatherIcon name="user" size={16} color="gray" style={styles.icon} />
            <Text style={styles.dataText}>{item.titre ? item.titre : "Aucune catégorie"}</Text>
          </View>
          <View style={styles.dataContainer}>
            <FeatherIcon name="info" size={16} color="gray" style={styles.icon} />
            <Text style={styles.dataText}>{item.ville ? item.ville : "Aucune ville"}</Text>
          </View>
          <View style={styles.dataContainer}>
            <FeatherIcon name="settings" size={16} color="gray" style={styles.icon} />
            <Text style={styles.dataText}>{item.adresse ? item.adresse : "Aucune adresse"}</Text>
          </View>
        </View>
      </TouchableOpacity>
      )}
    />
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'white', // Fond blanc
  padding: 16,
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
  width: 50,
  height: 50,
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
});



