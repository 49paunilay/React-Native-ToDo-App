import { Text,Container,Content,Form,Input,Item, Button } from 'native-base';
import React from 'react'
import { useState } from 'react';
import {StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import shortid from 'shortid';


const Add=({navigation,route})=>{
  const [task,setTask] = useState('')
  const [details,setDetails] = useState('')
  const handleInput=async()=>{
    try {
      if(!task || !details){
        return alert("Please Enter valid values")
      }
      const taskToAdd = {
        id:shortid.generate(),
        task:task,
        details:details,
        isDone:false
      }
      const storedToDo = await AsyncStorage.getItem('@todoitem')
      const previousList =await JSON.parse(storedToDo)
      if(!previousList){
        const newList = [taskToAdd]
        await AsyncStorage.setItem('@todoitem',JSON.stringify(newList))
      }
      else{
        previousList.push(taskToAdd)
        await AsyncStorage.setItem('@todoitem',JSON.stringify(previousList))
      }
      navigation.navigate('Home')
    } catch (error) {
      console.log(error);
    }
  }
    return(
        <Container style={styles.container}>
        <Content>
          <Form>
            <Item rounded style={styles.items} >
              <Input placeholder="Enter your work" value={task} onChangeText={(event)=>setTask(event)}/>
            </Item>
            <Item rounded style={styles.items}>
              <Input placeholder="additional" value={details} onChangeText={(event)=>setDetails(event)}/>
            </Item>
            <Button
            rounded
            success
            onPress={handleInput}
            style={{alignSelf:'center',paddingHorizontal:25}}
            >
              <Text>Add</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
}
export default Add;
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        justifyContent:'space-between',
        marginBottom:10
    },
    items:{
        marginBottom:15,
        paddingStart:5

    }
})