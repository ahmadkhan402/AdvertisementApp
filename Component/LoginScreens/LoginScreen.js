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

const LoginScreen = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
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

      <View
        style={{
          alignItems: "center",
          marginVertical: 50,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Home")}
        >
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
