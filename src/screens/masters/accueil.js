import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Image,
  StatusBar
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalContext } from '../../global/GlobalState';
import { useHeaderHeight } from '@react-navigation/elements';

const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);
const screenHeight = Dimensions.get("window").height; // Récupérez la hauteur de l'écran

export default function DashboardMasters({navigation}) {

    const headerHeight = useHeaderHeight();
  // Calculer la hauteur restante
  const remainingHeight = screenHeight - headerHeight + StatusBar.currentHeight;

    const [user, setUser] = useContext(GlobalContext);
    const [count, setCount] = useState([]);
    const [nombre, setNombre] = useState([]);

    const [NombreBeneficiaire, setNombreBeneficiaire] = useState([]);
    const [NombreStagiaire, setNombreStagiaire] = useState([]);
    const [NombreCertificat, setNombreCertificat] = useState([]);


    useEffect(()=>{
      // mesure de securite
       if (user) {
        if (user[0].role !== 'Superviseur' && user[0].role !== 'Administrateur' && user[0].role !== 'Assistant') {
          setUser(null);
          navigation.navigate('Bienvenue');
        }
      }
      // nouveau
      getNombreStagiaire();
      getNombreBeneficiaire();
      getNombreCertificat();


    const updateData = () => {
      getNombreNotification();
      getNombreMessage();
    };
    updateData(); // Appeler la fonction immédiatement au montage
    const intervalId = setInterval(updateData, 1000);
    return () => clearInterval(intervalId);
    },[])
  
  
 

  // Notification debut
  const getNombreNotification = () =>{

    fetch(`https://adores.tech/api/masters/nombre-notification.php?id=${user[0].id}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setCount(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
  
    }

  // fin notification
    // messages
    const getNombreMessage = () =>{

      fetch(`https://adores.tech/api/data/nombre-message.php?id=${user[0].id}`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombre(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
      }

  // nombre de beneficiaires
  const getNombreBeneficiaire = () =>{

    fetch(`https://adores.tech/api/masters/nombre-beneficiaire.php`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombreBeneficiaire(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
  
    }

    // nombre de stagiaires
    const getNombreStagiaire = () =>{

      fetch(`https://adores.tech/api/masters/nombre-stagiaire.php`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreStagiaire(result);
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



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', minHeight: remainingHeight }}>

<StatusBar backgroundColor="white" barStyle="dark-content" />

        <ScrollView>

      <View style={styles.container}>
        <View style={styles.header}>

        <View style={styles.headerAction}>
        <Image
alt=""
source={require('../../assets/logo2.png')}
style={styles.avatarImg2}
/>
</View>
<Text style={{color: '#414d63',fontSize: 20,fontWeight: 'bold',marginRight:60}}>Adorès</Text> 

    <View style={styles.headerAction}>
    <TouchableOpacity onPress={() => navigation.navigate('Menu compte')}>
    <Icon name="credit-card" size={24} color="#414d63" style={{marginRight: 15}} />
    </TouchableOpacity>
    </View>

    <View style={styles.headerAction}> 
    <TouchableOpacity onPress={() => navigation.navigate('Liste des messages')}>
    <Icon name="comment" size={24} color="#414d63" style={{marginRight: 15}} />
    {nombre > 0 && (
          <View
          style={{
            position: 'absolute',
            top: -5,
            right: 7,
            backgroundColor: 'red',
            borderRadius: 50,
            width: 15,
            height: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 8 }}>{nombre}</Text>
        </View>
        )}
    </TouchableOpacity>
    </View>
    
    <View style={styles.headerAction}>
    <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
    <Icon name="notifications" size={24} color="#414d63" style={{marginRight: 1}} />
    {count > 0 && (
          <View
          style={{
            position: 'absolute',
            top: -5,
            right: 8,
            backgroundColor: 'red',
            borderRadius: 50,
            width: 15,
            height: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 8 }}>{count}</Text>
        </View>
        )}
    </TouchableOpacity>
    </View>

       <View style={styles.headerAction}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Deconnexion')}>
              <Icon name="lock" size={24} color="#414d63" style={{marginRight: 1}} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profile}>
          <View style={styles.profileTop}>
            <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('Profil')}>
            {user[0].photo64 ? (
              <Image
                alt=""
                source={{ uri: `data:${user[0].type};base64,${user[0].photo64.toString('base64')}` }}
                style={styles.avatarImg}
              />
              ) : (
                <Image
                alt=""
                source={require("../../assets/images/user.jpg")}
                style={styles.avatarImg}
              />
              )}


              <View style={styles.avatarNotification} />
            </TouchableOpacity>

            <View style={styles.profileBody}>
              <Text style={styles.profileTitle} numberOfLines={2}>{user[0].nom_prenom}</Text>

              <Text style={styles.profileSubtitle}>
              {user[0].role}
                {' · '}
                <Text style={{ color: '#266EF1' }}>{user[0].matricule}</Text>
              </Text>
            </View>
          </View>

          <Text style={styles.profileDescription} numberOfLines={3}>
          {user[0].description}
          </Text>

  
        </View>

        <View style={styles.stats}>
          {[
            { label: 'Utilisateurs', value: NombreBeneficiaire,src:'Liste des beneficiaires Masters' },
            { label: 'Stagiaires', value: NombreStagiaire,src:'Liste des stagiaires Masters' },
            { label: 'Certificats', value: NombreCertificat,src:'Certificats Masters' },
          ].map(({ label, value,src }, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(src)}
              style={[styles.statsItem, index === 0 && { borderLeftWidth: 0 }]}>

              <Text style={styles.statsItemText}>{label}</Text>

              <Text style={styles.statsItemValue}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.btnGroup}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Menu stage Masters')}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText} numberOfLines={1}>Stages</Text>
            </View>
          </TouchableOpacity>
         
          <TouchableOpacity
            //onPress={() => sheet.current.open()}
            onPress={() => navigation.navigate('Menu services Masters')}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btn}>
              <Text style={styles.btnText} numberOfLines={1}>Services</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Liste utilisateurs epargne')}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText} numberOfLines={1}>Finances</Text>
            </View>
          </TouchableOpacity>
          
        </View>

        <View style={styles.list}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Menu principal</Text>
          </View>



          <ScrollView
            contentContainerStyle={styles.listContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {[
              {
                icon: 'certificate-outline',
                label: 'Menu stage',
                company: 'Cliquez-ici',
                jobType: 'Voir tous les onglets du menu',
                src: 'Menu stage Masters',

              },
              {
                icon: 'compass',
                label: 'Menu services',
                company: 'Cliquez-ici',
                jobType: 'Voir tous les onglets du menu',
                src: 'Menu services Masters',
              },

            ].map(({ icon, label, company, jobType, src }, index) => (
                
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(src)}>
                <View style={styles.card}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <MaterialCommunityIcons color="#000" name={icon} size={24}/>
                    </View>

                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{label}</Text>

                      <Text style={styles.cardSubtitle}>{company}</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>{jobType}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.list}>
          <View style={{marginBottom:10}}></View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Menu Statistiques Masters")}>
                <View style={styles.card2}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <MaterialCommunityIcons color="#000" name="account-tie" size={24}/>
                    </View>
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>Statistiques</Text>
                      <Text style={styles.cardSubtitle}>Cliquez-ici</Text>
                    </View>
                  </View>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>
                      Visualiser toutes les données statistiques</Text>
                  </View>
                </View>
              </TouchableOpacity>
        </View>


        <View style={styles.list}>
          <View style={{marginBottom:10}}></View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Menu Comptabilite Masters")}>
                <View style={styles.card2}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <MaterialCommunityIcons color="#000" name="card-account-details-star-outline" size={24}/>
                    </View>
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>Comptabilité</Text>
                      <Text style={styles.cardSubtitle}>Cliquez-ici</Text>
                    </View>
                  </View>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>
                      Visualiser toutes les données comptables</Text>
                  </View>
                </View>
              </TouchableOpacity>
        </View>


      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    paddingVertical: 18,
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -6,
    marginTop: 18,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: '#266EF1',
  },
  list: {
    marginTop: 18,
    marginHorizontal: -6,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    //shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    //shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 12,
    width: CARD_WIDTH,
  },
  card2: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    //marginHorizontal: 6,
    //shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    //shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 12,
    width: '100%',
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginBottom:40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSearch: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerSearchInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 40,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  headerSearchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#121a26',
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#778599',
  },
  profileDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: '#778599',
    textAlign: 'justify'
  },
  profileTags: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileTagsItem: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: '#266ef1',
    marginRight: 4,
  },
  stats: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 12,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  statsItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: 'rgba(189, 189, 189, 0.32)',
  },
  statsItemText: {
    fontSize: 14,
    //fontWeight: '500',
    lineHeight: 18,
    color: 'gray',
    marginBottom: 5,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#121a26',
  },
  btnText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#266EF1',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#266EF1',
    borderColor: '#266EF1',
  },
  btnPrimaryText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  listTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 22,
    color: '#121a26',
  },
  listAction: {
    fontSize: 14,
    //fontWeight: 'bold',
    lineHeight: 20,
    color: 'gray',
  },
  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: '#22C55E',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
  },
  cardBody: {
    paddingLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
    color: '#121a26',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    //fontWeight: 'bold',
    lineHeight: 18,
    color: 'gray',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cardFooterText: {
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 18,
    color: 'gray',
  },
  userContainer: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'center',
    marginBottom: 18,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    marginTop: 8,
    fontSize: 13,
    color: '#778599',
    //fontWeight: 'bold',
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
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  sheetHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sheetBody: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  done: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6a55',
  },
  radio: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 0,
    height: 44,
  },
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  radioLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
    marginLeft: 12,
    marginRight: 'auto',
  },
  avatarImg2: {
    width: 30,
    height: 30,
    borderRadius: 9999,
    borderWidth:1,
    borderColor:'gray'
  },
});