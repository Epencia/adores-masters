import {
  Dimensions,ImageBackground,ScrollView,StyleSheet,Text,TouchableOpacity,View, ActivityIndicator,StatusBar,TextInput
} from "react-native";
import React , {useEffect, useState, useContext } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import { GlobalContext } from '../global/GlobalState';
import FeatherIcon from 'react-native-vector-icons/Feather';


const screenHeight = Dimensions.get("window").height; // Récupérez la hauteur de l'écran
const { height } = Dimensions.get("window");



const WelcomeScreen = ({navigation}) => {

  const headerHeight = useHeaderHeight();
  // Calculer la hauteur restante
  const remainingHeight = screenHeight - headerHeight;
  const [user] = useContext(GlobalContext);

  useEffect(() => {
    navigation.setOptions({title: 'Bienvenue à Adorès'});
  }, []);


  return (
    <>
    <StatusBar backgroundColor="white" barStyle="dark-content" />
    <ScrollView contentContainerStyle={{flexGrow: 1,justifyContent: 'center',alignItems: 'center',minHeight: remainingHeight,backgroundColor: 'white'}}>
      
      <View style={{ backgroundColor: 'white'}}>


        <ImageBackground
          style={{
            height: height / 2.5,
          }}
          resizeMode="contain"
          source={require("../assets/images/welcome-img.png")}
        />
        <View
          style={{
            paddingHorizontal: 10 * 4,
            paddingTop: 10 * 4,
          }}
        >

               <Text
          //onPress={() => navigation.navigate('Exemple')}
          onPress={() => navigation.navigate('Menu general')}
            style={{
              fontSize: 34,
              color: "#1F41BB",
              //fontFamily: Font["poppins-bold"],
              textAlign: "center",
            }}
          >
            Cliquez-ici pour en savoir plus...
          </Text>
         
      
          <Text
            style={{
              fontSize: 14,
              color: "#000",
              //fontFamily: Font["poppins-regular"],
              textAlign: "center",
              marginTop: 10 * 2,
            }}
          >
            Découvrez notre réseau social professionnel en ligne : Stages, formations et emplois
          </Text>
        </View>


        <View
          style={{
            paddingHorizontal: 10 * 2,
            paddingTop: 10 * 4,
            flexDirection: "row",
          }}
        >
          
          <TouchableOpacity
          onPress={() => {
            if (user) {
              navigation.navigate('Menu Mobile');
            } else {
              navigation.navigate('Connexion');
            }
          }}
            style={{
              backgroundColor: "#1F41BB",
              paddingVertical: 10 * 1.5,
              paddingHorizontal: 10 * 2,
              width: "48%",
              borderRadius: 10,
              shadowColor: "#1F41BB",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              marginRight:15,
            }}
          >
            <Text
              style={{
                //fontFamily: Font["poppins-bold"],
                color: "#fff",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {user ? 'Accéder au menu' : 'Se connecter'}
            </Text>
          </TouchableOpacity>
          
           
          <TouchableOpacity
            //onPress={() => navigation.navigate('Exemple')}
            onPress={() => navigation.navigate('Inscription')}
            style={{
              backgroundColor: "#1F41BB",
              paddingVertical: 10 * 1.5,
              paddingHorizontal: 10 * 2,
              width: "48%",
              borderRadius: 10,
              
            }}
          >
            <Text
              style={{
                //fontFamily: Font["poppins-bold"],
                color: "#fff",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Ouvrir un compte
            </Text>
          </TouchableOpacity>
        </View>

        

      </View>
    </ScrollView>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: screenHeight,
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
});
