import React,{useContext} from 'react'
import {Text,View,Button,StyleSheet,Image, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useState, useEffect } from "react";
import { auth , db } from '../Firebase/config'
import {
    collection,
    getDocs,
  } from '../Firebase/config';


const Tab = createMaterialTopTabNavigator();
const BTab = createBottomTabNavigator();
const {height, width} = Dimensions.get('window');
import { useNavigation } from '@react-navigation/core';
import Background from './Background';
import Container from './Container';
import ShowIncome from './Income/ShowIncome';
import ShowExpense from './Expense/ShowExpense';
import loginContext from '../Context/Login/loginContext';


function MyTabs({navigation}) {
    

    const [incomeRecords,setIncomeRecords] = useState([])
   
    const a=useContext(loginContext)

    return(
        <Tab.Navigator
        initialRouteName="Income"
        screenOptions={{
            activeTintColor:'green',
            labelStyle:{fontSize:16},
            style:{backgroundColor:'white'}
        }}>
            {/* {console.log(a.userState,a.loggedIn)} */}
            <Tab.Screen 
            name="Income"
            component={ShowIncome} 
            />

            <Tab.Screen 
            name="Expense"
            component={ShowExpense} 
            options={{tabBarLabel:'Expense'}}/>

            
        </Tab.Navigator>
    )
}

const Add=({children,onPress})=>{
    <TouchableOpacity 
    style={{
        top:-30,
        justifyContent:'center',
        alignItems: 'center',
        ...styles.shadow
    }}
    onPress={onPress}>
        <View
        style={{
            width: 70,
            height: 70,
            borderRadius:35,
            backgroundColor:'red'   //'#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>
}

function BottomTab(){
    return(
        <BTab.Navigator
        tabBarOptions={{
            showLabel:false,
            style: {
                position: 'absolute',
                bottom: 25,
                left:20,
                right:20,
                elevation: 0,
                backgroundColor:'skyblue',
                borderRadius: 15,
                height:90,
                ...styles.shadow
            }
        }}>
            <BTab.Screen name="Add" component={Add}
            options={{
                tabBarIcon: ({focused})=>(
                    <Image
                    source={require('../assets/plus.png')}
                    resizeMode="contain"
                    style={{
                        width:30,
                        height:30,
                        tintColor:'#fff'
                    }}
                    />
                ),
                tabBarButton:(props)=>(
                    <Add {...props} />
                )
            }}
                />
        </BTab.Navigator>
    )
}

export default function HompePage({navigation}){
    const insets = useSafeAreaInsets();
    return(
        // <NavigationContainer independent={true}>
           <View style={{flex:1,flexDirection: 'column',marginTop:insets.top}}>
            <MyTabs navigation={navigation}/>
            {/* <Background></Background> */}
           </View>
        // </NavigationContainer>
    )
}

const styles = StyleSheet.create({

    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity:0.25,
        shadowRadius: 3.5,
        elevation:5


    }
})