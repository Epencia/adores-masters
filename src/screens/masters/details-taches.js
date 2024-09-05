import { Image, View, Text,ScrollView,FlatList,  StyleSheet,  TouchableOpacity } from 'react-native'
import React , {useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../global/GlobalState';
import { CarteContext } from '../../global/CarteState';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from "@react-native-material/core";

const DetailsTachesMasters = ({navigation,route}) => {

  const [user, setUser] = useContext(GlobalContext);
  const [GlobalCarte, setGlobalCarte] = useContext(CarteContext);
  const { item, stagiaire } = route.params;


    useEffect(()=>{
      navigation.setOptions({title: 'Détails de la tâche'});
      
    },[])

    //
    ValidationTache = () =>{
		
      fetch(`https://adores.tech/api/masters/validation-tache.php?id=${item.id}`,{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        
        
      })
      .then((response) => response.json())
       .then((responseJson)=>{
        alert(responseJson);
       })
       .catch((error)=>{
       alert(error);
       });
      
    }
  
    // in

    //
    AnnulationTache = () =>{
		
      fetch(`https://adores.tech/api/masters/annulation-tache.php?id=${item.id}`,{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        
      })
      .then((response) => response.json())
       .then((responseJson)=>{
        alert(responseJson);
       })
       .catch((error)=>{
       alert(error);
       });
      
    }
  
    // in
   
  return (
    <ScrollView>

<View style={{alignItems:'center',marginTop: 10, marginRight:15,marginLeft:15,
            elevation:5,backgroundColor:'white',borderRadius:6
          }}>
            <Text style={{fontSize:20,marginTop:10,color:'#695cd4',fontWeight:'bold'}}>
            {item.titre_tache}
            </Text>
            <MaterialCommunityIcons
                    style={{color:"#008080",width : 70, height : 70, borderRadius : 70/2,
                    }}
                    name={'clipboard-list-outline'}
                    size={70}
                  />
          

           <Text style={{fontSize:20,marginTop:15,color:'#e91e63',marginBottom:10,}}>
            {item.etat}
            </Text>
       
       </View>

<View style={{marginTop: 10, marginRight:15,marginLeft:15,
        elevation:5,backgroundColor:'white',borderRadius:6,marginBottom:10,
      }}>

      <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            paddingTop: 10,
            paddingBottom: 5,
            marginRight : 15,
            marginLeft : 15,
          }}>
            {item.titre_tache}
          </Text>

          <Text style={{marginRight : 15, marginLeft : 15, textAlign: 'justify',fontWeight: 'bold',textDecorationLine:'underline'}}>
            Stagiaire :
          </Text>
          
        {item.nom_prenom ? (
         <Text style={{marginRight : 15, marginLeft : 15, textAlign: 'justify',marginBottom:15, }}>
            {item.nom_prenom}
        </Text>
        ) : (
          <Text style={{marginRight : 15, marginLeft : 15, textAlign: 'justify',marginBottom:15, }}>
            Aucun résultat
        </Text>
        )}


          <Text style={{marginRight : 15, marginLeft : 15, textAlign: 'justify',fontWeight: 'bold',textDecorationLine:'underline'}}>
            Description :
          </Text>
          {item.description_tache ? (
         <Text style={{marginRight : 15, marginLeft : 15, textAlign: 'justify',marginBottom:15, }}>
            {item.description_tache}
        </Text>
        ) : (
          <Text style={{marginRight : 15, marginLeft : 15, textAlign: 'justify',marginBottom:15, }}>
            Aucun résultat
        </Text>
        )}
    </View>

    <Stack spacing={6} style={{ margin: 16 }}>
        
          <View style={styles.btnGroup}>
          <TouchableOpacity
            onPress={this.ValidationTache}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Valider</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.AnnulationTache}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Annuler</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Stack>

    </ScrollView>
  )
}

export default DetailsTachesMasters

const styles = StyleSheet.create({

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

  statsItemValue: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: '#121a26',
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
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
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#fff',
  },
});
