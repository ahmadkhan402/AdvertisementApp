import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { DataList } from "../../DataBases/DataBase";

const OpenAdsScreen = () => {
  const route = useRoute();
  const { ads } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imgbg}>
        <Image source={{ uri: ads.ImageUrl }} style={styles.adImage} />
      </View>
      <View style={styles.desBg}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: "600",
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          Check ads Description
        </Text>
        <Text style={styles.adTitle}>
          <Text style={styles.txt}>Ads for: </Text>
          {ads.Title}
        </Text>
        <Text style={styles.adDescription}>
          <Text style={styles.txt}>Final Price: </Text>
          {ads.price} $
        </Text>
        <Text style={styles.adDescription}>
          <Text style={styles.txt}>Ads description: </Text>
          {ads.description}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.adDescription}>
            <Text style={styles.txt}>Contact:-: </Text>
            {ads.PhoneNumber}
          </Text>
          <Text style={styles.adDescription}>
            <Text style={styles.txt}>Email:-: </Text>
            {ads.Email}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DataList.LightColor,
  },
  imgbg: {
    marginTop: 0.5,
    backgroundColor: DataList.primaryColor,
    padding: 20,
    flex: 0.5,
    borderBottomEndRadius: 45,
    borderBottomLeftRadius: 45,
  },
  txt: {
    fontWeight: "500",
    fontSize: 14,
  },
  adImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  desBg: {
    marginTop: 0.5,
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    elevation: 12,
    borderRadius: 10,
    marginTop: 12,
    marginHorizontal: 16,
  },
  adTitle: {
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 2,
  },
  adDescription: {
    fontSize: 16,
    fontWeight: "800",
  },
});

export default OpenAdsScreen;
