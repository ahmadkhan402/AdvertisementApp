import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DataList } from '../../DataBases/DataBase';
import { AntDesign } from '@expo/vector-icons';

// Sample data for advertisements
const adsData = [
  {
    id: '1',
    title: 'Furniture Sale',
    description: 'Elegant furniture set for sale. In good condition.',
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/furniture-sales-advertisement-design-template-e70e40546fefb1acf515b1b1300a3fcd_screen.jpg?ts=1599337588",
    contactInfo: 'Contact: John Doe, john@example.com',
  },
  {
    id: '2',
    title: 'Car for Sale',
    description: '2019 Model, low mileage, excellent condition.',
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/car-sale-design-template-09c537c08aed49aac25d51ecc29e5aef_screen.jpg?ts=1615210663",
        contactInfo: 'Contact: Jane Doe, jane@example.com',
  },
  {
    id: '3',
    title: 'Car for Sale',
    description: '2019 Model, low mileage, excellent condition.',
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/car-sale-design-template-09c537c08aed49aac25d51ecc29e5aef_screen.jpg?ts=1615210663",
        contactInfo: 'Contact: Jane Doe, jane@example.com',
  },
  {
    id: '4',
    title: 'Furniture Sale',
    description: 'Elegant furniture set for sale. In good condition.',
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/furniture-sales-advertisement-design-template-e70e40546fefb1acf515b1b1300a3fcd_screen.jpg?ts=1599337588",
    contactInfo: 'Contact: John Doe, john@example.com',
  },
  {
    id: '5',
    title: 'Car for Sale',
    description: '2019 Model, low mileage, excellent condition.',
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/car-sale-design-template-09c537c08aed49aac25d51ecc29e5aef_screen.jpg?ts=1615210663",
        contactInfo: 'Contact: Jane Doe, jane@example.com',
  },
  {
    id: '5',
    title: 'Car for Sale',
    description: '2019 Model, low mileage, excellent condition.',
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/car-sale-design-template-09c537c08aed49aac25d51ecc29e5aef_screen.jpg?ts=1615210663",
        contactInfo: 'Contact: Jane Doe, jane@example.com',
  },

  // Add more ad objects as needed
];

const HomePageScreen = ({ navigation }) => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    setAds(adsData);
  }, []);

  const renderAdItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.adContainer}
      onPress={() => navigation.navigate('AdDetails', { ad: item })}
    >
      <Image source={{ uri: item.image }} style={styles.adImage} />
      <Text style={styles.adTitle}>{item.title}</Text>
      <Text style={styles.adDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    <Text style={styles.txt3}>Hey: 
    <Text style={styles.txt2}> Ahmad</Text>
    </Text>
      <Text style={styles.txt}>Check all advertisements</Text>
      <FlatList
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={renderAdItem}
       numColumns={2}
        contentContainerStyle={styles.adListContainer}
       showsVerticalScrollIndicator={false}
      />

      <View style={styles.Tab}>
        <TouchableOpacity style={styles.addButton} onPress={()=>navigation.navigate("Post")}>
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
  txt2:{
    textAlign:"left",
    marginTop:16,
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 16,
    color: '#fff',
  },
  txt3:{
    textAlign:"left",
    marginTop:16,
    fontSize: 18,
    fontWeight: '200',
    marginBottom: 16,
    color: '#fff',
  }
  ,
    txt: {
    textAlign:"left",
    marginVertical:16,
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 16,
    color: '#fff',
  },
  adListContainer: {
    justifyContent: 'space-between',
  },
  adContainer :{
alignContent:"center",
    marginLeft:8,
    backgroundColor: '#F3F8FF',
   padding:8,
    borderRadius: 8,
    marginBottom: 16,
    width: '45%', 
    elevation:12
  },
  adImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
