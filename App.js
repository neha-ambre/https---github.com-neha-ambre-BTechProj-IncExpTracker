import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Components/Login/Login';
import SignUp from './Components/Registration/SignUp';
import Home from './Components/Home';
import Index from './Components/Index';
import HomePage from './Components/HomePage';
import AddIncome from './Components/Income/AddIncome';
import AddExpense from './Components/Expense/AddExpense';
import Container from './Components/Container';
import LoginState from './Context/Login/LoginState';
import AddIncomeState from './Context/Income/AddIncomeState';
import AddExpenseState from './Context/Expense/AddExpenseState';
import ShowIncomeDetails from './Components/Income/ShowIncomeDetails';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <LoginState>
      <AddIncomeState>
      <AddExpenseState>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="AddIncome" component={AddIncome} />
          <Stack.Screen name="ShowIncomeDetails" component={ShowIncomeDetails} />
          <Stack.Screen name="AddExpense" component={AddExpense} />
          <Stack.Screen name="Container" component={Container} />
        </Stack.Navigator>
        </NavigationContainer>
      </AddExpenseState>
      </AddIncomeState>
    </LoginState>
  );
}
