import React , {useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    image: 'credit-card-outline',
    titre: 'GESTION DU COMPTE',
    libelle: "Suivre l'activité de son compte",
    src : 'Menu compte'
  },
  {
    id: '2',
    image: 'account-outline',
    titre: 'GESTION DU PROFIL',
    libelle: 'Voir votre profil utilisateur',
    src : 'Profil'
  },
  {
    id: '3',
    image: 'book-multiple-outline',
    titre: 'JOURNAL OFFICIEL',
    libelle: 'Voir les publications',
    src : 'Liste publicite'
  },
  {
    id: '4',
    image: 'account-multiple-plus-outline',
    titre: 'AMBASSADEURS',
    libelle: 'Voir la liste des ambassadeurs',
    src : 'Liste des ambassadeurs'
  },
  {
    id: '5',
    image: 'account-group-outline',
    titre: 'COACHS CERTIFIÉS',
    libelle: 'Voir la liste des coachs agrées',
    src : 'Liste des utilisateurs'
  },
  {
    id: '6',
    image: 'account-cash-outline',
    titre: 'DÉPOT DES FONDS',
    libelle: 'Déposer des fonds',
    src : 'Moyens de rechargement'
  },
  {
    id: '7',
    image: 'cash',
    titre: 'RETRAIT DES FONDS',
    libelle: 'Rétirer des fonds',
    src : 'Retrait'
  },
  {
    id: '8',
    image: 'bank-outline',
    titre: 'TRANSFERT DES FONDS',
    libelle: 'Envoyer des fonds',
    src : 'Transfert'
  },
  {
    id: '9',
    image: 'card-account-details-star-outline',
    titre: 'SERVICES EPARGNES',
    libelle: 'Voir toutes vos epargnes',
    src : 'Epargnes'
  },
  {
    id: '10',
    image: 'card-account-details-outline',
    titre: 'TRANSACTIONS',
    libelle: 'Voir toutes vos transactions',
    src : 'Transactions'
  },
  {
    id: '11',
    image: 'account-check-outline',
    titre: 'COMPTES CERTIFIÉS',
    libelle: 'Suivre la certification des comptes',
    src : 'Comptes certifies'
  },
  {
    id: '12',
    image: 'handshake-outline',
    titre: "AGENCES D'EMPLOI",
    libelle: "Découvrir les plateformes de l'emploi",
    src : 'Liste Plateforme'
  },
  {
    id: '13',
    image: 'download-outline',
    titre: 'TÉLÉCHARGEMENTS',
    libelle: 'Télécharger tous les documents',
    src : 'Telechargement'
  },
  {
    id: '14',
    image: 'cog-outline',
    titre: 'PARAMÈTRES',
    libelle: 'Voir les paramètres',
    src : 'Parametres Mobiles'
  },

];

export default function MenuServices({navigation}) {

  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.titre.toLowerCase().includes(searchText.toLowerCase())||
    item.libelle.toLowerCase().includes(searchText.toLowerCase())   
  );


  useEffect(()=>{
    navigation.setOptions({ title: 'Services' });
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



