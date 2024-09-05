import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,ScrollView,
  TouchableOpacity,Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../../global/GlobalState';

export default function InscriptionStage({ navigation, route }) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { item } = route.params;
  const [user, setUser] = useContext(GlobalContext);
  const [NomPrenom, setNomPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [TypeStage, setTypeStage] = useState('');
  const [statut, setStatut] = useState('');
  const [AnneeDiplome, setAnneeDiplome] = useState('');

  // images
  const [photo, setPhoto] = useState(null);
  const [TypePhoto, setTypePhoto] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageExtension, setSelectedImageExtension] = useState('');
  const [selectedImageBlob, setSelectedImageBlob] = useState(null);

  useEffect(() => {
    navigation.setOptions({ title: item.intitule_filiere });
  }, []);


   // upload image

   const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    allowsEditing: false,
     aspect: [4, 3],
    });

    if (!result.canceled) {
      setSelectedImage(result);
      const uriParts = result.assets[0].uri.split('.');
        const extension = uriParts[uriParts.length - 1];
        setSelectedImageExtension(`image/${extension}`);
    }
  };

  // validation
  const ValidationStage = () => {
     
    // variable image
    const photo = selectedImage ? selectedImage.assets[0].base64 : null;

    const newErrors = {};

    if (!NomPrenom) {
      newErrors.NomPrenom = 'Le champ Nom et prénoms est requis';
    }

    if (!telephone) {
      newErrors.telephone = 'Le champ Téléphone est requis';
    }

    if (!TypeStage) {
      newErrors.TypeStage = 'Veuillez sélectionner un type de stage';
    }

    if (!statut) {
      newErrors.statut = 'Veuillez sélectionner un statut';
    }

    if (!AnneeDiplome) {
      newErrors.AnneeDiplome = 'Le champ Année du diplôme est requis';
    }
    if (!photo) {
      newErrors.Photo = 'Veuillez choisir une photo';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aucune erreur, soumettez le formulaire ici
      fetch('https://adores.tech/api/data/demande-stage.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          // we will pass our input data to server
                  matricule: user[0].matricule,
                  nom_prenom: NomPrenom,
                  telephone : telephone,
                  type_stage : TypeStage,
                  statut : statut,
                  annee_diplome : AnneeDiplome,
                  diplome : item.code_cycle,
                  filiere : item.code_filiere,
                  photo : photo,
                  TypePhoto : selectedImageExtension,
          
        })
        
        
      })
      .then((response) => response.json())
       .then((responseJson)=>{
        alert(responseJson);
        setIsSubmitting(false); // Reset submitting state after data is sent
        setNomPrenom('');
        setTypeStage('');
        setStatut('');
        setAnneeDiplome('');
        setTelephone('');
        setSelectedImage(null);
       })
       .catch((error)=>{
       alert(error);
       setIsSubmitting(false); // Reset submitting state after data is sent
       });

      setIsSubmitting(true);
      // ...
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

<View style={styles.container}>

      <ScrollView style={styles.form}>

      <View style={styles.profileImageContainer}>
      <Text style={styles.label}>Ajouter votre photo * :</Text>
      <TouchableOpacity style={[
            styles.profileImage,
            errors.Photo && styles.inputError, // Ajoutez des styles d'erreur conditionnels
           ]} onPress={selectImage}>
          

        {selectedImage ? (
            <Image
                source={{ uri: selectedImage.assets[0].uri }}
                style={styles.image}
                resizeMode="center"
            />
        ) : (
            // Affichez l'image existante ou un logo par défaut
            <View></View>)

        }
    </TouchableOpacity>
    {errors.Photo && (
          <Text style={styles.errorText}>{errors.Photo}</Text>
        )}
    </View>

        <Text style={styles.label}>Nom et prénoms * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.NomPrenom && styles.inputError, // Ajoutez des styles d'erreur conditionnels
          ]}
          placeholder="Entrez votre nom et prénoms"
          onChangeText={(val) => setNomPrenom(val)}
          value={NomPrenom}
        />
        {errors.NomPrenom && (
          <Text style={styles.errorText}>{errors.NomPrenom}</Text>
        )}

        <Text style={styles.label}>Téléphone * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.telephone && styles.inputError,
          ]}
          keyboardType="numeric"
          placeholder="Entrez votre numéro de téléphone"
          onChangeText={(val) => setTelephone(val)}
          value={telephone}
        />
        {errors.telephone && (
          <Text style={styles.errorText}>{errors.telephone}</Text>
        )}

        <Text style={styles.label}>Année du diplôme * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.AnneeDiplome && styles.inputError,
          ]}
          keyboardType="numeric"
          placeholder="Entrez votre année d'obtention du diplome"
          minLength={4}
          maxLength={4}
          onChangeText={(val) => setAnneeDiplome(val)}
          value={AnneeDiplome}
        />
        {errors.AnneeDiplome && (
          <Text style={styles.errorText}>{errors.AnneeDiplome}</Text>
        )}

        <Text style={styles.label}>Type de stage * :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={TypeStage}
            style={[
              styles.picker,
              errors.TypeStage && styles.inputError,
            ]}
            onValueChange={(val) => setTypeStage(val)}
          >
            <Picker.Item label="===== Faites votre choix ======" value="" />
            <Picker.Item label="Immersion" value="Immersion" />
            <Picker.Item label="Ecole" value="Ecole" />
            <Picker.Item
              label="Perfectionnement"
              value="Perfectionnement"
            />
          </Picker>
        </View>
        {errors.TypeStage && (
          <Text style={styles.errorText}>{errors.TypeStage}</Text>
        )}


<Text style={styles.label}>Statut * :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={statut}
            style={[
              styles.picker,
              errors.statut && styles.inputError,
            ]}
            onValueChange={(val) => setStatut(val)}
          >
            <Picker.Item label="===== Faites votre choix ======" value="" />
            <Picker.Item label="Presentiel" value="Presentiel" />
            <Picker.Item label="En ligne" value="En ligne" />
          </Picker>
        </View>
        {errors.statut && (
          <Text style={styles.errorText}>{errors.statut}</Text>
        )}

   
      </ScrollView>

      </View>


      <View style={styles.overlay}>
<TouchableOpacity onPress={ValidationStage} style={{ flex: 1 }}>
  <View style={styles.btn}>
    <Text style={styles.btnText}>Valider</Text>

  </View>
</TouchableOpacity>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Fond blanc
    padding: 16,
    marginBottom:60
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: 'red', // Couleur de bordure rouge en cas d'erreur
  },
  errorText: {
    color: 'red',
    marginBottom:15,
    marginTop:-10,
  },
  button: {
    backgroundColor: '#266EF1',
    borderColor: '#266EF1',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  picker: {
    //height: 40, // Ajoutez ou ajustez la hauteur comme nécessaire
    alignItems: 'center', // Ajoutez cette ligne pour centrer verticalement le texte
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginTop: 1,
    borderWidth: 1,
    borderColor: 'gray', // Couleur du cercle
    marginBottom: 16,
},
image: {
  flex: 1,
  height: undefined,
  width: undefined,
},
profileImageContainer: {
  flex: 1, // Utilisez flex pour aligner au centre
      justifyContent: 'center', // Alignez verticalement au centre
      alignItems: 'center', // Alignez horizontalement au centre
      backgroundColor: '#fff',
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
    btn: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      backgroundColor: '#007aff',
      borderColor: '#007aff',
      width:'100%'
    },
    btnText: {
      fontSize: 18,
      lineHeight: 26,
      fontWeight: '600',
      color: '#fff',
    },
});
