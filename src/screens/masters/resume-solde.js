import React , {useEffect, useState, useContext, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ResumeSoldeMasters({navigation,item}) {

// api recherche
const [searchTerm, setSearchTerm] = useState(''); 
const searchItems = useMemo(() => {
  return () => {
    const filteredData = data.filter(item =>
      item.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.matricule.toLowerCase().includes(searchTerm.toLowerCase())||
      item.solde.toString().toLowerCase().includes(searchTerm.toLowerCase())
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


  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getListeUtilisateur(); // Appeler la fonction de récupération des données
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
    getSolde();
    navigation.setOptions({ title: 'Résumé des soldes' });
     // Exécuter la fonction avec cache
const delay = 60000; // Définir le délai à 1 minute
getListeUtilisateur(); 
// Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
const intervalId = setInterval(getListeUtilisateur2, delay);
// Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
return () => clearInterval(intervalId);
},[])


const getListeUtilisateur = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/masters/liste-solde-utilisateur.php`, {
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
const getListeUtilisateur2 = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/masters/liste-solde-utilisateur.php`, {
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


 // Solde total epargne
 const getSolde = () =>{
    fetch(`https://adores.tech/api/masters/somme-solde-utilisateur.php`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          if(result !== null) {
            setSoldeTotal(result);
          } else {
            setSoldeTotal([]); // Set an empty array if the result is null
          }
          }
     )
     .catch((error)=>{
      setError(error);
     });
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
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View style={styles.experienceItem}>
          <TouchableOpacity  onPress={() => toggleItem(item.id)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
           {item.photo64 ? (
            <Image
alt=""
source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}` }}
style={styles.userPhoto}
/>
) : (
<Image
alt=""
source={require("../../assets/images/user.jpg")}
style={styles.userPhoto}
/>
  )}

     
        <View style={styles.userInfo}>
          <Text style={styles.userName} numberOfLines={2}>{item.nom_prenom}</Text>
          <Text style={styles.userCode}>@{item.matricule}</Text>
          <Text style={styles.userCode}>{parseFloat(item.solde).toLocaleString("fr-FR")} F</Text>
        </View>
        </View>

        {expandedItems.includes(item.id) && (
          
          <View>
            <View style={{marginBottom:20}}></View>
            <TouchableOpacity
              style={styles.followButton} onPress={() => navigation.navigate('Details beneficiaire Masters',{item})}>
              <Text style={styles.followButtonText}>Informations</Text>
            </TouchableOpacity>
            <View style={{marginBottom:10}}></View>
            <TouchableOpacity
              style={styles.followButton2} onPress={() => navigation.navigate('Transactions Masters',{item})}>
              <Text style={styles.followButtonText2}>Transactions</Text>
            </TouchableOpacity>
            <View style={{marginBottom:10}}></View>
            <TouchableOpacity
              style={styles.followButton} onPress={() => navigation.navigate('Commandes Masters',{item})}>
              <Text style={styles.followButtonText}>Commandes</Text>
            </TouchableOpacity>
            <View style={{marginBottom:10}}></View>
            <TouchableOpacity
              style={styles.followButton2} onPress={() => navigation.navigate('Liste epargnes utilisateur',{item})}>
              <Text style={styles.followButtonText2}>Epargnes</Text>
            </TouchableOpacity>
          </View>
          )}
       
       </TouchableOpacity>
          </View>
    
    
          )}/>

</View>

<View style={styles.overlay}>
        <View
          style={{ flex: 1, paddingHorizontal: 4 }}>
          <View style={styles.btn}>
          <Text style={styles.btnText}>
  Solde : {SoldeTotal.length > 0 && !isNaN(parseFloat(SoldeTotal[0].somme))
    ? parseFloat(SoldeTotal[0].somme).toLocaleString("fr-FR")
    : '0'} F
</Text>
          </View>
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
        marginBottom:60
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
  experienceItem: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding:12,
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
  },
  followingButtonText: {
    color: '#333',
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
    color: '#007BFF',
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
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.45,
  },
});

