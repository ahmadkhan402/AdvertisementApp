import {
  Alert,
    AppRegistry,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { DataList } from "../../DataBases/DataBase";
  import { MaterialIcons, AntDesign } from "@expo/vector-icons";
  import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firbase";
import { doc, setDoc } from "firebase/firestore";


  const SignupScreen = ({ navigation }) => {
      const [password, setPassword] = useState("");
      const [email, setEmail] = useState("");
      const [Username, setUserName] = useState("");
      const [Error, setError] = useState("");
      const [id, setId] = useState("");
      const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            
            const user = userCredential.user;
              setId(user.uid) 
              AddUserData(id,Username,email)
              console.log("register User", user.uid)
              navigation.navigate("Login")
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          
            let customErrorMessage = "";
          if(errorCode == "auth/user-not-found")
             {
                customErrorMessage = "User not found.\n  Please check your email.";
             }
             else if(errorCode == "auth/wrong-password")
              {
                customErrorMessage = "Incorrect password.\n  Please try again.";
               }
               else if(errorCode == "auth/invalid-email")
            {
                customErrorMessage = "Invalid-email.\n  Please try again.";
            }else if(errorCode == "auth/network-request-failed"){
              customErrorMessage = "Network-request-failed.\n Please try again.";
            }else if(errorCode == "auth/weak-password"){
              customErrorMessage = "Weak password! \n Password should be at least 6 Characters.";
            }

             else {
              customErrorMessage = errorMessage 
             }
             setError(customErrorMessage);
            console.log( "rrerror",Error)
          });

         
          }
          const AddUserData = async (id, Username, email) => {
            try {
              const userRef = doc(db, 'users', auth.currentUser.uid);
              await setDoc(userRef,  {
                username: Username,
                email: email,
                Id:auth.currentUser.uid
              });
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          };
    return (
      <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <Image source={DataList.LoginImageUrl} />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
       
          <Text style={{ fontSize: 32, fontWeight: "600" }}>Welcome!</Text>
          <Text style={{ fontSize: 17, fontWeight: "300" }}>
            Create an account
          </Text>
        </View>
        <View
          style={{ marginTop: 20, alignContent: "center", marginHorizontal: 36 }}
        >
         <View style={styles.inputView}>
         <AntDesign
             name="user" 
             style={styles.Icon}
              size={38}
              color={DataList.btnBg} />
            <TextInput
              keyboardType="default"
              placeholder="Username"
              style={styles.input}
              onChangeText={(e)=>setUserName(e)}
            />
          </View>
          <View style={styles.inputView}>
            <MaterialIcons
              name="email"
              style={styles.Icon}
              size={38}
              color={DataList.btnBg}
            />
            <TextInput
              keyboardType="email-address"
              placeholder="Email"
              style={styles.input}
              onChangeText={(e)=>setEmail(e)}
            />
          </View>
          <View style={styles.inputView}>
            <AntDesign
              name="lock"
              style={styles.Icon}
              size={38}
              color={DataList.btnBg}
  
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
              onChangeText={(p)=>setPassword(p)}
            />
          </View>
        </View>
  <Text style={{color:"red",textAlign:"right",fontSize:13,paddingRight:26}}>{Error}</Text>
        <View
          style={{
            alignItems: "center",
            marginVertical: 20,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={handleSignUp}
          >
            <Text style={styles.Text}>Signup</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    );
  };
  
  export default SignupScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:50,
      backgroundColor: "#fff",
      justifyContent: "center",
      
    },
    Text: {
      textAlign: "center",
      color: "#fff",
      fontSize: 22,
    },
    btn: {
      backgroundColor: DataList.btnBg,
      padding: 10,
      paddingHorizontal: 45,
      borderRadius: 35,
      elevation: 12,
      marginBottom:20
    },
    inputView: {
      marginVertical: 20,
      alignItems: "center",
      borderColor: "#fff",
      elevation: 12,
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: "#fff",
      height: 45,
      flexDirection: "row",
    },
    input: {
      flex: 1,
      marginLeft: 8,
      paddingRight: 34,
    },
    Icon: {
      height: 60,
      borderColor: "#fff",
      elevation: 12,
      borderRadius: 30,
      borderWidth: 1,
      padding: 10,
      backgroundColor: "#fff",
    },
  });