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

export default function NouveauCompteRepetiteur({navigation}) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [user, setUser] = useContext(GlobalContext);
  const [localite, setLocalite] = useState('');
  const [matiere, setMatiere] = useState('');
  const [classe, setClasse] = useState('');
  const [condition, setCondition] = useState('');
  const [niveau, setNiveau] = useState('');


  useEffect(() => {
    navigation.setOptions({ title: "Compte répétiteur" });
  }, []);



  // validation
  const ValidationRepetiteur = () => {
     
    // variable image

    const newErrors = {};


    if (!localite) {
      newErrors.localite = 'Le champ Localite est requis';
    }

    if (!matiere) {
      newErrors.matiere = 'Le champ Matieres est requis';
    }

    if (!classe) {
      newErrors.classe = 'Le champ Classes est requis';
    }

    if (!niveau) {
      newErrors.niveau = 'Veuillez sélectionner le niveau';
    }

    if (!condition) {
      newErrors.condition = 'Le champ Conditions est requis';
    }
 

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aucune erreur, soumettez le formulaire ici
      fetch('https://adores.tech/api/data/validation-repetiteur.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          // we will pass our input data to server
                  matricule: user[0].matricule,
                  localite: localite,
                  classe : classe,
                  matiere : matiere,
                  condition : condition,
                  niveau : niveau,

          
        })
        
        
      })
      .then((response) => response.json())
       .then((responseJson)=>{
        alert(responseJson);
        setIsSubmitting(false); // Reset submitting state after data is sent
        setLocalite('');
        setNiveau('');
        setClasse('');
        setMatiere('');
        setCondition('');

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


        <Text style={styles.label}>Localité * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.localite && styles.inputError,
          ]}
          placeholder="Entrez votre localité"
          onChangeText={(val) => setLocalite(val)}
          value={localite}
        />
        {errors.localite && (
          <Text style={styles.errorText}>{errors.localite}</Text>
        )}

        <Text style={styles.label}>Niveau * :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={niveau}
            style={[
              styles.picker,
              errors.niveau && styles.inputError,
            ]}
            onValueChange={(val) => setNiveau(val)}
          >
            <Picker.Item label="===== Faites votre choix ======" value="" />
            <Picker.Item label="PRIMAIRE" value="PRIMAIRE" />
            <Picker.Item label="COLLEGES" value="COLLEGES" />
            <Picker.Item
              label="LYCEES"
              value="LYCEES"
            />
          </Picker>
        </View>
        {errors.niveau && (
          <Text style={styles.errorText}>{errors.niveau}</Text>
        )}


<Text style={styles.label}>Matieres * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.matiere && styles.inputError,
            { height:120}
          ]}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          placeholder="Saisir les matieres enseignées"
          onChangeText={(val) => setMatiere(val)}
          value={matiere}
        />
        {errors.matiere && (
          <Text style={styles.errorText}>{errors.matiere}</Text>
        )}



       <Text style={styles.label}>Classes * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.classe && styles.inputError,
            { height:120}
          ]}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          placeholder="Saisir les classes"
          onChangeText={(val) => setClasse(val)}
          value={classe}
        />
        {errors.classe && (
          <Text style={styles.errorText}>{errors.classe}</Text>
        )}

      <Text style={styles.label}>Conditions * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.condition && styles.inputError,
            { height:120}
          ]}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          placeholder="Saisir les conditions"
          onChangeText={(val) => setCondition(val)}
          value={condition}
        />
        {errors.condition && (
          <Text style={styles.errorText}>{errors.condition}</Text>
        )}


   
      </ScrollView>

      </View>


      <View style={styles.overlay}>
<TouchableOpacity onPress={ValidationRepetiteur} style={{ flex: 1 }}>
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
