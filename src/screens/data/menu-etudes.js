import React , {useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    image: 'book-outline',
    titre: 'COLLÈGES & LYCÉES',
    libelle: 'Voir les cours et les exercices',
    src : 'Liste classe'
  },
  {
    id: '2',
    image: 'pencil-outline',
    titre: 'SUJETS & CORRIGÉS',
    libelle: 'Voir les sujets et leurs corrigés',
    src : 'Filieres BTS'
  },
  {
    id: '3',
    image: 'play-box-multiple-outline',
    titre: 'FORMATIONS CERTIFIANTES',
    libelle: 'Voir toutes les formations',
    src : 'Categorie Formations'
  },
  {
    id: '4',
    image: 'certificate-outline',
    titre: 'CERTIFICATS PROFESSIONNELS',
    libelle: 'Voir les certificats obtenus',
    src : 'Liste des souscriptions'
  },
  {
    id: '5',
    image: 'account-check-outline',
    titre: 'COMPTE RÉPÉTITEUR',
    libelle: 'Devenir un répétiteur agréé',
    src : 'Mes repetiteurs'
  },
  {
    id: '6',
    image: 'home-outline',
    titre: 'COURS À DOMICILE',
    libelle: 'Découvrir les répétiteurs disponibles',
    src : 'Liste niveau'
  },
  {
    id: '7',
    image: 'hospital',
    titre: 'PRISES EN CHARGES',
    libelle: 'Obtenir des prises en charge',
    src : 'Prise en charge'
  },

  {
    id: '8',
    image: 'video-outline',
    titre: 'TUTORIELS',
    libelle: 'Apprendre à utiliser nos plateformes',
    src : 'Tutoriels'
  },
  {
    id: '9',
    image: 'school-outline',
    titre: 'ÉCOLES & CABINETS',
    libelle: 'Voir les écoles & cabinets partenaires',
    src : 'Ecoles & cabinets'
  }, 
  {
    id: '10',
    image: 'book-education-outline',
    titre: 'REGISTRE DES FORMATIONS',
    libelle: 'Vérifier un certificat professionnel',
    src : 'Registre des formations'
  }, 

];

export default function MenuEtudes({navigation}) {

  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.titre.toLowerCase().includes(searchText.toLowerCase())||
    item.libelle.toLowerCase().includes(searchText.toLowerCase())   
  );


  useEffect(()=>{
    navigation.setOptions({ title: 'Etudes' });
},[])

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate(item.src)}>
          <View style={styles.cardIcon}>
                    <MaterialCommunityIcons color="#000" name={item.image} size={24}/>
                    </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.titre}</Text>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>{item.libelle}</Text>
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
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
    marginRight: 16,
  },
});



