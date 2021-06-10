import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { Text } from 'react-native'
import {Container,Form,Item,Input, Content} from 'native-base'
import Add from './Screens/Add';
import ToDoHome from './Screens/ToDoHome'
import { useState } from 'react';
const Stack = createStackNavigator();

const App=()=>{
  
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
        name="Home"
        component={ToDoHome}
        options={{
          headerStyle:{
            backgroundColor:"gray"
          },
          title:"To Do App",
          headerTitleAlign:'center',
          headerTitleStyle:{
            color:"#FFFFFF"
          }
        }}
        >
        </Stack.Screen>

        <Stack.Screen
        name="AddToDo"
        component={Add}>
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
