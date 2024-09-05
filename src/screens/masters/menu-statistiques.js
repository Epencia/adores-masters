import React , {useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function MenuStatistiquesMasters({navigation}) {

  const [searchText, setSearchText] = useState('');

  const [NombreCompte, setNombreCompte] = useState([]);
  const [NombreDemandeAttente, setNombreDemandeAttente] = useState([]);
  const [NombreDemandeEncours, setNombreDemandeEncours] = useState([]);
  const [NombreDemandeActif, setNombreDemandeActif] = useState([]);
  const [NombreDemandeInactif, setNombreDemandeInactif] = useState([]);
  const [NombreSansTheme, setNombreSansTheme] = useState([]);
  const [NombreSansMaitre, setNombreSansMaitre] = useState([]);
  const [NombreFormation, setNombreFormation] = useState([]);
  const [NombreCertificat, setNombreCertificat] = useState([]);
  const [NombreSoutenanceActif, setNombreSoutenanceActif] = useState([]);
  const [NombreSoutenanceEncours, setNombreSoutenanceEncours] = useState([]);
  const [NombreSoutenanceInactif, setNombreSoutenanceInactif] = useState([]);
  const [NombreCycle, setNombreCycle] = useState([]);
  const [NombreFiliere, setNombreFiliere] = useState([]);
  // autres
  const [NombreProduit, setNombreProduit] = useState([]);
  const [NombreCategorie, setNombreCategorie] = useState([]);
  const [NombreCategorieFormation, setNombreCategorieFormation] = useState([]);
  const [NombreCommande, setNombreCommande] = useState([]);
  const [NombreTransaction, setNombreTransaction] = useState([]);
  const [NombrePassword, setNombrePassword] = useState([]);


  useEffect(()=>{
    // nouveau
    getNombreDemandeAttente();
    getNombreDemandeEncours();
    getNombreDemandeActif();
    getNombreDemandeInactif();
    getNombreSansTheme();
    getNombreSansMaitre();
    getNombreFormation();
    getNombreCertificat();
    getNombreCompte();
    getNombreSoutenanceActif();
    getNombreSoutenanceEncours();
    getNombreSoutenanceInactif();
    getNombreCycle();
    getNombreFiliere();
    getNombreCategorie();
    getNombreCategorieFormation();
    getNombreProduit();
    getNombreCommande();
    getNombreTransaction();
    getNombreCommande();
    getNombreFiliere();
    getNombrePassword();

    navigation.setOptions({title: 'Statistiques'});

  },[])

// data
const data = [
    {
      id: '1',
      image: 'account-outline',
      titre: 'DEMANDES EN ATTENTE',
      label: 'Liste des demandes de stage en attente',
      libelle: NombreDemandeAttente,
      src : 'Demandes de stage en attente Masters'
    },
    {
      id: '2',
      image: 'account-outline',
      titre: 'STAGIAIRES EN COURS',
      label: 'Liste des stagiaires actuellement en stage',
      libelle: NombreDemandeEncours,
      src : 'Demandes de stage en cours Masters'
    },
    {
      id: '3',
      image: 'account-outline',
      titre: 'STAGIAIRES VALIDÉS',
      label: 'Liste des stagiaires ayant validé ou terminé le stage',
      libelle: NombreDemandeActif,
      src : 'Demandes de stage actif Masters'
    },
    {
      id: '4',
      image: 'account-outline',
      titre: 'DEMANDES REJETÉES',
      label: 'Liste des demandes de stage rejétées ou annulées',
      libelle: NombreDemandeInactif,
      src : 'Demandes de stage inactif Masters'
    },
    {
      id: '5',
      image: 'account-outline',
      titre: 'SANS THÈME DE STAGE',
      label: "Liste des stagiaires n'ayant pas de thème de stage",
      libelle: NombreSansTheme,
      src : 'Stagiaires sans theme Masters'
    },
    {
      id: '6',
      image: 'account-outline',
      titre: 'SANS MAÎTRE DE STAGE',
      label: "Liste des stagiaires n'ayant pas de maître de stage",
      libelle: NombreSansMaitre,
      src : 'Stagiaires sans maitre Masters'
    },
    {
      id: '7',
      image: 'account-outline',
      titre: 'SOUTENANCE VALIDÉE',
      label: 'Liste des stagiaires ayant déjà fini la soutenance',
      libelle: NombreSoutenanceActif,
      src : 'Soutenance Actif Masters'
    },
    {
      id: '8',
      image: 'account-outline',
      titre: 'SOUTENANCE AUTORISÉE',
      label: 'Liste des stagiaires autorisés à la soutenance',
      libelle: NombreSoutenanceEncours,
      src : 'Soutenance Encours Masters'
    },
    {
      id: '9',
      image: 'account-outline',
      titre: 'SOUTENANCE EN ATTENTE',
      label: "Liste des stagiaires n'ayant pas encore soutenus",
      libelle: NombreSoutenanceInactif,
      src : 'Soutenance Inactif Masters'
    },
    {
      id: '10',
      image: 'account-outline',
      titre: 'NOMBRE DE FORMATIONS',
      label: "Liste complète des formations actives dispensées",
      libelle: NombreFormation,
      src : 'Formations Masters'
    },
    {
      id: '11',
      image: 'account-outline',
      titre: 'NOMBRE DE CERTIFICATS',
      label: "Liste complète des certificats délivrés aux auditeurs",
      libelle: NombreCertificat,
      src : 'Certificats Masters'
    },
    {
      id: '12',
      image: 'account-outline',
      titre: 'COMPTES CERTIFIÉS',
      label: "Liste complète des comptes certifiés aux différentes formules",
      libelle: NombreCompte,
      src : 'Formules Masters'
    },
    {
      id: '13',
      image: 'account-outline',
      titre: 'NOMBRE DE CYCLES',
      label: "Liste des cycles d'etudes",
      libelle: NombreCycle,
      src : 'Liste Cycle Statistique'
    },
    {
      id: '14',
      image: 'account-outline',
      titre: 'NOMBRE DE FILIÈRES',
      label: "Liste des filières",
      libelle: NombreFiliere,
      src : 'Liste Filiere Statistique'
    },
    {
      id: '15',
      image: 'account-outline',
      titre: 'CATÉGORIES DE FORMATIONS',
      label: "Liste des catégories de formations",
      libelle: NombreCategorieFormation,
      src : 'Categorie Formations'
    },
    {
      id: '16',
      image: 'account-outline',
      titre: 'CATÉGORIES DE PRODUITS',
      label: "Liste des catégories de produits",
      libelle: NombreCategorie,
      src : 'Catalogue'
    },
    {
      id: '17',
      image: 'account-outline',
      titre: 'NOMBRE DE PRODUITS',
      label: "Liste des produits des partenaires",
      libelle: NombreProduit,
      src : 'Prestations'
    },
    {
      id: '18',
      image: 'account-outline',
      titre: 'NOMBRE DE COMMANDES',
      label: "Liste des commandes effectuées",
      libelle: NombreCommande,
      src : 'Liste Commande Statistique'
    },
    {
      id: '19',
      image: 'account-outline',
      titre: 'NOMBRE DE TRANSACTIONS',
      label: "Liste des transactions effectuées",
      libelle: NombreTransaction,
      src : 'Liste Transaction Statistique'
    },
    {
      id: '20',
      image: 'account-outline',
      titre: 'ACCÈS NON SÉCURISÉS',
      label: "Liste des mots de passe non sécurisés",
      libelle: NombrePassword,
      src : 'Liste Password Statistique'
    },
  ];

  // recherche
  const filteredData = data.filter((item) =>
  item.titre.toLowerCase().includes(searchText.toLowerCase())||
  (item.libelle.toString().toLowerCase().includes(searchText.toLowerCase()))  
);



        // nombre de demande de stage actif

    const getNombreDemandeAttente = () =>{

      fetch(`https://adores.tech/api/masters/nombre-demande-stage-attente.php`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreDemandeAttente(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
    
      }


        // nombre de demande de stage actif

    const getNombreDemandeEncours = () =>{

      fetch(`https://adores.tech/api/masters/nombre-demande-stage-encours.php`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreDemandeEncours(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
    
      }

           // nombre de demande de stage actif

    const getNombreDemandeActif = () =>{

      fetch(`https://adores.tech/api/masters/nombre-demande-stage-actif.php`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreDemandeActif(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
    
      }

           // nombre de demande de stage

    const getNombreDemandeInactif = () =>{

      fetch(`https://adores.tech/api/masters/nombre-demande-stage-inactif.php`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreDemandeInactif(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
    
      }

      // nombre de stagiaires n'ayant pas de theme de stage
      
    const getNombreSansTheme = () =>{

      fetch(`https://adores.tech/api/masters/nombre-stagiaire-sans-theme.php`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreSansTheme(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
    
      }

// nombre de stagiaires n'ayant pas de maitre de stage
      
const getNombreSansMaitre = () =>{

fetch(`https://adores.tech/api/masters/nombre-stagiaire-sans-maitre.php`,{
  method:'post',
    header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    
})
.then((response) => response.json())
 .then(
     (result)=>{
      setNombreSansMaitre(result);
      }
 )
 .catch((error)=>{
  alert(error);
 });

}

// total formation
const getNombreFormation = () =>{

  fetch(`https://adores.tech/api/masters/nombre-formation.php`,{
    method:'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
  })
  .then((response) => response.json())
   .then(
       (result)=>{
        setNombreFormation(result);
        }
   )
   .catch((error)=>{
    alert(error);
   });
  }

    // total formation
const getNombreCertificat = () =>{

  fetch(`https://adores.tech/api/masters/nombre-certificat.php`,{
    method:'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
  })
  .then((response) => response.json())
   .then(
       (result)=>{
        setNombreCertificat(result);
        }
   )
   .catch((error)=>{
    alert(error);
   });
  }

  // comptes certifiés
  const getNombreCompte = () =>{

    fetch(`https://adores.tech/api/masters/nombre-compte-certifie.php`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombreCompte(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
    }

     // Soutenance actif
  const getNombreSoutenanceActif = () =>{

    fetch(`https://adores.tech/api/masters/nombre-soutenance-actif.php`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombreSoutenanceActif(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
    }

        // Soutenance inactif
  const getNombreSoutenanceInactif = () =>{

    fetch(`https://adores.tech/api/masters/nombre-soutenance-attente.php`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombreSoutenanceInactif(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
    }

        // Soutenance actif
  const getNombreSoutenanceEncours = () =>{

    fetch(`https://adores.tech/api/masters/nombre-soutenance-encours.php`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombreSoutenanceEncours(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
    }

    
              // cycle
    const getNombreCycle = () =>{

      fetch(`https://adores.tech/api/masters/nombre-cycle.php`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreCycle(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
      }

              // Filiere
    const getNombreFiliere = () =>{

      fetch(`https://adores.tech/api/masters/nombre-filiere.php`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreFiliere(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
      }

      // categorie
      const getNombreCategorieFormation = () =>{

        fetch(`https://adores.tech/api/masters/nombre-formation-categorie.php`,{
          method:'post',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
        .then((response) => response.json())
         .then(
             (result)=>{
              setNombreCategorieFormation(result);
              }
         )
         .catch((error)=>{
          alert(error);
         });
        }

      // categorie
      const getNombreCategorie = () =>{

        fetch(`https://adores.tech/api/masters/nombre-categorie.php`,{
          method:'post',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
        .then((response) => response.json())
         .then(
             (result)=>{
              setNombreCategorie(result);
              }
         )
         .catch((error)=>{
          alert(error);
         });
        }

        // produit
        const getNombreProduit = () =>{

          fetch(`https://adores.tech/api/masters/nombre-prestation.php`,{
            method:'post',
              header:{
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
              },
          })
          .then((response) => response.json())
           .then(
               (result)=>{
                setNombreProduit(result);
                }
           )
           .catch((error)=>{
            alert(error);
           });
          }

          // commandes
          const getNombreCommande = () =>{

            fetch(`https://adores.tech/api/masters/nombre-commande.php`,{
              method:'post',
                header:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
            })
            .then((response) => response.json())
             .then(
                 (result)=>{
                  setNombreCommande(result);
                  }
             )
             .catch((error)=>{
              alert(error);
             });
            }

            // transactions
            const getNombreTransaction = () =>{

              fetch(`https://adores.tech/api/masters/nombre-transaction.php`,{
                method:'post',
                  header:{
                      'Accept': 'application/json',
                      'Content-type': 'application/json'
                  },
              })
              .then((response) => response.json())
               .then(
                   (result)=>{
                    setNombreTransaction(result);
                    }
               )
               .catch((error)=>{
                alert(error);
               });
              }

              //password
              const getNombrePassword = () =>{

                fetch(`https://adores.tech/api/masters/nombre-password.php`,{
                  method:'post',
                    header:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                })
                .then((response) => response.json())
                 .then(
                     (result)=>{
                      setNombrePassword(result);
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



