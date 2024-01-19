import React, { useState, useEffect } from 'react';
import { Button, ScrollView, Image, Text, TextInput, TouchableOpacity, View,StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db, auth, storage } from '../../firebase';
import { collection, addDoc } from "firebase/firestore"; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapShow from './MapShow';
import { useNavigation } from '@react-navigation/native';


const PostScreen = ()=>{

  const navigation = useNavigation()
  const [image, setImage] = useState(null)
  const [blobImage, setblob] = useState(null)
  
  const [postContent, setPostContent] = useState('');
  const [title, setTitle] = useState('');
  const [namcription, setnamcrioption] = useState('');
  const [selectedNumber, setSelectedNumber] = useState();
  const [PickUpPoint, setPicupPoint] = useState('')
  const [Other, setOther] =useState('')
  const [Time, settime] =useState('')
  const [DonorName, setDonorName] =useState('')
  const [Email, setEmail] =useState('')

  let x = image && title && namcription && selectedNumber && PickUpPoint && Time && Email


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,   
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      setblob(blob)
    }
  };
  const uploadImage = async () => {
    const metadata = {
      contentType: 'image/jpeg'
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'DonationPosts/' + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       alert('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
           SetDataToFireStore(title,namcription,downloadURL)
          
        },[]);
        alert("Post is Uploaded")
    navigation.navigate("ShowPost")
        
      }
     
    );
    
  }
  const SetDataToFireStore = async (title,namcription,downloadURL)=>{
    try {
      const docRef = await addDoc(collection(db, "Posts"), {
      DonorName : DonorName,
      Email : Email,
      Title: title,
      Description: namcription,
      ImageUrl: downloadURL,
      Id:auth.currentUser.uid

    });
      
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const handleNumberPress = (number) => {
    setSelectedNumber(number);
  }
  const getData =(value)=>{
console.log("there is the value",value)
setPicupPoint(value)
  }
  const [id, setid] = useState('')
  const [ShowImage, setShowImage] = useState('')
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10, backgroundColor: "#E1EBEE", marginTop: 23, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={pickImage}>
            <Text style={{ borderColor: "#2c2c6c", borderStyle: "dashed", borderWidth: 2, padding: "5%", marginLeft: 12, }}>
              <MaterialCommunityIcons name="camera-plus" size={65} color="#5D8AA8" />
            </Text>
          </TouchableOpacity>
          <View style={styles.ImaageText}>
            {image ? <Text style={{ color: "green" }}>Image Selected</Text> :
            <Text style={{ color: "#800020" }}>Please add an Image</Text> }
          </View>

        </View>


        <View>
          <View style={{ marginTop: 7 }}>
            <View style={styles.FormContainer}>
            <View style={styles.TextInput2}>
                <TextInput
                value={DonorName}
                  editable
                  multiline
                  numberOfLines={2}
                  onChangeText={nam => setDonorName(nam)}
                  placeholder='Donor Name'
                  style={{ padding: 16 }}
                />
              </View>
              <View style={styles.TextInput2}>
                <TextInput
                value={Email}
                  editable
                  multiline
                  numberOfLines={2}
                  onChangeText={e => setEmail(e)}
                  placeholder='Donor Email'
                  style={{ padding: 16 }}
                />
              </View>
              <View style={styles.TextInput1}>
                <TextInput
                value={title}
                  editable
                  multiline
                  numberOfLines={2}
                  onChangeText={text => setTitle(text)}
                  placeholder='Title'
                  style={{ padding: 16 }}
                />
              </View>
              <View style={styles.TextInput2}>
                <TextInput
                value={namcription}
                  editable
                  multiline
                  numberOfLines={2}
                  onChangeText={nam => setnamcrioption(nam)}
                  placeholder='namcription'
                  style={{ padding: 16 }}
                />
              </View>

              <View style={{ paddingVertical: "3%" }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "#5D8AA8" }}>Quantity</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {numbers.map((number) => (
                  <TouchableOpacity
                    key={number}
                    onPress={() => handleNumberPress(number)}
                    style={[
                      styles.numberButton,
                      selectedNumber === number && styles.selectedNumberButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.numberText,
                        selectedNumber === number && styles.selectedNumberText,
                      ]}
                    >
                      {number}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.TextInput2}>
                <TextInput
                  editable
                  onChangeText={other => setOther(other)}
                  placeholder='Other'
                  style={{ padding: 13 }}
                />
              </View>

              <View style={styles.TextInput3}>
                <View style={{ paddingVertical: "1%" }}>
                  <Text style={{ marginTop: 12, fontSize: 20, fontWeight: "bold", color: "#5D8AA8" }}>Pick-Up times</Text>
                </View>
                <TextInput
                  editable
                  onChangeText={time => settime(time)}
                  placeholder='e.g. Today from 3-5'
                  style={{ padding: 13 }}
                />
              </View>

            </View>
          </View>
          {x ? (
            <TouchableOpacity style={styles.Submit} onPress={uploadImage }>
            <Text style={styles.SubmitText}>Submit</Text>
          </TouchableOpacity>
          ): (
            <TouchableOpacity disabled={true} style={styles.Submitd} >
            <Text style={styles.SubmitText}>Submit</Text>
          </TouchableOpacity>
          )}
          
        </View>
      
      </ScrollView>
      <MapShow  getPointData= {getData}/>


    </View>
  );
};

export default PostScreen
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImaageText: {

    justifyContent: "center",
    marginLeft: "4%",
  },
  ImageSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center"
  },
  Submitd: {
marginBottom:20,
    width: "80%",
    borderRadius: 17,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: "9%",
    backgroundColor: "#4db5ff",
    elevation: 40,
    opacity:0.6
  },
  Submit: {
    marginBottom:20,
    width: "80%",
    borderRadius: 17,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: "9%",
    backgroundColor: "#4db5ff",
    elevation: 40,
  },
  TextInput1: {

    borderBottomWidth: 1,
  },
  TextInput2: {

    borderBottomWidth: 1,
  },
  TextInput3: {

    borderBottomWidth: 1,
  },
  FormContainer: {
    paddingHorizontal: 10,
    paddingVertical: 1,
    backgroundColor: '#E1EBEE',
  },
  numberButton: {
    padding: 10,
    margin: 3,
    width: 45,
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: '#fff',
  },
  selectedNumberButton: {
    backgroundColor: 'rgba(77,181,255,0.4)',
  },
  numberText: {
    fontSize: 18,
    color: '#444',
  },
  selectedNumberText: {
    color: '#fff',
  },

})
