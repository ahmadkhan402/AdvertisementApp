import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { DataList } from "../../DataBases/DataBase";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firbase";

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Error, setError] = useState("");
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          navigation.navigate("Home");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        let customErrorMessage = "";
        if (errorCode == "auth/user-not-found") {
          customErrorMessage = "User not found.\n  Please check your email.";
        } else if (errorCode == "auth/wrong-password") {
          customErrorMessage = "Incorrect password.\n  Please try again.";
        } else if (errorCode == "auth/invalid-email") {
          customErrorMessage = "Invalid-email.\n  Please try again.";
        } else if (errorCode == "auth/invalid-credential") {
          customErrorMessage =
            "Invalid Email or Password.\n  Please try again.";
        } else if (errorCode == "auth/network-request-failed") {
          customErrorMessage = "Network-request-failed.\n Please try again.";
        } else if (errorCode == "auth/weak-password") {
          customErrorMessage =
            "Weak password! \n Password should be at least 6 Characters.";
        } else if (errorCode == "auth/missing-password") {
          customErrorMessage = "Missing password! \n Please write password";
        } else if (errorCode == "auth/missing-email") {
          customErrorMessage = "Missing email! \n Please write email";
        } else {
          customErrorMessage = errorMessage;
        }
        setError(customErrorMessage);
        console.log(Error);
      });
  };

  return (
    <View style={styles.container}>
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
        <Text style={{ fontSize: 32, fontWeight: "600" }}>Welcome Back!</Text>
        <Text style={{ fontSize: 17, fontWeight: "300" }}>
          Login to your account
        </Text>
      </View>
      <View
        style={{ marginTop: 20, alignContent: "center", marginHorizontal: 36 }}
      >
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
            onChangeText={(e) => setEmail(e)}
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
            onChangeText={(p) => setPassword(p)}
          />
        </View>
        <Text style={{ color: "red", textAlign: "right", fontSize: 13 }}>
          {Error}
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          marginVertical: 50,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.Text}>Login</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{ color: DataList.btnBg, fontWeight: 700 }}>
            {" "}
            Signup here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
