import React, {useState} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableHighlight, Image} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const docks = [
  {
    name: 'Dock 1',
    location:{
      latitude: 25.65091732964922,
      longitude: -100.28961081775692,
    },
    status: 'Available',
  },
  {
    name: 'Dock 2',
    location:{
      latitude: 25.650968104986795, 
      longitude: -100.28790225061326,
    },
    status: 'Available',
  },
  {
    name: 'Dock 3',
    location:{
      latitude: 25.65011701122681,
      longitude: -100.28851915868894,
    },
    status: 'Available',
  }
];

function Interactible() {
  const [dockPartida, setDockP] = useState('');
  const [dockLlegada, setDockL] = useState('');
  

  const onPress1 = () => {
    try{
      {dockPartida == '' ? (
        setDockP('Pressed')
      ) : (
        Alert.alert(title='¿Quieres cambiar '+ dockPartida + '?',message=undefined,buttons=[{text:'Sí', onPress: () => pressChange(1), style: 'cancel'},{text: 'No'}])
      )
      }
      console.log('Pressed 1st button');
    } catch (e) {
      console.log(e)
    }
  }

  const onPress2 = () => {
    try{
      {dockLlegada == '' ? (
        setDockL('Pressed')
      ) : (
        Alert.alert(title='¿Quieres cambiar de ' + dockLlegada + '?',message=undefined,buttons=[{text:'Sí', onPress: () => pressChange(2), style: 'cancel'},{text: 'No'}])
      )
      }
      console.log('Pressed 2nd button');
    } catch (e) {
      console.log(e)
    }
  }

  const onPress3 = () => {
    try{
      {dockPartida == '' || dockLlegada == '' ? (
        Alert.alert('Primero selecciona los docks de partida y llegada')
      ) : (
        Alert.alert(title='¿Confirmas mandar el dron de ' + dockPartida + ' a ' + dockLlegada + '?',message=undefined,buttons=[{text:'Sí', onPress: () => pressSend(), style: 'cancel'},{text: 'No'}])
      )
      }
      console.log('Pressed 2nd button');
    } catch (e) {
      console.log(e)
    }
  }

  const onPressBack = () => {
    try{
      if(dockPartida == "Pressed"){
        setDockP('');
      }
      else{
        setDockL('');
      }
      console.log('Back button');
    } catch (e) {
      console.log(e)
    }
  }

  const onPressDock = (dockName) => {
    try{
      {dockLlegada == "Pressed" ? (
        dockPartida == dockName ? (
          Alert.alert('Dock de partida y llegada no pueden ser el mismo')
        ) : (
          Alert.alert(title='¿Confirmas ' + dockName + ' para llegar?',message=undefined,buttons=[{text:'Sí', onPress: () => pressConfirm(dockName), style: 'cancel'},{text: 'No'}])
        )
      ) : (
        Alert.alert(title='¿Confirmas ' + dockName + ' para partir?',message=undefined,buttons=[{text:'Sí', onPress: () => pressConfirm(dockName), style: 'cancel'},{text: 'No'}])
      )
      }
      console.log('Dock selected');
    } catch (e) {
      console.log(e)
    }
  }

  const pressChange = (button) => {
    try{
      {button == 1 ? (
        setDockP('Pressed')
      ) : (
        setDockL('Pressed')
      )
      }
      console.log('Change button');
    } catch (e) {
      console.log(e)
    }
  }

  const pressConfirm = (dockName) => {
    try{
      {dockPartida == "Pressed" ? (
        setDockP(dockName)
      ) : (
        setDockL(dockName)
      )
      }
      console.log('Confirmed button');
    } catch (e) {
      console.log(e)
    }
  }

  const pressSend = () => {
    try{
      console.log('Send button');
    } catch (e) {
      console.log(e)
    }
  }

  const showDocks = () => {
    return docks.map((dock,index) => {
      return (
        <Marker 
          key={index}
          coordinate={dock.location}
          title={dock.name}
          description={dock.status}
          pinColor={dock.status == 'Available' ? 'red' : 'gray'}
        >
          <Callout style={styles.containerMarker}>
            {dock.status == 'Available' ? (
              <TouchableHighlight style={styles.buttonMarker} onPress={() => onPressDock(dock.name)} underlayColor="#b3b9ff">
                <Text style={styles.textMarker}>{'Select ' + dock.name}</Text>
              </TouchableHighlight>
            ) : (
              <Text>{dock.name + ' ' + dock.status}</Text>
            )}
          </Callout>
        </Marker>
      )
    })
  }

  return (
    <View style={styles.containerInter}>
      {dockPartida == "Pressed" || dockLlegada == "Pressed" ? (
        <View style={styles.full}>
          <View style={styles.containerMap}>
            {dockLlegada == "Pressed" ? (
              <Text style={styles.subtitle}>Elige un dock de llegada</Text>
              ) : (
              <Text style={styles.subtitle}>Elige un dock de partida</Text>)
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
          >
            {showDocks()} 
          </MapView>
        </View>
      ) : (
        <View style={styles.full}>
          <View style={styles.containerOpt}>
            <View style={styles.containerInstr}>

              <Text style={styles.title}>1</Text>

              
              {dockPartida == "" ? (
                <View style={styles.containerText}>
                  <Text style={styles.instructions}>Selecciona el dock de</Text>
                  <Text style={styles.instructions}>donde partirá el dron</Text>
                </View>
              ) : (
                <View style={styles.containerText}>
                  <Text style={styles.instructions}>Dock de partida:</Text>
                  <Text style={styles.instructions}>{dockPartida}</Text>
                </View>
              )}

            </View>

            <TouchableHighlight style={styles.button} onPress={onPress1} underlayColor="#b498d4">
              <Text style={styles.text}>Seleccionar</Text>
            </TouchableHighlight>

          </View>
          <View style={styles.containerOpt}>
            <View style={styles.containerInstr}>

              <Text style={styles.title}>2</Text>

              {dockLlegada == "" ? (
                <View style={styles.containerText}>
                  <Text style={styles.instructions}>Selecciona el dock a</Text>
                  <Text style={styles.instructions}>donde llegará el dron</Text>
                </View>
              ) : (
                <View style={styles.containerText}>
                  <Text style={styles.instructions}>Dock de llegada:</Text>
                  <Text style={styles.instructions}>{dockLlegada}</Text>
                </View>
              )}

            </View>

            <TouchableHighlight style={styles.button} onPress={onPress2} underlayColor={"#b498d4"}>
              <Text style={styles.text}>Seleccionar</Text>
            </TouchableHighlight>

          </View>
          <View style={styles.containerOpt}>
            <View style={styles.containerInstr}>

              <Text style={styles.title}>3</Text>
              
              <View style={styles.containerText}>
                <Text style={styles.instructions}>¡Manda el dron!</Text>
              </View>

            </View>

            <TouchableHighlight style={dockPartida == '' || dockLlegada == '' ? styles.button2 : styles.button} onPress={onPress3} underlayColor={dockPartida == '' || dockLlegada == '' ? "#34224A" : "#b498d4"}>
              <Text style={dockPartida == '' || dockLlegada == '' ? styles.text2 : styles.text}>Seleccionar</Text>
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
    width: windowWidth > windowHeight ? '30%' : '100%',
    height: windowWidth > windowHeight ? '100%' : '33%',    
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
    marginLeft: '2%',
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
  containerMarker:{
    width: '50',
    height: '50',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonMarker: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#ffffff',
  },
  textMarker: {
    fontWeight: '',
    letterSpacing: 0.25,
    color: 'blue',
  },
});