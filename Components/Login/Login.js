import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import React,{useContext} from 'react';
import { auth } from '../../Firebase/config'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/core';
import DialogInput from 'react-native-dialog-input';
import Background from "../Background";
import Btn from "../Btn";
import Field from "../Field";
import { darkGreen } from "../Constants";
import loginContext from '../../Context/Login/loginContext';


export default function Login(props) {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dialogBoxVisibility, setDialogBoxVisibility] = React.useState(false);
  const [userNameValidity, setUserNameValidity] = React.useState(true);

  const navigation = useNavigation();
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.replace("HomePage");
      }
    });
    setUserName("");
    setPassword("");
    setUserNameValidity(true);
    return unsubscribe;
  }, []);

  const logInToAcc = ()=>{

    console.log("Logged In Successfully!!!", auth);
    signInWithEmailAndPassword(auth, userName, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        const currUser = {
          "email":user.email,
          "userid":user.uid
        }
        a.setLoggedIn(true);
        a.setUserState(currUser);
        console.log(currUser);
        console.log("user email :", user.email);
        navigation.replace("HomePage");
      })
      .catch(error => alert("Please provide valid user credentials!"));
  }

  //validate email i.e username
  const handleUserNameChange = (userNameInput) => {

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(userNameInput) === true){
      setUserName(userNameInput);
      setUserNameValidity(true);
    }
    else{
      setUserNameValidity(false);
      setUserName("");
    }
  }
  

  const redirectToSignUp = () => {
    props.navigation.navigate("Sign Up");
  }

  const forgotPassword = () => {
    setDialogBoxVisibility(true);
  }

  const passwordResetEmail = (emailInput) => {
    console.log("Email : ", emailInput);
    setDialogBoxVisibility(false);
    
    sendPasswordResetEmail(auth, emailInput)
      .then(function() {
        alert("Password reset link is sent successfully!");
      })
      .catch(function(error) {
        alert("Please enter valid email address!");
      });
  }

  const a = useContext(loginContext)

  return (
    <Background>
      <View style={{ alignItems: "center", width: "100%", marginTop:40}}>
        <Text
            style={{
              color: "white",
              fontSize: 64,
              fontWeight: "bold",
              marginVertical: 20,
            }}
        >
            Login
        </Text>
        <View 
          style={{
            backgroundColor: "white",
            height: 700,
            width: 370,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "grey",
              fontSize: 19,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={"email-address"}
            onChangeText={(text)=>handleUserNameChange(text)}
          />
          {!userNameValidity && <Text style={styles.tip}>Invalid Email / Username!</Text>}
        
          <Field placeholder="Password" secureTextEntry={true} onChangeText={(text)=>setPassword(text)}/>

          <View
            style={{
              alignItems: "flex-end",
              width: "78%",
              paddingRight: 16,
              marginBottom: 200,
            }}
          >
            <Text
              style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
              onPress={forgotPassword}
            >
              Forgot Password ?
            </Text>
          </View>

          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Login"
            Press={logInToAcc}
          />

          <DialogInput isDialogVisible={dialogBoxVisibility}
              title={"Password Recovery"}
              message={"Enter registered email address :"}
              hintInput ={"abc@gmail.com"}
              submitInput={ (inputText) => {passwordResetEmail(inputText)} }
              closeDialog={ () => {setDialogBoxVisibility(false)}}>
          </DialogInput>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Don't have an account ?{" "}
            </Text>
            <TouchableOpacity
              onPress={redirectToSignUp}
            >
              <Text
                style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  tip:{
    color:"red", 
    textAlign: 'left', 
    width: '70%', 
    paddingLeft: 10
  }
});
