import React , {useEffect, useState, useContext , useMemo} from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput,Linking} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function PriseEnCharge({navigation,item}) {


  // liste des categories
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [user, setUser] = useContext(GlobalContext);



const [refreshing, setRefreshing] = useState(false);
const handleRefresh = () => {
  setRefreshing(true); // Indiquer que le rafraîchissement est en cours
  getListeBourse(); // Appeler la fonction de récupération des données
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
  navigation.setOptions({ title: 'Prises en charge' });
  // Exécuter la fonction avec cache
  const delay = 10000; // Définir le délai à 1 minute
  getListeBourse(); 
  // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
  const intervalId = setInterval(getListeBourse2, delay);
  // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
  return () => clearInterval(intervalId);
},[])

// liste
const getListeBourse = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/liste-prise-charge.php`, {
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
// In des mobile money
const getListeBourse2 = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/data/liste-prise-charge.php`, {
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

// valider souscription
const ValidationSouscription = (param1) =>{

  fetch(`https://adores.tech/api/mobile/validation-prise-charge.php?matricule=${user[0].matricule}&bourse=${param1} `,{
    method:'post',
    header:{
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },			
  })
  .then((response) => response.json())
   .then((responseJson)=>{
    alert(responseJson);
   })
   .catch((error)=>{
   alert(error);
   });
}

// api recherche
const searchItems = useMemo(() => {
  return () => {
  const filteredData = data.filter(item =>
    item.titre_bourse.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type_bourse.toLowerCase().includes(searchTerm.toLowerCase())
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
      keyExtractor={(item) => item.code_bourse}
      renderItem={({item}) => (
        <View style={styles.experienceItem}>
         
        <TouchableOpacity  onPress={() => toggleItem(item.code_bourse)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
           
        <View style={[styles.cardIcon, { backgroundColor: "#007BFF" }]}>
                <MaterialCommunityIcons color="white" name='ambulance' size={20} />
        </View>
 

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.titre_bourse}</Text>
          <Text style={styles.userCode}>{item.type_bourse}</Text>
        </View>

        </View>
        
        {expandedItems.includes(item.code_bourse) && (
          
      <View>
        <View style={{marginBottom:20}}></View>
        <View>
          <Text style={styles.followButtonText2}>{item.details_bourse}</Text>
        </View>
        <View style={{marginBottom:10}}></View>
        <TouchableOpacity
          style={styles.followButton} onPress={() => ValidationSouscription(item.code_bourse)}>
          <Text style={styles.followButtonText}>Souscrire</Text>
        </TouchableOpacity>
      </View>
      )}
   
   </TouchableOpacity>
      </View>


      )}/>


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
        onPress={() => navigation.navigate('Mes prises en charge')} 
      >
        <FeatherIcon name="plus" size={30} color="white" />
      </TouchableOpacity>

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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userCode: {
    fontSize: 14,
    color: '#888',
    //fontWeight: 'bold',
  },
  followButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followingButton: {
    backgroundColor: '#ccc',
  },
  followButtonText: {
    color: 'white',
  },
  followingButtonText: {
    color: '#333',
  },
  experienceItem: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding:12,
  },
  followButton2: {
    backgroundColor: 'white',
    borderColor:'#007BFF',
    borderWidth:1,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButtonText2: {
    color: 'black',
    textAlign : 'justify'
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
});

