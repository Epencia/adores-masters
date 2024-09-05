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
import { GlobalContext } from '../../global/GlobalState';
import FeatherIcon from 'react-native-vector-icons/Feather';
import HTML from 'react-native-render-html';

export default function NouvelleEntreprise({ navigation }) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [user, setUser] = useContext(GlobalContext);
  const [NomPrenom, setNomPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [categorie, setCategorie] = useState('');
  const [description, setDescription] = useState('');

  // images
  const [photo, setPhoto] = useState(null);
  const [TypePhoto, setTypePhoto] = useState('');

  const [formattedData, setFormattedData] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageExtension, setSelectedImageExtension] = useState('');
  const [selectedImageBlob, setSelectedImageBlob] = useState(null);

  useEffect(() => {
    navigation.setOptions({ title: 'Enregister un business'});
    getCategorie();
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

  // categorie
    // sans variables sessions
const getCategorie = () => {
  
    fetch(`https://adores.tech/api/data/categorie.php`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          if (result !== null) {
          
         
            // Format the data into the required format for the SelectList component
                    const formattedResult = result.map((item) => ({
                      
                      key: item.code, // Replace 'id' with the unique key property from the data
                      value: item.titre, // Replace 'name' with the property you want to display in the SelectList
                    }));
                    setFormattedData(formattedResult);
                  } else {
                    setFormattedData([]);
          }
          }
     )
     .catch((error)=>{
  alert(error);
     });
    
    }

  // validation
  const ValidationStage = () => {
     
    // variable image
    const photo = selectedImage ? selectedImage.assets[0].base64 : null;

    const newErrors = {};

    if (!NomPrenom) {
      newErrors.NomPrenom = 'Le champ Nom commercial est requis';
    }

    if (!telephone) {
        newErrors.telephone = 'Le champ Numéro de téléphone est requis';
      }


      if (!categorie) {
        newErrors.categorie = 'Le champ Catégorie est requis';
      }


    if (!description) {
      newErrors.description = 'Le champ Description est requis';
    }

    if (!photo) {
      newErrors.Photo = 'Veuillez choisir un logo';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aucune erreur, soumettez le formulaire ici
      fetch('https://adores.tech/api/data/nouvelle-entreprise.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          // we will pass our input data to server
                  telephone : telephone,
                  nom_prenom: NomPrenom,
                  categorie: categorie,
                  description : description,
                  photo : photo,
                  TypePhoto : selectedImageExtension,
          
        })
        
        
      })
      .then((response) => response.json())
       .then((responseJson)=>{
        alert(responseJson);
        setIsSubmitting(false); // Reset submitting state after data is sent
        setTitre('');
        setLien('');
        setDescription('');
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
      <Text style={styles.label}>Ajouter votre logo * :</Text>
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


        <Text style={styles.label}>Nom commercial * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.NomPrenom && styles.inputError, // Ajoutez des styles d'erreur conditionnels
          ]}
          placeholder="Entrez le nom commercial"
          onChangeText={(val) => setNomPrenom(val)}
          value={NomPrenom}
        />
        {errors.NomPrenom ? (
          <Text style={styles.errorText}>{errors.NomPrenom}</Text>
          ) : (
            <Text style={styles.errorText}></Text>
        )}



<Text style={styles.label}>Numéro de téléphone *:</Text>
        <TextInput
          style={[
            styles.input,
            errors.telephone && styles.inputError, // Ajoutez des styles d'erreur conditionnels
          ]}
          placeholder="Entrez un numéro de téléphone"
          onChangeText={(val) => setTelephone(val)}
          value={telephone}
        />
         {errors.telephone ? (
          <Text style={styles.errorText}>{errors.telephone}</Text>
          ) : (
            <Text style={styles.errorText}></Text>
        )}

        
<Text style={styles.label}>Catégorie * :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categorie}
            style={[
              styles.picker,
              errors.DataStagiaire && styles.inputError,
            ]}
            onValueChange={(val) => setCategorie(val)}
          >
             <Picker.Item label="===== Faites votre choix ======" value="" />
            {formattedData.map((item) => (
    <Picker.Item key={item.key} label={item.value} value={item.key} />

  ))}
          </Picker>
          
        </View>
        {errors.categorie && (
          <Text style={styles.errorText}>{errors.categorie}</Text>
        )}


        <Text style={styles.label}>Description * :</Text>
        <TextInput
          style={[
            styles.textarea,
            errors.description && styles.inputError,
          ]}
          multiline={true}
          numberOfLines={4} // Nombre de lignes visibles à l'écran
          placeholder="Entrez la description"
          onChangeText={(val) => setDescription(val)}
          value={description}
        />
        {errors.description ? (
          <Text style={styles.errorText}>{errors.description}</Text>
          ) : (
            <Text style={styles.errorText}></Text>
        )}

        

        
      </ScrollView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 50,
          height: 50,
          backgroundColor: 'blue',
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Liste publicite')} 
      >
        <FeatherIcon name="plus" size={30} color="white" />
      </TouchableOpacity>
      </View>

      <View style={styles.overlay}>
        <View
          style={{ flex: 1, paddingHorizontal: 4 }}>
          <TouchableOpacity style={styles.button} onPress={ValidationStage}>
          <Text style={styles.buttonText}>
          Publier
      </Text>
          </TouchableOpacity>
        </View>
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
    //marginBottom: 16,
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: 'red', // Couleur de bordure rouge en cas d'erreur
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
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
  button2: {
    backgroundColor: 'white',
    borderColor: '#266EF1',
    borderWidth:1,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom:16
  },
  buttonText2: {
    color: '#266EF1',
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
    height: 40,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginTop: 1,
    borderWidth: 1,
    borderColor: 'gray', // Couleur du cercle
    
},
image: {
  width: '100%',
  height: '100%', // L'image occupe tout l'espace du conteneur
  resizeMode: 'cover',
  borderRadius: 8,
},
profileImageContainer: {
  flex: 1, // Utilisez flex pour aligner au centre
      justifyContent: 'center', // Alignez verticalement au centre
      alignItems: 'center', // Alignez horizontalement au centre
      backgroundColor: '#fff',
    },
    postImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
      },
    textarea: {
        height: 150,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        //marginBottom: 16,
        paddingHorizontal: 8,
        textAlignVertical: 'top', // Alignez le texte en haut du champ
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
});
