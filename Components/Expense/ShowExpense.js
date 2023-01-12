import { useNavigation } from '@react-navigation/core';
import Container from '../Container';
import {View, Text, Button,StyleSheet,Image, ImageBackground, TouchableOpacity, Dimensions, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import {
    auth,
    db,
    collection,
    getDocs,
    doc
  } from '../../Firebase/config';
import render from 'react-native-web/dist/cjs/exports/render';
import AddExpenseContext from '../../Context/Expense/AddExpenseContext';

const {height, width} = Dimensions.get('window');

export default function ShowExpense(props){
    const [ExpenseRecords,setExpenseRecords] = useState([])
    const [loading,setLoading] = useState(false)
    const a = useContext(AddExpenseContext)
    
    useEffect(()=>{
        
    const fetchExpRecords = async () => {
        let newData=[]
        await getDocs(collection(doc(db,"User",auth.currentUser.uid), "Expense"))
            .then((querySnapshot)=>{               
                newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    setExpenseRecords(newData);                
                    
                // console.log(ExpenseRecords, newData);
            })
        setExpenseRecords(newData);
        setLoading(false)
        // console.log(ExpenseRecords);
        
    }
   
        fetchExpRecords();

    }, [])

    const navigation = useNavigation();
    const signOutFromAcc = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login");
                console.log("Sign out")
            })
            .catch(error => console.error(error.message));
    }

    
        if(loading){
            return(
              <View>
                <ActivityIndicator size="large" color="red"/>
              </View>
            )
          }    
          return(

            <View style={{width:'100%'}}>
            {/* <ImageBackground
                source={require('../../assets/background4.jpg')}
                style={{ height: "100%",flexDirection:'column'}}
            > */}
                <View  style={{height:(height*0.7)}}>
                {/* {ExpenseRecords.length>0 &&
                  (ExpenseRecords.map((element) => {
                    // <Container/>
                    return (<Text style={{backgroundColor:"red"}}>"{element.ExpAmount}"</Text>)
                      }))
                } */}

                {ExpenseRecords.length>0 &&
                  (<FlatList
                  style={{backgroundColor:"blue"}}
                  data = {ExpenseRecords}
                  renderItem = {({item}) => (
                      <Container record={{'item':item,functionName:'Expense'}}/>
                  )}
              />)
                }
                
               
                
                </View>
                <View style={{justifyContent:'center',alignItems: 'center',marginBottom:20}}>
                <View 
                    style={{width:70,
                    height:70,
                    borderRadius:35,
                    backgroundColor:"#006A42",
                    justifyContent:'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop:5,
                    marginBottom:5 
                }}
                onStartShouldSetResponder={()=>{props.navigation.navigate('AddExpense')}}
                >
                <Image source={require('../../assets/plus.png')}
                style={{width:30,height:30}}
                onPress={() => console.log('image pressed')}
                />
                </View>
                </View>
    
           
            
           <View style={{fontWeight:'50%',borderTopLeftRadius:140,borderTopEndRadius: 140,width:(width*0.9),alignSelf:'center'}}>
            <Button color="grey" style={{fontWeight:'50%',borderRadius:15,marginBottom:10}} title="Sign Out" onPress={signOutFromAcc}></Button>
          </View>
            {/* </ImageBackground> */}
            </View>
        )
        }
      
    