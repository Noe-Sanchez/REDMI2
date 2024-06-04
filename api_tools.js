import React, {Component} from 'react' 
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';

export class APIgetter extends Component{
    state = {fetchedData: " "};
  
    makeFetch(){
        console.log('APIgetter button trying a Backend fetch');
        fetch('http://localhost:19004/api', {method: "GET"})
            .then((response) => response.json())
            .then((data) => this.setState({fetchedData: data.magic_number.toString()}))
            .catch((err) => {console.log(err.message);});
        }
  
    render(){
        console.log('Rendering API getter')
        return(
            <View style={styles.rowContainer}>
                <TouchableOpacity
                    onPress={this.makeFetch.bind(this)}>
                        <Text style={styles.baseText}>Hacer get al back</Text>
                </TouchableOpacity>
                <Text style={styles.baseText}>Obtenido: {this.state.fetchedData}</Text>
            </View>
        );
    }
}


export class APIposter extends Component{
    state = {xvalue: " ",
             yvalue: " ",
             zvalue: " "}
  
    makeFetch(){
        console.log('APIposter button trying a Backend fetch');
        //fetch('http://localhost:19004/api/ros', {
        fetch('https://0e34-189-152-132-205.ngrok.io/api/ros', {
            method: "POST", 
            body: JSON.stringify(this.state),
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => console.log(response))
        .catch((err) => {console.log(err.message);});
    }
  
    render(){
        console.log('Rendering API poster')
        return(
            <View style={styles.rowContainer}>
                <TextInput
                    placeholder="X value"
                    style={styles.altText}
                    onChangeText={(value) => this.setState({xvalue: value})}
                />
                <TextInput
                    placeholder="Y value"
                    style={styles.altText}
                    onChangeText={(value) => this.setState({yvalue: value})}
                />  
                <TextInput
                    placeholder="Z value"
                    style={styles.altText}
                    onChangeText={(value) => this.setState({zvalue: value})}
                />  
                <TouchableOpacity
                    onPress={this.makeFetch.bind(this)}>
                        <Text style={styles.baseText}>Send position</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const textStyle = {
    //fontFamily: 'Consolas',
    textAlign: 'center',
    //outlineColor: "#F60",
    //outlineStyle: "solid",
    backgroundColor: "#334",
    fontSize: 20,
    outlineWidth: 2,
}
const containerStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    outlineColor: "#000",
    outlineStyle: "solid",
    flex: 4,
    backgroundColor: '#223',
    //margin: "20px",
    gap: "20px",
    outlineWidth: 3
}

const styles = StyleSheet.create({
    baseText: {
        color: '#FFF',
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "10px",
        paddingRight: "10px",
        ...textStyle
    },
    altText: {
        color: '#C77',
        //backgroundColor: '#999',
        paddingTop: "5px",
        paddingBottom: "5px",
        ...textStyle
    },
    baseButton: {
        fontFamily: 'Consolas',
        backgroundColor: '#F60'
    },
    colContainer: {
        ...containerStyle
    },
    rowContainer: {
        flexDirection: "row",
        ...containerStyle
    }}
);
