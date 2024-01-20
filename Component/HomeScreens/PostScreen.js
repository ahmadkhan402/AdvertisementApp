import {
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
import {
  MaterialIcons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const PostScreen = ({navigation}) => {
  const [Title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Image
          source={DataList.LoginImageUrl}
          style={{ width: 100, height: 100, padding: 50 }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 30,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 32, fontWeight: "600" }}>
          Sell what you want!
        </Text>
        <Text style={{ color: "#fff", fontSize: 17, fontWeight: "300" }}>
          Post advertisement
        </Text>
      </View>
      <View />

      <View style={styles.Form}>
      <ScrollView >
        <View style={styles.inputView}>
          <MaterialCommunityIcons
            name="format-title"
            style={styles.Icon}
            size={38}
            color={DataList.btnBg}
          />
          <TextInput
            keyboardType="default"
            placeholder="Title"
            style={styles.input}
            onChangeText={(e) => setTitle(e)}
          />
        </View>
        <View style={styles.inputView}>
          <MaterialIcons
            name="description"
            style={styles.Icon}
            size={38}
            color={DataList.btnBg}
          />
          <TextInput
            keyboardType="default"
            placeholder="Description"
            multiline={true}
            style={styles.input}
            onChangeText={(e) => setdescription(e)}
          />
        </View>

        <View style={styles.inputView}>
          <Entypo
            name="price-tag"
            style={styles.Icon}
            size={38}
            color={DataList.btnBg}
          />
          <TextInput
            keyboardType="number-pad"
            placeholder="Price"
            style={styles.input}
            onChangeText={(e) => setPrice(e)}
          />
        </View>
        <View style={styles.UploadImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <MaterialCommunityIcons
                name="camera-plus"
                size={80}
                color={DataList.btnBg}
              />
              <Text style={{ fontSize: 17, fontWeight: "300" }}>
                Add Images
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
        style={{
          alignItems: "center",
          marginVertical: 20,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.Text}>Post</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </View>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DataList.primaryColor,
  },
  Form: {
    backgroundColor: "#fff",
    justifyContent: "center",
    marginHorizontal: 16,
    borderRadius: 16,
    flex:1
  },
  inputView: {
    marginHorizontal: 16,
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
  UploadImage: {
    marginVertical: 8,
    backgroundColor: DataList.LightColor,
    alignItems: "center",
    height: 200,
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    height: 200,
    width: "95%",
    resizeMode: "cover",
  },
  Text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
  },
  btn: {
    backgroundColor: DataList.btnBg,
    padding: 8,
    paddingHorizontal: 50,
    borderRadius: 35,
    elevation: 12,
  },
});
