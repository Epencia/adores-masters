import React , {useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function MenuComptabiliteMasters({navigation}) {

  const [searchText, setSearchText] = useState('');

  const [NombreSolde, setNombreSolde] = useState([]);
  const [NombreEpargne, setNombreEpargne] = useState([]);
  const [NombrePaiement, setNombrePaiement] = useState([]);
  const [NombreCreance, setNombreCreance] = useState([]);
  const [NombreMaitre, setNombreMaitre] = useState([]);
  const [NombreRelance, setNombreRelance] = useState([]);
  const [NombreDepense, setNombreDepense] = useState([]);
  const [NombreCaisse, setNombreCaisse] = useState([]);



  useEffect(()=>{
    // nouveau
    getNombreSolde();
    getNombreEpargne();
    getNombrePaiement();
    getNombreCreance();
    getNombreMaitre();
    getNombreRelance();
    getNombreDepense();
    getNombreCaisse();

    navigation.setOptions({title: 'Comptabilité'});

  },[])

// data
const data = [
    {
      id: '1',
      image: 'card-account-details-star-outline',
      titre: 'RÉSUMÉ DES SOLDES',
      label: "Liste des comptes principaux avec un solde supérieur à 0",
      libelle: NombreSolde,
      src : 'Resume Solde Masters'
    },
    {
      id: '2',
      image: 'card-account-details-star-outline',
      titre: 'RÉSUMÉ DES EPARGNES',
      label: "Liste des comptes epargnes avec un solde supérieur à 0",
      libelle: NombreEpargne,
      src : 'Resume Epargne Masters'
    },
    {
      id: '3',
      image: 'card-account-details-star-outline',
      titre: 'RÉSUMÉ DES PAIEMENTS',
      label: "Liste des paiements effectués",
      libelle: NombrePaiement,
      src : 'Resume Paiement Masters'
    },
    {
      id: '4',
      image: 'card-account-details-star-outline',
      titre: 'RÉSUMÉ DES CRÉANCES',
      label: "Liste des paiements restants",
      libelle: NombreCreance,
      src : 'Resume Creance Masters'
    },
    {
      id: '5',
      image: 'card-account-details-star-outline',
      titre: 'RÉSUMÉ DES ENCADRANTS',
      label: "Liste des paiements des stagiaires par maitres de stage",
      libelle: NombreMaitre,
      src : 'Resume Encadrant Masters'
    },
    {
      id: '6',
      image: 'card-account-details-star-outline',
      titre: 'RÉSUMÉ DES RELANCES',
      label: "Liste des stagiaires n'ayant pas encore effectué des versements",
      libelle: NombreRelance,
      src : 'Resume Relance Masters'
    },
    {
      id: '7',
      image: 'card-account-details-star-outline',
      titre: 'RÉSUMÉ DES CHARGES',
      label: "Liste des dépenses effectuées",
      libelle: NombreDepense,
      src : 'Resume Depense Masters'
    },
    {
      id: '8',
      image: 'card-account-details-star-outline',
      titre: 'RÉSUMÉ DE CAISSE',
      label: "Liste des avances et restes des paiements",
      libelle: NombreCaisse,
      src : 'Resume Caisse Masters'
    },
  ];

  // recherche
  const filteredData = data.filter((item) =>
  item.titre.toLowerCase().includes(searchText.toLowerCase())||
  (item.libelle.toString().toLowerCase().includes(searchText.toLowerCase()))  
);


    // Solde non vide
    const getNombreSolde = () =>{

      fetch(`https://adores.tech/api/masters/nombre-solde-utilisateur.php`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreSolde(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
      }

        // Epargne non vide
    const getNombreEpargne = () =>{

      fetch(`https://adores.tech/api/masters/nombre-solde-epargne.php`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreEpargne(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
      }

      // Paiement
    const getNombrePaiement = () =>{

      fetch(`https://adores.tech/api/masters/nombre-paiement.php`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombrePaiement(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
      }


      // Creance
    const getNombreCreance = () =>{

      fetch(`https://adores.tech/api/masters/nombre-creance.php`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreCreance(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
      }

      // maitre
      const getNombreMaitre = () =>{

        fetch(`https://adores.tech/api/masters/nombre-maitre-stage.php`,{
          method:'post',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
        .then((response) => response.json())
         .then(
             (result)=>{
              setNombreMaitre(result);
              }
         )
         .catch((error)=>{
          alert(error);
         });
        }

        // relance
        const getNombreRelance = () =>{

          fetch(`https://adores.tech/api/masters/nombre-relance.php`,{
            method:'post',
              header:{
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
              },
          })
          .then((response) => response.json())
           .then(
               (result)=>{
                setNombreRelance(result);
                }
           )
           .catch((error)=>{
            alert(error);
           });
          }

// depense
      const getNombreDepense = () =>{

        fetch(`https://adores.tech/api/masters/nombre-depense.php`,{
          method:'post',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
        .then((response) => response.json())
         .then(
             (result)=>{
              setNombreDepense(result);
              }
         )
         .catch((error)=>{
          alert(error);
         });
        }

        // caisse
      const getNombreCaisse = () =>{

        fetch(`https://adores.tech/api/masters/nombre-caisse.php`,{
          method:'post',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
        .then((response) => response.json())
         .then(
             (result)=>{
              setNombreCaisse(result);
              }
         )
         .catch((error)=>{
          alert(error);
         });
        }


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
              <Text style={styles.dataText}>{item.label}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText2}>{item.libelle}</Text>
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
  dataText2: {
    fontSize: 14,
    color: 'gray',
    fontWeight:'bold'
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



