import React , {useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    image: 'web',
    titre: 'SITE INTERNET',
    libelle: 'Explorer notre site internet',
    src : 'Site internet'
  },
  {
    id: '2',
    image: 'book-outline',
    titre: 'COLLÈGES & LYCÉES',
    libelle: 'Voir les cours et les exercices',
    src : 'Liste classe'
  },
  {
    id: '3',
    image: 'pencil-outline',
    titre: 'SUJETS & CORRIGÉS',
    libelle: 'Voir les sujets et leurs corrigés',
    src : 'Filieres BTS'
  },
  {
    id: '4',
    image: 'home-outline',
    titre: 'COURS À DOMICILE',
    libelle: 'Découvrir les répétiteurs disponibles',
    src : 'Liste niveau'
  },
  {
    id: '5',
    image: 'hospital',
    titre: 'PRISES EN CHARGES',
    libelle: 'Obtenir des prises en charge',
    src : 'Prise en charge'
  },
  {
    id: '7',
    image: 'video-outline',
    titre: 'TUTORIELS',
    libelle: 'Apprendre à utiliser nos plateformes',
    src : 'Tutoriels'
  },
  {
    id: '8',
    image: 'school-outline',
    titre: 'ÉCOLES & CABINETS',
    libelle: 'Voir les écoles & cabinets partenaires',
    src : 'Ecoles & cabinets'
  }, 
  {
    id: '9',
    image: 'handshake-outline',
    titre: "AGENCES D'EMPLOI",
    libelle: "Découvrir les plateformes de l'emploi",
    src : 'Liste Plateforme'
  },
  {
    id: '10',
    image: 'notebook-outline',
    titre: 'RÈGLEMENT INTÉRIEUR',
    libelle: 'Voir le règlement intérieur',
    src : 'Règlement interieur'
  },
  {
    id: '11',
    image: 'file-search-outline',
    titre: 'FOIRE AUX QUESTIONS',
    libelle: 'Voir les réponses à vos questions',
    src : 'Foires aux questions'
  },
  {
    id: '12',
    image: 'book-education-outline',
    titre: 'REGISTRE DES STAGIAIRES',
    libelle: 'Vérifier une attestation de stage',
    src : 'Registre des stagiaires'
  },
  {
    id: '13',
    image: 'book-education-outline',
    titre: 'REGISTRE DES FORMATIONS',
    libelle: 'Vérifier un certificat professionnel',
    src : 'Registre des formations'
  }, 

];

export default function MenuGeneral({navigation}) {

  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.titre.toLowerCase().includes(searchText.toLowerCase())||
    item.libelle.toLowerCase().includes(searchText.toLowerCase())   
  );


  useEffect(()=>{
    navigation.setOptions({ title: 'En savoir plus...' });
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



