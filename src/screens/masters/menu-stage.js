import React , {useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    image: 'account-tie-outline',
    titre: 'CYCLES ET FILIÈRES',
    libelle: 'Voir les cycles et filières',
    src : 'Liste des cycles Masters'
  },
  {
    id: '2',
    image: 'account-multiple-check-outline',
    titre: 'STAGIAIRES',
    libelle: 'Voir tous les stagiaires',
    src : 'Liste des stagiaires Masters'
  },
  {
    id: '3',
    image: 'notebook-outline',
    titre: 'RÈGLEMENT INTÉRIEUR',
    libelle: 'Voir le règlement intérieur',
    src : 'Règlement interieur'
  },
  {
    id: '4',
    image: 'account-arrow-right-outline',
    titre: 'TRANSFERT DE STAGIAIRE',
    libelle: 'Transférer vers un autre compte',
    src : 'Transfert de stagiaires Masters'
  },
  {
    id: '5',
    image: 'file-search-outline',
    titre: 'FOIRE AUX QUESTIONS',
    libelle: 'Voir les réponses à vos questions',
    src : 'Foires aux questions'
  },
  {
    id: '6',
    image: 'comment-outline',
    titre: 'MAÎTRES DE STAGE',
    libelle: 'Voir les chiffres sur les maitres de stage',
    src : 'Maitre de stage Masters'
  },
  {
    id: '7',
    image: 'file-document-edit-outline',
    titre: 'RÉDACTEUR DE MÉMOIRE',
    libelle: 'Soumettre sa rédaction à des experts',
    src : 'Liste des themes'
  },
  {
    id: '8',
    image: 'file-document-outline',
    titre: 'MÉMOIRES RÉDIGÉS',
    libelle: 'Voir la liste des mémoires rédigés',
    src : 'Liste des rapports'
  },
  {
    id: '9',
    image: 'play-box-multiple-outline',
    titre: 'FORMATIONS',
    libelle: 'Voir toutes les formations',
    src : 'Categorie Formations'
  },
];

export default function MenuStageMasters({navigation}) {

  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.titre.toLowerCase().includes(searchText.toLowerCase())||
    item.libelle.toLowerCase().includes(searchText.toLowerCase())   
  );

  useEffect(()=>{
    navigation.setOptions({ title: 'Menu stage' });
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



