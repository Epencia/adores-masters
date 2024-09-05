import React , {useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    image: 'account-group-outline',
    titre: 'UTILISATEURS',
    libelle: 'Voir la liste des utilisateurs',
    src : 'Liste des beneficiaires Masters'
  },
  {
    id: '2',
    image: 'account-multiple-plus-outline',
    titre: 'AMBASSADEURS',
    libelle: 'Voir la liste des ambassadeurs',
    src : 'Liste des ambassadeurs'
  },
  {
    id: '3',
    image: 'book-multiple-outline',
    titre: 'PUBLICATIONS',
    libelle: 'Créer et voir les publications',
    src : 'Nouvelle publicite'
  },
  {
    id: '4',
    image: 'credit-card-outline',
    titre: 'COMPTE',
    libelle: 'Consulter votre solde',
    src : 'Menu compte'
  },
  {
    id: '5',
    image: 'card-account-details-star-outline',
    titre: 'EPARGNES',
    libelle: 'Voir toutes les epargnes',
    src : 'Liste utilisateurs epargne'
  },
  {
    id: '6',
    image: 'account-outline',
    titre: 'PROFIL',
    libelle: 'Voir votre profil utilisateur',
    src : 'Profil'
  },
  {
    id: '7',
    image: 'clipboard-list-outline',
    titre: 'CATALOGUE',
    libelle: "Voir les secteurs d'activités",
    src : 'Catalogue'
  },
  {
    id: '8',
    image: 'handshake-outline',
    titre: 'PARTENAIRES',
    libelle: 'Voir la liste des entreprises',
    src : 'Partenaires'
  },
  {
    id: '9',
    image: 'bag-personal-outline',
    titre: 'PRODUITS',
    libelle: 'Voir la liste des biens et services',
    src : 'Prestations'
  },

];

export default function MenuServicesMasters({navigation}) {

  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.titre.toLowerCase().includes(searchText.toLowerCase())||
    item.libelle.toLowerCase().includes(searchText.toLowerCase())   
  );


  useEffect(()=>{
    navigation.setOptions({ title: 'Menu services' });
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



