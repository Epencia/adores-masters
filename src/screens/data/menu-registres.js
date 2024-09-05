import React , {useEffect, useState, useContext, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,ActivityIndicator,TextInput,FlatList,Image
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const tabs = [
  { name: 'Coachs certifiés', icon: 'users' },
  { name: 'Ambassadeurs', icon: 'star' },
];

export default function MenuRegistres({navigation,item}) {

  const [value, setValue] = React.useState(0);

  // GENERAL
  const [DataUtilisateur, setDataUtilisateur] = useState([]);
  const [DataAmbassadeur, setDataAmbassadeur] = useState([]);


  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');

  const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    const [error1, setError1] = useState(null);
    const [error2, setError2] = useState(null);

    const [user, setUser] = useContext(GlobalContext);


  // api recherche
    
  const searchItems1 = useMemo(() => {
    return () => {
    const filteredData1 = DataUtilisateur.filter(item =>
      item.nom_prenom.toLowerCase().includes(searchTerm1.toLowerCase()) ||
      item.matricule.toLowerCase().includes(searchTerm1.toLowerCase())   
    );
    return filteredData1;
  };
  }, [DataUtilisateur, searchTerm1]);



  const searchItems2 = useMemo(() => {
    return () => {
    const filteredData2 = DataAmbassadeur.filter(item =>
      item.nom_prenom.toLowerCase().includes(searchTerm2.toLowerCase()) ||
      item.matricule.toLowerCase().includes(searchTerm2.toLowerCase())   
    );
    return filteredData2;
  };
  }, [DataAmbassadeur, searchTerm2]);


  // api recherche


  const [refreshing1, setRefreshing1] = useState(false);
  const handleRefresh1 = () => {
    setRefreshing1(true); // Indiquer que le rafraîchissement est en cours
    getListeUtilisateur(); // Appeler la fonction de récupération des données
    setRefreshing1(false); // Indiquer que le rafraîchissement est terminé
  };



  const [refreshing2, setRefreshing2] = useState(false);
  const handleRefresh2 = () => {
    setRefreshing2(true); // Indiquer que le rafraîchissement est en cours
    getListeAmbassadeur(); // Appeler la fonction de récupération des données
    setRefreshing2(false); // Indiquer que le rafraîchissement est terminé
  };
  

  
  useEffect(()=>{
      getListeAmbassadeur();
      navigation.setOptions({ title: 'Registres' });
       // Exécuter la fonction avec cache
     const delay = 60000; // Définir le délai à 1 minute
     getListeUtilisateur(); 
     // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
     const intervalId = setInterval(getListeUtilisateur2, delay);
     // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
     return () => clearInterval(intervalId);
  },[])
  
  // liste utilisateurs
  const getListeUtilisateur = async () => {
    setIsLoading1(true);
   try {
    const response = await fetch(`https://adores.tech/api/data/liste-beneficiaire.php?matricule=${user[0].matricule}`, {
      headers: {
        //'Cache-Control': 'no-cache',
      },
    });
    const newData = await response.json();
    setDataUtilisateur(newData);
   setIsLoading1(false);
  } catch (error) {
    setIsLoading1(false);
    setError1(error);
  }
  }
  // liste
  const getListeUtilisateur2 = async () => {
   try {
    const response = await fetch(`https://adores.tech/api/data/liste-beneficiaire.php?matricule=${user[0].matricule}`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    const newData = await response.json();
    setDataUtilisateur(newData);
  } catch (error) {
    setError1(error);
  }
  }


  // Liste abonne
  const getListeAmbassadeur = async () => {
    setIsLoading2(true);
   try {
    const response = await fetch(`https://adores.tech/api/data/liste-ambassadeur.php`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    const newData = await response.json();
    setDataAmbassadeur(newData);
   setIsLoading2(false);
  } catch (error) {
    setIsLoading2(false);
    setError2(error);
  }
  }





  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.tabs}>
          {tabs.map(({ name, icon }, index) => {
            const isActive = index === value;

            return (
              <View
                key={name}
                style={[
                  styles.tabWrapper,
                  isActive && { borderBottomColor: '#6366f1' },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    setValue(index);
                  }}>
                  <View style={styles.tab}>
                    <FeatherIcon
                      color={isActive ? '#6366f1' : '#6b7280'}
                      name={icon}
                      size={16}
                    />

                    <Text
                      style={[
                        styles.tabText,
                        isActive && { color: '#6366f1' },
                      ]}>
                      {name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
         {/* Section Utilisateurs */}
         {value === 0 && (

<View>
<View style={styles.searchBar}>
  <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
  <TextInput
    style={styles.input}
    placeholder="Rechercher..."
    onChangeText={text => setSearchTerm1(text)}
    value={searchTerm1}
  />
</View>
        
             <FlatList
               data={searchTerm1 ? searchItems1() : DataUtilisateur}
               keyExtractor={(item) => item.id}
               renderItem={({item}) => (
                 <View style={styles.userContainer}>
         
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
                 </View>
                 <TouchableOpacity
                     style={styles.followButton} onPress={() => navigation.navigate('Messages',{item})}>
           
                     <Text style={styles.followButtonText}>
                       Message
                     </Text>
                   </TouchableOpacity>
               </View>
               )}
               ListEmptyComponent={() => (
                // Gestion de l'indicateur de chargement et des erreurs
                <View style={styles.emptyListContainer}>
  {isLoading1 ? (
    <ActivityIndicator size="large" color="#6366f1" />
  ) : error1 ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <MaterialCommunityIcons color="#266EF1" name="access-point-off" size={150}/>
        <Text style={{ fontSize: 18,marginRight:10,marginLeft:10,marginBottom:10}}>
        Pas de connexion internet !
        </Text>
      <TouchableOpacity onPress={handleRefresh1} style={{ backgroundColor: '#0099cc', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Réessayer</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <Text style={styles.emptyText}>Aucune donnée disponible.</Text>
  )}
</View>

              )}
               />
          </View>
)}
         {/* Section Ambassadeurs */}
         {value === 1 && (
          <View>
          <View style={styles.searchBar}>
            <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Rechercher..."
              onChangeText={text => setSearchTerm2(text)}
              value={searchTerm2}
            />
          </View>

               <FlatList
                 data={searchTerm2 ? searchItems2() : DataAmbassadeur}
                 keyExtractor={(item) => item.id}
                 renderItem={({item}) => (
                   <View style={styles.userContainer}>
           
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
                     <Text style={styles.userCode}>{item.ville_localite} ({item.pays_localite})</Text>
                   </View>
                   <TouchableOpacity
                     style={styles.followButton}  onPress={() => navigation.navigate('Choix formule',{item})}>
           
                     <Text style={styles.followButtonText}>
                       Souscrire
                     </Text>
                   </TouchableOpacity>
                 </View>
                 )}
                 ListEmptyComponent={() => (
                  // Gestion de l'indicateur de chargement et des erreurs
                  <View style={styles.emptyListContainer}>
                  {isLoading2 ? (
                    <ActivityIndicator size="large" color="#6366f1" />
                  ) : error2 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                      <MaterialCommunityIcons color="#266EF1" name="access-point-off" size={150}/>
        <Text style={{ fontSize: 18,marginRight:10,marginLeft:10,marginBottom:10}}>
        Pas de connexion internet !
        </Text>
                      <TouchableOpacity onPress={handleRefresh2} style={{ backgroundColor: '#0099cc', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Réessayer</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text style={styles.emptyText}>Aucune donnée disponible.</Text>
                  )}
                </View>
                )}
                 />
          </View>
)}



      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 1,
    paddingHorizontal: 12,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom:12
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  tabWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: '#e5e7eb',
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 5,
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
  followButton2: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width:90,
    marginBottom: 8, // Espacement entre les boutons
  },
  followingButton: {
    backgroundColor: '#ccc',
  },
  followButtonText: {
    color: 'white',
    fontSize:12
  },
  followButtonText2: {
    color: 'white',
    fontSize:12
  },
  followingButtonText: {
    color: '#333',
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'column', // Pour afficher les boutons en colonne
    alignItems: 'center', // Pour centrer les boutons horizontalement
  },
  rejectButton: {
    backgroundColor: 'gray', // Couleur pour le bouton "Refuser"
  },
});