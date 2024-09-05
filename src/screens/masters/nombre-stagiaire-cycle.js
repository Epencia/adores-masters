import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import React , {useEffect, useState, useContext } from 'react';
import { Stack, AppBar } from "@react-native-material/core";
import { GlobalContext } from '../../global/GlobalState';
import { CarteContext } from '../../global/CarteState';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NombreStagiaireCycleMasters = ({navigation,item}) => {

  // liste des categories
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const [error, setError] = useState(null);
const [GlobalCarte, setGlobalCarte] = useContext(CarteContext);

const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [searchTerm, setSearchTerm] = useState('');


const [refreshing, setRefreshing] = useState(false);
const handleRefresh = () => {
  setRefreshing(true); // Indiquer que le rafraîchissement est en cours
  getNombreStagiaireCycle(); // Appeler la fonction de récupération des données
  setRefreshing(false); // Indiquer que le rafraîchissement est terminé
};


useEffect(()=>{
    navigation.setOptions({title: 'Liste des cycles'});
    getNombreStagiaireCycle();
},[])

const getNombreStagiaireCycle = () =>{

  setIsLoading(true);

fetch(`https://adores.tech/api/masters/nombre-stagiaire-cycle.php`,{
  method:'post',
    header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    
})
.then((response) => response.json())
 .then(
     (result)=>{
      setData(result);
      setIsLoading(false);
      }
 )
 .catch((error)=>{
  setIsLoading(false);
  setError(error);
 });




}

// In des mobile money
// Rechercher dans la liste
const searchItems = () => {
  const filteredData = data.filter(item =>
    item.code_cycle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.intitule_cycle.toLowerCase().includes(searchTerm.toLowerCase())||
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredData;
};

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
    
    <SafeAreaView style={styles.container}>

<Stack spacing={6} style={{ margin: 16 }}>
    <TextInput label="Barre de recherche" variant="standard" 
              placeholder="Rechercher..."
              onChangeText={text => setSearchTerm(text)}
  value={searchTerm}
    />
  </Stack>
      
      {data.length > 0 ? (
<View style={{marginTop:10,marginLeft:13,marginRight:15,marginBottom:-5,flexDirection:'row',justifyContent:'space-between'}}>


</View>
) : (
    <View style={{marginTop: 25, marginRight:15,marginLeft:15,
        elevation:5,backgroundColor:'white',borderRadius:6,marginBottom:5,
      }}>
      <Text style={{marginTop: 10, marginRight:15,marginLeft:15,
        marginBottom:15,color:'red',textAlign:'center'
      }}>Aucun résultat</Text>
      </View>
    )}


  <FlatList
   style={styles.MyContainer}
   data={searchTerm ? searchItems() : data}
    keyExtractor={item=>item.code_cycle} 
    renderItem={({item}) => (
      <TouchableOpacity style={styles.Card} onPress={() => navigation.navigate('Liste stagiaires par cycle',{item})}>      

{item.photo64 ? (
  <Image style={{width : 70,
    height : 70,
    borderRadius : 70/2,
    marginRight : 15,backgroundColor : '#C0C0C0',}} 
    source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}` }} />
    
) : (
  <Image style={{width : 70,
    height : 70,
    borderRadius : 70/2,backgroundColor : '#C0C0C0',}} 
    source={require("../../assets/images/user.jpg")} />
    )}

<View style={{marginRight:25,paddingHorizontal : 15}}>
               
               <Text style={{fontSize:18,fontWeight:'700',marginBottom:7,marginRight:25}}>{item.intitule_cycle}</Text>
               <Text style={styles.Categorie} >{item.code_cycle}</Text>
               <Text style={{fontSize:12,fontWeight:'700', opacity: .8,color:'#0099cc',marginRight:25}}>{item.nombre}</Text>
               
          </View>
      </TouchableOpacity>
    )}
    
    
  />



</SafeAreaView>



  )
}

export default NombreStagiaireCycleMasters




// styles
const styles = StyleSheet.create({
     // search
     container: {
      flex: 1,
      justifyContent: 'center',
      
    },
    

    // Liste
      MyContainer : {
       marginTop : 5,
       paddingHorizontal : 15,
       paddingVertical : 15,
       
    },
    
      Card : {
       flex : 1,
       flexDirection : 'row',
       paddingHorizontal : 15,
       paddingVertical : 15,
       padding : 10,
       marginBottom : 20,
       borderRadius : 5,
       backgroundColor : 'white',
       elevation : 5,
       width: "100%",
       
    },
    
    Info : {
       flexDirection : 'column',
        
      },
    
    NomPrenom : {
     fontWeight : 'bold',
      fontSize : 16,
      marginBottom : 15,
    },
    
    Categorie : {
      fontSize:14,
      fontWeight : '700',
      color : "#008080",
      marginRight:25,
    },
    
    Photo : {
       width : 80,
       height : 80,
       borderRadius : 80/2,
       backgroundColor : '#C0C0C0',
       marginRight : 15,
      },

  });