import React,{ useState,useEffect } from 'react'
import { Fab,Icon, Left, ListItem,List, Right, Body, CheckBox} from 'native-base';
import {ScrollView,Text,StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useIsFocused } from '@react-navigation/core';

const ToDoHome=({navigation,route})=>{
    const [listofToDo,setListofToDo] = useState([])
    const focus = useIsFocused()
    const getData = async()=>{
        const storedvalues = await AsyncStorage.getItem('@todoitem')
        const readableForm = await JSON.parse(storedvalues)

        setListofToDo(readableForm)
        console.log("========================================================");
        console.log(listofToDo.length);
       

    }
    const handleDelete = async(id)=>{
        const anotherList = listofToDo.filter((list)=>list.id!==id)
        await AsyncStorage.setItem('@todoitem',JSON.stringify(anotherList))
        setListofToDo(anotherList)
    }
    const isitMarked=async(id)=>{
        const newList = listofToDo.map((item)=>{
            if(item.id==id){
                item.isDone= !item.isDone
            }
            return item
        })
        await AsyncStorage.setItem('@todoitem',JSON.stringify(newList))
        setListofToDo(newList)
    }
    useEffect(()=>{
        getData()
    },[focus])
    return(

        <ScrollView contentContainerStyle={styles.scroolview}>
            {
                listofToDo.length ==0?(<Text
                style={{
                    backgroundColor:"black",
                    color:"white",
                    textAlign:'center'
                }}
                >
                    Please Add An item
                </Text>):(
                    <List>
                    {
                        listofToDo.map((todo)=>(
                        <ListItem key={todo.id} style={styles.listItem}>
                            <Left>
                                <Icon style={styles.actionButton} onPress={()=>handleDelete(todo.id)} active name="trash"/>
                                <Icon style={styles.actionButton} active name="wifi"/>
                            </Left>
                            <Body>
                                <Text>{todo.task}</Text>
                                <Text note> {todo.details}</Text>
                            </Body>
                            <Right>
                                <CheckBox
                                checked={todo.isDone}
                               onPress={()=>isitMarked(todo.id)}
                                ></CheckBox>
                            </Right>
                        </ListItem>
                        ))
                    }
                </List>
                )
            }
            <Fab
            style={{backgroundColor:"#507FFF"}}
            position="bottomRight"
            active
            onPress={()=>navigation.navigate("AddToDo")}
            >
                <Icon name="add"/>
            </Fab>
        </ScrollView>
    )
}
export default ToDoHome;

const styles=StyleSheet.create({
    scroolview:{
        flex:1,
        backgroundColor:"gray"
    },
    actionButton: {
        marginLeft: 5,
        justifyContent:'space-between'
        
      },
    listItem: {
        marginLeft: 0,
        marginBottom: 3,
        backgroundColor:"#FFFFFF",
        
    },
})




