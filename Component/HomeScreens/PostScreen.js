import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { DataList } from "../../DataBases/DataBase";
import {
  MaterialIcons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../../firbase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Icon from "react-native-vector-icons/MaterialIcons";

const PostScreen = ({ navigation }) => {
  const [Title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [PhoneNumber, setPhoneNumber] = useState(null);
  const [BlobImage, setBlobImage] = useState("");

  let x = Title && description && price && image;

  const showToast = (ErrorMessge) => {
    ToastAndroid.showWithGravityAndOffset(
      ErrorMessge,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
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
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      setBlobImage(blob);
    }
  };

  const StoreDataToFirebase = async () => {
    const metadata = {
      contentType: "image/jpeg",
    };
    console.log("this is blob image", BlobImage);
    const storageRef = ref(storage, "AdsImages/" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, BlobImage, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          StoreUserData(Title, description, price, downloadURL);
          //setImageUrl(downloadURL)
        });
      }
    );
  };
  const StoreUserData = async (Title, description, price, downloadURL) => {
    try {
      const userRef = await addDoc(collection(db, "PostData"), {
        Title,
        description,
        price,
        Email: auth.currentUser.email,
        ImageUrl: downloadURL,
        createdAt: new Date(),
        PhoneNumber,
      });

      console.log("Post stored successfully:", userRef.id); // Access the auto-generated ID
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error storing user data:", error);
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
        <ScrollView>
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
              value={price}
              style={styles.input}
              onChangeText={(e) => setPrice(e)}
            />
          </View>
          <View style={styles.inputView}>
            <Entypo
              name="phone"
              style={styles.Icon}
              size={38}
              color={DataList.btnBg}
            />
            <TextInput
              keyboardType="phone-pad"
              placeholder="PhoneNumber"
              style={styles.input}
              onChangeText={(e) => setPhoneNumber(e)}
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
            {x ? (
              <TouchableOpacity
                style={styles.btn}
                onPress={StoreDataToFirebase}
              >
                <Text style={styles.Text}>Post</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => showToast("Please fill all form data")}
              >
                <Text style={styles.Text}>Post</Text>
              </TouchableOpacity>
            )}
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
    flex: 1,
    overflow: "hidden",
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
