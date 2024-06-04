import React, {Component} from 'react' 
import {APIgetter, APIposter} from './api_tools'

export default class MainView extends Component{
  render(){
    console.log('Rendering MainView')
    return(
      <>
        <APIposter/>
        <APIgetter/>
      </>
    );
  }
}


