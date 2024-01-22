import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { DataList } from "../../DataBases/DataBase";
import { AntDesign } from "@expo/vector-icons";
import { collection, doc, getDoc, getDocs, orderBy } from "firebase/firestore";
import { auth, db } from "../../firbase";
import { useIsFocused } from "@react-navigation/native";


const HomePageScreen = ({ navigation }) => {
  const [Data, setData] = useState([]);
  const [PostDataList, setPostDataList] = useState([]);

  useEffect(() => {
    GetDataFireStore();
  }, []);

  const GetDataFireStore = async () => {
    const UserRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(UserRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchImages = async () => {
      // Fetch posts from the Firestore collection "Posts"
      let PostDataArr = [];
      console.log(PostDataArr);
      const querySnapshot = await getDocs(
        collection(db, "PostData"),
        orderBy("createdAt", "desc")
      );
      // Filter and set nearby posts
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        console.log("Post are ", post);

        PostDataArr.push(post);
      });
      PostDataArr.sort((a, b) => a.price - b.price);
      setPostDataList(PostDataArr);
    };

    if (isFocused) {
      fetchImages();
    }
  }, [isFocused]);

  const renderAdItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.adContainer}
      onPress={() => navigation.navigate("AdDetails", { ads: item })}
      >
      <View style={{ justifyContent: "center", paddingHorizontal: 5 }}>
        <Text style={styles.adTitle}>{item.Title}</Text>
      </View>
      <Image source={{ uri: item.ImageUrl }} style={styles.adImage} />
      <View
        style={{
          position: "absolute",
          width: "30%",
          height: "20%",
          backgroundColor: DataList.primaryColor,
          top: 0,
          right: 0,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "#fff",
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          {item.price} $
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.txt3}>
        Hey:<Text style={styles.txt2}> {Data.username}</Text>
      </Text>
      <Text style={styles.txt}>Check all advertisements</Text>

      <FlatList
        data={PostDataList}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderAdItem}
        numColumns={2}
        contentContainerStyle={styles.adListContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.Tab}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Post")}
        >
          <AntDesign name="pluscircle" size={70} color={DataList.btnBg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: DataList.primaryColor,
  },
  txt2: {
    textAlign: "left",
    marginTop: 16,
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 16,
    color: "#fff",
  },
  txt3: {
    textAlign: "left",
    marginTop: 16,
    fontSize: 18,
    fontWeight: "200",
    marginBottom: 16,
    color: "#fff",
  },
  txt: {
    textAlign: "left",
    marginVertical: 16,
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 16,
    color: "#fff",
  },
  adListContainer: {
    justifyContent: "space-between",
  },
  adContainer: {
    alignContent: "center",
    marginLeft: 8,
    backgroundColor: "#F3F8FF",
    borderRadius: 8,
    marginBottom: 16,
    width: "45%",
    elevation: 12,
    padding: 2,
  },
  adImage: {
    width: "100%",
    height: 130,
    resizeMode: "cover",
    borderRadius: 8,
  },
  adTitle: {
    fontSize: 14,
    paddingRight: 20,
    fontWeight: "bold",
    paddingVertical: 7,
  },
  adDescription: {
    fontSize: 16,
  },
  Tab: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  addButton: {
    height: 90,
    borderColor: "#fff",
    borderRadius: 45,
    borderWidth: 1,
    padding: 8,
    backgroundColor: "#fff",
  },
});

export default HomePageScreen;
