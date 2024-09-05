import React , {useEffect, useState, useContext, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function MesPrisesEnCharge({navigation}) {


// api recherche
const [searchTerm, setSearchTerm] = useState('');
  const searchItems = useMemo(() => {
  return () => {
    const filteredData = data.filter(item =>
      item.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type_bourse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titre_bourse.toLowerCase().includes(searchTerm.toLowerCase())||
      item.matricule.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredData;
  };
}, [data, searchTerm]);
// api recherche

    // liste des categories
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [user, setuser] = useContext(GlobalContext);


  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getMesPrisesEnCharge(); // Appeler la fonction de récupération des données
    setRefreshing(false); // Indiquer que le rafraîchissement est terminé
  };



useEffect(()=>{
    navigation.setOptions({ title: 'Mes prises en charge' });
    // Exécuter la fonction avec cache
    const delay = 60000; // Définir le délai à 1 minute
    getMesPrisesEnCharge(); 
    // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
    const intervalId = setInterval(getMesPrisesEnCharge2, delay);
    // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
    return () => clearInterval(intervalId);
},[])

// liste
const getMesPrisesEnCharge = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/mes-prises-charge.php?code=${user[0].matricule}`, {
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

// liste 2
const getMesPrisesEnCharge2 = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/data/mes-prises-charge.php?code=${user[0].matricule}`, {
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
      keyExtractor={(item) => item.code_beneficiaire}
      renderItem={({item}) => (
        <View style={styles.userContainer}>

           {item.photo64 ? (
            <Image
alt=""
source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}` }}
style={styles.userPhoto}
resizeMode="cover"
/>
) : (
<Image
alt=""
source={require("../../assets/images/user.jpg")}
style={styles.userPhoto}
resizeMode="cover"
/>
  )}

     
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.nom_prenom} ({item.matricule})</Text>
          <Text style={styles.userCode}>{item.titre_bourse}</Text>
          <Text style={styles.userCode}>{item.type_bourse}</Text>
        </View>
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
        onPress={() => navigation.navigate('Prise en charge')} 
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
    padding: 16,
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
  },
  followButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
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
    fontSize : 13
  },
  followingButtonText: {
    color: '#333',
  },
});
