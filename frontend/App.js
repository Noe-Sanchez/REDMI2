import React, {useState} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableHighlight, Image} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const docks = [{
  id: 0,
  name: 'Dock 1',
  latitude: 25.65091732964922,
  longitude: -100.28961081775692,
  status: 'Available',
},{

}];

function Interactible() {
  const [press1, setPress1] = useState('');
  const [press2, setPress2] = useState('');
  

  const onPress1 = () => {
    try{
      setPress1('Pressed');
      console.log('Pressed 1st button');
    } catch (e) {
      console.log(e)
    }
  }

  const onPress2 = () => {
    try{
      if(press1 != "Pressed"){
        Alert.alert('Primero selecciona el dock de partida');
        return;
      }
      else{
        Alert.alert('You tapped the 2nd button!');
        setPress2('Pressed_2');
        console.log('Pressed 2nd button');
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onPressBack = (id) => {
    try{
      Alert.alert(title='¿Quieres regresar? '+id,message=undefined,buttons=[{text:'Smn', onPress: pressConfirm, style: 'cancel'},{text: 'Pérame no!'}]);
    } catch (e) {
      console.log(e)
    }
  }

  const pressConfirm = () => {
    try{
      setPress1('');
      console.log('Confirmed button');
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.containerInter}>
      {press1 == "Pressed" ? (
        <View style={styles.full}>
          <View style={styles.containerMap}>
            {press2 == "Pressed_2" ? (
              <Text style={styles.subtitle}>Elige un dock de llegada</Text>
              ) : (
              <Text style={styles.subtitle}>Elige un dock de salida</Text>)
            }
            <TouchableHighlight style={styles.buttonBack} onPress={() => onPressBack(0)} underlayColor="#281A39">
              <Text style={styles.subtitle}>Regresar</Text>
            </TouchableHighlight>
          </View>
          <MapView 
            style={styles.map} 
            initialRegion={{
              latitude: 25.65091732964922,
              longitude: -100.28961081775692,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          />
        </View>
      ) : (
        <View style={styles.full}>
          <View style={styles.containerOpt}>
            <View style={styles.containerInstr}>

              <Text style={styles.title}>1</Text>

              <View style={styles.containerText}>
                <Text style={styles.instructions}>Selecciona el dock de</Text>
                <Text style={styles.instructions}>donde partirá el dron</Text>
              </View>

            </View>

            <TouchableHighlight style={styles.button} onPress={onPress1} underlayColor="#b498d4">
              <Text style={styles.text}>Seleccionar</Text>
            </TouchableHighlight>

          </View>
          <View style={styles.containerOpt}>
          <View style={styles.containerInstr}>

            <Text style={styles.title}>2</Text>
            
            <View style={styles.containerText}>
              <Text style={styles.instructions}>Selecciona el dock</Text>
              <Text style={styles.instructions}>más cercano a ti</Text>
            </View>

          </View>

          <TouchableHighlight style={press1 == "Pressed" ? styles.button : styles.button2} onPress={onPress2} underlayColor={press1 == "" ? "#34224A" : "#b498d4"}>
            <Text style={press1 == "Pressed" ? styles.text : styles.text2}>Seleccionar</Text>
          </TouchableHighlight>

          </View>
        </View>
      )}
    </View>
  )
}

export default function App() {

  return (
    <View style={styles.container}>

      <View style={styles.containerTitle}>
        <Image source={require("./assets/icon.png")} style={styles.logo}/>
        <Text style={styles.title}>PATOS</Text>
      </View>
      <Text style={styles.subtitle}>Plataforma de Atención con</Text>
      <Text style={styles.subtitle}>Tecnología Óptima Sostenible</Text>

      <Interactible/>

    </View>
    
  );
}

const styles = StyleSheet.create({
  full: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#160f29',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTitle:{
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    backgroundColor: '#160f29',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInter: {
    flexDirection: windowWidth > windowHeight ? 'row' : 'column',
    width: '90%',
    height: '60%',    
    backgroundColor: '#160f29',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  containerOpt: {
    flexDirection: 'column',
    width: windowWidth > windowHeight ? '48%' : '100%',
    height: windowWidth > windowHeight ? '100%' : '48%',    
    backgroundColor: '#160f29',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '2%',
    marginHorizontal: '2%',
  },
  containerInstr: {
    flexDirection: 'row',
    width: '100%',
    height: '40%',    
    backgroundColor: '#160f29',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    flexDirection: 'column',
    width: 'auto',
    height: '60%',    
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  title: {
    fontSize: windowWidth > windowHeight ? windowWidth * 0.07 : windowWidth * 0.15,
    fontWeight: 'bold',
    color: '#D5C5C8',
  },
  subtitle: {
    fontSize: windowWidth > windowHeight ? windowWidth * 0.027 : windowWidth * 0.05,
    fontWeight: 'bold',
    color: '#D5C5C8',
  },
  instructions: {
    fontSize: windowWidth > windowHeight ? windowWidth * 0.027 : windowWidth * 0.05,
    fontWeight: 'bold',
    color: '#D5C5C8',
    marginHorizontal: '',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: windowWidth > windowHeight ? windowWidth * 0.015 : windowWidth * 0.03,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#D5C5C8',
    marginTop: 0,
    marginLeft: 20,
  },
  text: {
    fontSize: windowWidth > windowHeight ? windowWidth * 0.04 : windowWidth * 0.07,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#8B5FBF',
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: windowWidth > windowHeight ? windowWidth * 0.015 : windowWidth * 0.03,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#281A39',
    marginTop: 0,
    marginLeft: 20,
  },
  text2: {
    fontSize: windowWidth > windowHeight ? windowWidth * 0.04 : windowWidth * 0.07,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#43305A',
  },
  containerMap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '10%',
    backgroundColor: '#43305A',
  },
  containerMapText: {
    justifyContent: 'center',
    width: '70%',
    height: '100%',
  },
  containerBackButton: {
    justifyContent: 'center',
    width: '30%',
    height: '100%',
  },
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#160f29',
    marginLeft: 20,
  },
  map: {
    width: '100%',
    height: '90%',
  },

});