import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,Linking
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';



export default function DetailsBeneficiaireMasters({navigation,route}) {

  const [value, setValue] = React.useState(0);
  const { item } = route.params;
  const [data, setData] = useState([]);

  useEffect(()=>{
    navigation.setOptions({title: item.nom_prenom});

  },[])

  // profil

    // autres

    const SECTIONS = [
      {
        header: 'Civilités',
        icon: 'settings',
        items: [
          { label: 'Matricule', value: item.matricule },
          { label: 'Nom et prénoms', value: item.nom_prenom},
          { label: 'Date de naissance', value: moment(item.date_naissance).format('DD-MM-YYYY')},
          { label: 'Lieu de naissance', value: item.lieu_naissance},
          { label: 'Sexe', value: item.sexe},
          { label: 'Nationalité', value: item.nationalite},
          { label: 'Solde', value: item.solde },
          
        ],
      },
      {
        header: 'Accès',
        icon: 'lock',
        items: [
          { label: 'Utilisateur', value: item.login },
          { label: 'Mot de passe', value: item.mdp },
          { label: 'Email', value: item.email },
          { label: 'Téléphone', value: item.telephone },
          { label: 'Etat', value: item.etat},
        ],
      },
      {
        header: 'Autres',
        icon: 'align-center',
        items: [
          { label: 'Rôle', value: item.role },
          { label: 'Profil', value: item.profil },
          { label: 'Profession', value: item.profession },
          { label: 'Ville', value: item.ville },
          { label: 'Adresse', value: item.adresse },
          { label: 'Raison sociale', value: item.raison_sociale },
        ],
      },
    ];

  const { tabs, items } = React.useMemo(() => {
    return {
      tabs: SECTIONS.map(({ header, icon }) => ({
        name: header,
        icon,
      })),
      items: SECTIONS[value].items,
    };
  }, [value]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
      

        <View style={styles.profile}>
          <TouchableOpacity style={styles.profileHeader} 
                            onPress={() => navigation.navigate('Profil Masters',{item})}>
          {item.photo64 ? (
            <Image
              alt=""
              source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}` }}
              style={styles.profileAvatar}
            />
            ) : (
                <Image
                source={require("../../assets/images/user.jpg")}
                         style={styles.profileAvatar}
                />
                )}

            <View style={styles.profileBody}>
              <Text style={styles.profileName}>{item.nom_prenom}</Text>

              <Text style={styles.profileHandle}>{item.telephone}</Text>
            </View>
          </TouchableOpacity>

      
        </View>

        <View style={styles.content}>
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

          {items.map(({ label, value }, index) => {
            return (
              <View
                key={label}
                style={[
                  styles.rowWrapper,
                  index === 0 && { borderTopWidth: 0 },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>{label}</Text>

                    <View style={styles.rowSpacer} />

                    <Text style={styles.rowValue}>{value}</Text>


                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.overlay}>
  <View style={styles.footer}>

    <TouchableOpacity
      onPress={()=>{Linking.openURL(`tel:${item.telephone}`);}}
      style={{ flex: 1 }}>
      <View style={styles.btnSecondary}>
        <MaterialCommunityIcons
          color="#fff"
          name="phone"
          size={25}
        />
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={()=>{Linking.openURL(`sms:${item.telephone}`);}}
      style={{ flex: 1, paddingHorizontal: 8 }}>
      <View style={styles.btnSecondary}>
        <MaterialCommunityIcons
          color="#fff"
          name="message-processing"
          size={25}
        />
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => navigation.navigate('Messages',{item})}
      style={{ flex: 1,  }}>
      <View style={styles.btnSecondary}>
        <MaterialCommunityIcons
          color="#fff"
          name="whatsapp"
          size={25}
        />
      </View>
    </TouchableOpacity>

  </View>
</View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  profile: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
    //borderTopWidth: 1,
    //borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 12,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3d3d3d',
  },
  profileHandle: {
    marginTop: 4,
    fontSize: 15,
    color: '#989898',
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  tabs: {
    padding: 16,
    flexDirection: 'row',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    paddingLeft: 24,
    paddingRight: 24,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2c2c2c',
    marginRight: 8,
  },
  rowValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#7f7f7f',
    marginRight: 4,
    marginLeft: 9,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  container: {
    paddingVertical: 24,
  },
  content: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  footer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderWidth: 1,
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
    height: 52,
    //marginRight:10
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
    height: 52,
    //marginRight:10
  },
  btnSecondaryText: {
    fontSize: 13,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
  },
  btnText: {
    fontSize: 13,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
  },
});