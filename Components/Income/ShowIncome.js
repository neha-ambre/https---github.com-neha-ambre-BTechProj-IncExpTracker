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
import AddIncomeContext from '../../Context/Income/AddIncomeContext';

const {height, width} = Dimensions.get('window');

export default function ShowIncome(props){
    const [incomeRecords,setIncomeRecords] = useState([])
    const [loading,setLoading] = useState(false)
    const a = useContext(AddIncomeContext)
    
    useEffect(()=>{
        
    const fetchIncRecords = async () => {
        let newData=[]
        await getDocs(collection(doc(db,"User",auth.currentUser.uid), "Income"))
            .then((querySnapshot)=>{               
                newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    setIncomeRecords(newData);                
                    
            })
        setIncomeRecords(newData);
        setLoading(false)
        // console.log(incomeRecords);
        
    }
   
        fetchIncRecords();

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
                {/* {incomeRecords.length>0 &&
                  (incomeRecords.map((element) => {
                    // <Container/>
                    return (<Text style={{backgroundColor:"red"}}>"{element.incAmount}"</Text>)
                      }))
                } */}

                {/* {console.log(incomeRecords)} */}
                {incomeRecords.length>0 &&
                  (
                  <FlatList
                  data = {incomeRecords}
                  renderItem = {({item}) => (
                      <TouchableOpacity onPress={()=>{props.navigation.navigate('ShowIncomeDetails')}}>
                        <Container record={{'item':item,functionName:'Income'}} onPress={()=>{console.log(item.id)}}/>
                      </TouchableOpacity>
                      
                  )}

                  onPress={()=>{console.log(item.id)}}
                  />
                  )
                  
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
                onStartShouldSetResponder={()=>{props.navigation.navigate('AddIncome')}}
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
      
    