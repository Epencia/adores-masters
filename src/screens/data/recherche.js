import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,TextInput,ActivityIndicator,ScrollView} from 'react-native';
import React , {useEffect, useState, useContext, useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import unidecode from 'unidecode';


export default function Recherche ({navigation}) {

  // liste des categories
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [resultCount, setResultCount] = useState(0);

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getPartenaire(); // Appeler la fonction de récupération des données
    setRefreshing(false); // Indiquer que le rafraîchissement est terminé
  };

     // toogle
 const [expandedItems, setExpandedItems] = useState([]);
 const toggleItem = (itemId) => {
   if (expandedItems.includes(itemId)) {
     setExpandedItems(expandedItems.filter(id => id !== itemId));
   } else {
     setExpandedItems([...expandedItems, itemId]);
   }
 };

 useEffect(() => {
  setResultCount(searchItems().length);
}, [searchTerm, data]);

 useEffect(()=>{
  // Exécuter la fonction avec cache
  const delay = 10000; // Définir le délai à 1 minute
  getPartenaire(); 
  // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
  const intervalId = setInterval(getPartenaire2, delay);
  // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
  return () => clearInterval(intervalId);
},[])

const getPartenaire = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/partenaire.php`, {
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
  const response = await fetch(`https://adores.tech/api/data/partenaire.php`, {
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

// In des mobile money
// api recherche


const searchItems = useMemo(() => {
  return () => {
  
    const searchTerms = searchTerm.toLowerCase().split(' ');

    const filteredData = data.filter(item => {
      // Normaliser les caractères spéciaux et les accents
      const normalize = text => unidecode(text).toLowerCase();

      // Vérifier chaque mot-clé normalisé dans toutes les colonnes pertinentes
      return searchTerms.every(term =>
        normalize(item.nom_prenom).includes(normalize(term)) ||
        normalize(item.ville).includes(normalize(term)) ||
        normalize(item.titre).includes(normalize(term)) ||
        normalize(item.adresse).includes(normalize(term))
      );
    });
    

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



<View style={styles.searchBar}>
<FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
<TextInput
 style={styles.input}
 placeholder="Rechercher..."
 onChangeText={text => setSearchTerm(text)}
value={searchTerm}
/>
</View>

{data.length > 0 ? (
  searchItems().length === 0 ? (
    <Text style={styles.noResultText}>Aucun résultat trouvé</Text>
  ) : (
    <Text style={styles.resultCountText}>{resultCount} résultat(s) trouvé(s)</Text>
  )
) : null}


    <FlatList
       data={searchTerm ? searchItems() : data}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View style={styles.experienceItem}>
        <TouchableOpacity  onPress={() => toggleItem(item.id)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 {item.photo64 ? (
          <Image
alt=""
source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}`}}
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

        </View>

        {expandedItems.includes(item.id) && (
          
          <View style={styles.tableContainer}>
          {/* Première ligne avec les en-têtes */}
          <View style={styles.tableRow}>
            {/* Première colonne */}
            <View style={styles.tableCell}>
              <Text style={styles.columnHeader}>Produits</Text>
            </View>
            {/* Deuxième colonne */}
            <View style={styles.tableCell}>
              <Text style={styles.columnHeader}>Prix</Text>
            </View>
          </View>
        
          {/* Lignes de données */}
          {data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              {/* Première colonne */}
              <View style={styles.tableCell}>
                <Text style={styles.cellContent}>{item.libelle ? item.libelle : "Aucun produit"}</Text>
              </View>
              {/* Deuxième colonne */}
              <View style={styles.tableCell}>
                <Text style={styles.cellContent}>{item.prix ? item.prix : "0"}</Text>
              </View>
            </View>
          ))}
        </View>
        

          )}

      </TouchableOpacity>
      </View>
      )}
    />

<TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 50,
          height: 50,
          backgroundColor: 'blue',
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Nouvelle entreprise')} 
      >
        <FeatherIcon name="plus" size={30} color="white" />
      </TouchableOpacity>
   
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
  width: 70,
  height: 70,
  borderRadius: 70,
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
experienceItem: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding:12,
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  resultCountText: {
    marginBottom: 10,
    fontSize: 16,
    color: 'gray',
    textAlign: 'left',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 16
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  columnHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cellContent: {
    textAlign: 'center',
  },
  followButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  followButtonText: {
    textAlign: 'center',
  },
});



