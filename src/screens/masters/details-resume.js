import React , {useEffect, useState, useContext, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../../global/GlobalState';
import moment from 'moment';


export default function DetailsResumeMasters({navigation,route}) {

// api recherche
const [searchTerm, setSearchTerm] = useState(''); 
const searchItems = useMemo(() => {
  return () => {
    const filteredData = data.filter(item =>
      item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.libelle.toLowerCase().includes(searchTerm.toLowerCase())||
      item.montant.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredData;
  };
}, [data, searchTerm]);
// api recherche

    // liste des categories
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useContext(GlobalContext);
  const [SoldeTotal, setSoldeTotal] = useState([]);

  const {item} = route.params;


  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getListeTransaction(); // Appeler la fonction de récupération des données
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



useEffect(()=>{
    getListeTransaction();
    navigation.setOptions({ title: item.nom_prenom });
},[])


const getListeTransaction = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/masters/liste-paiement-matricule.php?matricule=${item.matricule}&classe=${item.classe}`, {
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




// In des mobile money

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
        <Text style={{ fontSize: 18,color:'red',marginRight:10,marginLeft:10}}>
        Erreur lors de la récupération des données... Vérifiez votre connexion internet !
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
      keyExtractor={item=>item.code} 
      renderItem={({item}) => (
            <View style={styles.card}>
              <View style={[styles.cardIcon, { backgroundColor: "#007BFF" }]}>
                <MaterialCommunityIcons color="white" name='card-account-details' size={20} />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.libelle}</Text>
                <Text style={styles.cardCategory}>{moment(item.date).format('DD-MM-YYYY')}</Text>
                <Text style={styles.cardCategory2}>{parseFloat(item.montant).toLocaleString("fr-FR")} F</Text>
              </View>


             
            </View>
         )}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Fond blanc
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#131313',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7f7f7f',
  },
  cardCategory2: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007BFF',
  },
  cardPrice: {
    marginLeft: 'auto',
    fontSize: 17,
    fontWeight: '700',
    color: '#007BFF',
  },
});

