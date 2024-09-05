import React , {useEffect, useState, useContext, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ResumeCaisseMasters({navigation,item}) {

// api recherche
const [searchTerm, setSearchTerm] = useState(''); 
const searchItems = useMemo(() => {
  return () => {
    const filteredData = data.filter(item =>
      item.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.libelle_classe.toLowerCase().includes(searchTerm.toLowerCase())||
      item.somme.toString().toLowerCase().includes(searchTerm.toLowerCase())||
      item.facture.toString().toLowerCase().includes(searchTerm.toLowerCase())||
      item.reste.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
  const [SoldeCreance, setSoldeCreance] = useState([]);


  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getResumeCaisse(); // Appeler la fonction de récupération des données
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


 // calcul
 // Extraire les valeurs numériques des chaînes de caractères et les convertir en nombres
const soldeTotal = SoldeTotal.length > 0 && !isNaN(parseFloat(SoldeTotal[0].somme)) ? parseFloat(SoldeTotal[0].somme) : 0;
const soldeCreance = SoldeCreance.length > 0 && !isNaN(parseFloat(SoldeCreance[0].somme)) ? Math.abs(parseFloat(SoldeCreance[0].somme)) : 0;

// Faire l'addition des deux montants
const sommeTotale = soldeTotal + soldeCreance;

// Formater la somme totale en utilisant la locale "fr-FR"
const sommeTotaleFormatee = sommeTotale.toLocaleString("fr-FR");

 //fin

useEffect(()=>{
    getSolde();
    getCreance();
    navigation.setOptions({ title: 'Résumé de caisse' });
    // Exécuter la fonction avec cache
const delay = 60000; // Définir le délai à 1 minute
getResumeCaisse(); 
// Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
const intervalId = setInterval(getResumeCaisse2, delay);
// Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
return () => clearInterval(intervalId);
},[])


const getResumeCaisse = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/masters/resume-caisse.php`, {
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
const getResumeCaisse2 = async () => {
   try {
    const response = await fetch(`https://adores.tech/api/masters/resume-caisse.php`, {
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
    fetch(`https://adores.tech/api/masters/somme-paiement.php`,{
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
 // Solde total epargne
 const getCreance = () =>{
  fetch(`https://adores.tech/api/masters/somme-creance.php`,{
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
          setSoldeCreance(result);
        } else {
          setSoldeCreance([]); // Set an empty array if the result is null
        }
        }
   )
   .catch((error)=>{
    setError(error);
   });
  }

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
        <View style={styles.experienceItem}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} 
        onPress={() => navigation.navigate('Details Resume Masters',{item})}>
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
          <Text style={styles.userCode}>{item.libelle_classe}</Text>
          <Text style={styles.userCode}>
  {parseFloat(item.facture).toLocaleString("fr-FR")} F *    
  <Text style={{ color: '#007BFF' }}> {parseFloat(item.somme).toLocaleString("fr-FR")} F</Text> *  
  <Text style={{ color: 'red' }}> {parseFloat(item.reste).toLocaleString("fr-FR")} F</Text>
</Text>

        </View>
        </TouchableOpacity>
      
          </View>
    
    
          )}/>

</View>




<View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <View style={styles.overlayContentTop}>
            <Text style={styles.overlayContentPriceBefore}>Avance :</Text>
            <Text style={styles.overlayContentPrice}>
            {SoldeTotal.length > 0 && !isNaN(parseFloat(SoldeTotal[0].somme))
    ? parseFloat(SoldeTotal[0].somme).toLocaleString("fr-FR")
    : '0'} F
            </Text>
          </View>

          <View style={styles.overlayContentTop}>
            <Text style={styles.overlayContentPriceBefore}>Reste :</Text>
            <Text style={styles.overlayContentPrice2}>
            {SoldeCreance.length > 0 && !isNaN(parseFloat(SoldeCreance[0].somme))
    ? Math.abs(parseFloat(SoldeCreance[0].somme)).toLocaleString("fr-FR")
    : '0'} F
            </Text>
          </View>
        </View>


          <View style={styles.btn}>
            <Text style={styles.btnText}>
            {sommeTotaleFormatee} F
            </Text>


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
        marginBottom:70
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
    fontSize: 15,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.45,
  },
  overlayContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  overlayContentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 2,
  },
  overlayContentPriceBefore: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    color: '#8e8e93',
    marginRight: 4,
    textDecorationColor: '#8e8e93',
    textDecorationStyle: 'solid',
  },
  overlayContentPrice: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  overlayContentPrice2: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: 'bold',
    color: 'red',
  },
  overlayContentTotal: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 'bold',
    color: '#4c6cfd',
    letterSpacing: -0.07,
    textDecorationLine: 'underline',
    textDecorationColor: '#4c6cfd',
    textDecorationStyle: 'solid',
  },
});

