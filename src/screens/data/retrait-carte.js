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




export default function Retrait({navigation})  {
       

    const [montant,setMontant] = useState('');
    const [coordonnee,setCoordonnee] = useState('');
    const [reglement,setReglement] = useState('');
    const [user, setUser] = useContext(GlobalContext);
    


  const [selected, setSelected] = useState('');
  


  const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track form submission
  const [errors, setErrors] = useState({}); // Add a state to hold the error messages





  // PHP MYSQL

	
	const ValidationRetrait = () =>{

    if (!montant || !coordonnee || !reglement) {
      setErrors({
        // Update error state with appropriate error messages
        montant: !montant ? 'Le champ Montant est requis' : '',
        coordonnee: !coordonnee ? 'Le champ Téléphone est requis' : '',
        reglement: !reglement ? 'Veuillez sélectionner un Mobile Money' : '',
      });
      return;
    }

    setIsSubmitting(true); // Set submitting state to true while sending the data

		
		
		fetch('https://adores.tech/api/data/demande-retrait.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
				matricule: user[0].matricule,
				montant: montant,
        coordonnee : coordonnee,
        reglement : reglement,
        utilisateur : user[0].matricule,
        
			})
			
			
		})
		.then((response) => response.json())
		 .then((responseJson)=>{
      alert(responseJson);
      setIsSubmitting(false);
      setMontant(''); // Clear the Montant field
      setCoordonnee(''); // Clear the Téléphone field
      setReglement(''); // Clear the Téléphone field
      
		 })
		 .catch((error)=>{
		 alert(error);
     setIsSubmitting(false); 
		 });
		
	}

  // in

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.form}>


    <Text style={styles.label}>Montant * :</Text>
    <TextInput 
    style={[
      styles.input,
      errors.montant && styles.inputError,
    ]}
    label="Montant *" 
    variant="standard"
    keyboardType="numeric"
    placeholder="Saisir le montant à rétirer"
    onChangeText={(val) => setMontant(val)}
    errorText={errors.montant}
    value={montant}
     />
      {errors.montant && (
          <Text style={styles.errorText}>{errors.montant}</Text>
        )}





<Text style={styles.label}>Mobile money * :</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={reglement}
            style={[
              styles.picker,
              errors.reglement && styles.inputError,
            ]}
            onValueChange={(val) =>  setReglement(val)}
          >
            <Picker.Item label="===== Faites votre choix ======" value="" />
            <Picker.Item label="Orange Money" value="Orange Money" />
            <Picker.Item label="MTN Mobile Money" value="MTN Mobile Money" />
            <Picker.Item label="Moov Money" value="Moov Money"/>
            <Picker.Item label="Wave" value="Wave"/>
          </Picker>
        </View>
        {errors.reglement && (
          <Text style={styles.errorText}>{errors.reglement}</Text>
        )}


<Text style={styles.label}>Téléphone * :</Text>
    <TextInput 
    style={[
      styles.input,
      errors.coordonnee && styles.inputError,
    ]}
       label="Téléphone *" 
       variant="standard" 
       keyboardType="numeric"
       placeholder="Saisir le numéro de téléphone"
       onChangeText={(val) => setCoordonnee(val)}
       errorText={errors.coordonnee} 
       value={coordonnee}
    />
    {errors.coordonnee && (
          <Text style={styles.errorText}>{errors.coordonnee}</Text>
        )}
    
    
    

      <TouchableOpacity style={styles.button} onPress={ValidationRetrait}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
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
    marginBottom: 8,
    marginTop:-10
  },
  button: {
    marginTop:20,
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
    alignItems: 'center'
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
});



