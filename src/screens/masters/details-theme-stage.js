import React , {useEffect, useState, useContext, useMemo} from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { StagiaireContext } from '../../global/StagiaireState';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';


export default function DetailsThemeStageMasters ({navigation,route}) {

  const { width: windowWidth } = useWindowDimensions();
  const ignoredDomTags = ['o:p','v:shape','v:shapetype','u1:p','font','color'];

  // liste des categories
const {item} = route.params;
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const [MonTheme, setMonTheme] = useState([]);
const [error, setError] = useState(null);
const [user, setUser] = useContext(GlobalContext);
const [stagiaire, setStagiaire] = useContext(StagiaireContext);



const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getChoixThemeStage(); // Appeler la fonction de récupération des données
    setRefreshing(false); // Indiquer que le rafraîchissement est terminé
  };
  const [expandedItems, setExpandedItems] = useState([]);
  


  const toggleItem = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  useEffect(()=>{
    navigation.setOptions({title: item.nom_prenom});
    getChoixThemeStage();
    getMonThemeStage(); 
    setStagiaire(item.code_stagiaire);
    
},[])


// liste
const getChoixThemeStage = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/data/liste-theme-filiere.php?filiere=${item.code_filiere}`, {
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

// affichage du theme
const getMonThemeStage = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/masters/mon-theme-stage.php?code=${item.code_stagiaire}`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setMonTheme(newData);
} catch (error) {
  setError(error);
}

}

  // validation
  const ValidationThemeStage = (param1) =>{

		fetch(`https://adores.tech/api/masters/validation-theme-stage.php?code=${item.code_stagiaire}&theme_stage=${param1} `,{
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

  // in
  
  // In des mobile money
  // api recherche
  const [searchTerm, setSearchTerm] = useState('');
  const searchItems = useMemo(() => {
    return () => {
    const filteredData = data.filter(item =>
      item.titre_theme.toLowerCase().includes(searchTerm.toLowerCase())  
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


     <View style={styles.experienceItem2}>
          <TouchableOpacity onPress={() => toggleItem(item.theme_stage)}>
            <Text style={styles.jobTitle}>Thème de stage actuel :</Text>
          </TouchableOpacity>
          {expandedItems.includes(item.theme_stage) && (
            <View>
            <Text style={styles.description}>
            {MonTheme.length > 0 ? MonTheme[0].titre_theme : "Aucun thème de stage"}
            </Text>

            <View style={{marginBottom:20}}></View>
          </View>
          )}
    </View>


      <FlatList
        data={searchTerm ? searchItems() : data}
        keyExtractor={item => item.code_theme}
        renderItem={({item}) => (
          <View style={styles.experienceItem}>
          <TouchableOpacity onPress={() => toggleItem(item.code_theme)}>
            <Text style={styles.jobTitle}>{item.titre_theme}</Text>
          </TouchableOpacity>
          {expandedItems.includes(item.code_theme) && (
            <View>
            
            <HTML source={{ html: item.description_theme ? item.description_theme : "Pas de description" }} contentWidth={windowWidth} ignoredDomTags={ignoredDomTags}/>
            <View style={{marginBottom:20}}></View>
            <TouchableOpacity
            style={styles.followButton} onPress={() => {
              ValidationThemeStage(item.code_theme);
            }}>
            <Text style={styles.followButtonText}>
              Valider
            </Text>
          </TouchableOpacity>
          </View>
          )}
        </View>
      )}/>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  experienceItem: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding:12
  },
  experienceItem2: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3367D6',
    padding:12
  },
  jobTitle: {
    fontSize: 18,
    //fontWeight: 'bold',
    //textAlign:'justify'
  },
  company: {
    fontSize: 16,
    color: 'gray',
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginTop:8
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
});


