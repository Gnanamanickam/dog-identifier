import React, { Component } from 'react'
import { View, Text, Image, Button, StyleSheet, Spacer, ImageBackground } from 'react-native'
import * as ImagePicker from "react-native-image-picker"
import * as Permissions from 'react-native';
import axios from "axios";
import imageToBase64 from 'image-to-base64/browser';
// import RNFetchBlob from 'rn-fetch-blob';
// import RNFS from 'react-native-fs';
// import fs from 'fs'
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons';
// import { createStackNavigator, createAppContainer } from 'react-navigation'; 


export default class Upload extends Component {

  static navigationOptions = {

    title: 'Dog Breed Identifier',

    headerStyle: {
      backgroundColor: '#FE434C',
    },

    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };


  state = {
    photo: null,
    image: true,
    photoName: null,
    displayApp: false,
  }


  launchCamera = () => {
    let options = {
      includeBase64: true,
      // storageOptions: {
      //   skipBackup: false,
      //   path: 'images',
      // },
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.uri) {
        this.setState({ photo: response })
        console.log(this.state.photo.base64);
        this.setState({ image: null })
      }

    });

  }


  selectImage = () => {
    const options = {
      includeBase64: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
        console.log(this.state.photo.base64);
        this.setState({ image: null })
      }
    })
  }

  UploadImage = () => {

    axios
      .post("http://10.0.2.2:5000/image", createFormData(this.state.photo.base64), {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      })

      .then(response => {
        this.setState({ photoName: response.data })
        alert(this.state.photoName);
        console.log(this.state.photoName)
        // this.setState({ photo: null });

      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  onSlidesDone = () => {
    this.setState({ displayApp: true });
  };
  onSlidesSkip = () => {
    this.setState({ displayApp: true });
  };

  render() {
    const { photo } = this.state
    const { image } = this.state
    const { photoName } = this.state
    const { displayApp } = this.state
    if (this.state.displayApp) {
      return (

        <View style={{ flex: 1 }}>
          <View style={{ flexGrow: 1, backgroundColor: 'grey', alignItems: 'center' }}>
            {image && (
              < ImageBackground
                source={require('../images/dog.jpg')}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  aspectRatio: 1,

                }}
              />
            )}
            {photo && (
              <React.Fragment>
                <View style={styles.space} />
                <Image
                  source={{ uri: photo.uri }}
                  style={{ width: 400, height: 450, resizeMode: 'contain', }}
                />
                <View style={styles.space} />
                <View style={styles.space} />
                <Button color="#FE434C" title="Upload" onPress={this.UploadImage} />
              </React.Fragment>
            )}


          </View>
          <View style={{ height: 150, backgroundColor: 'white', }}>
            <View style={styles.space} />
            <Button color="#FE434C" icon={{ name: 'lock' }} title="Camera" onPress={this.launchCamera} />
            <View style={styles.space} />
            <Button color="#FE434C" icon={{ name: 'face' }} title="Gallery" onPress={this.selectImage} />
          </View>
        </View>

      )
    }
    else {
      return (
        <AppIntroSlider renderItem={RenderItem} data={slides} onDone={this.onSlidesDone}
          showSkipButton={true}
          onSkip={this.onSlidesSkip} />
      );
    }
  }
}

const askForPermission = async () => {
  const permissionResult = await Permissions.askAsync(Permissions.CAMERA)
  if (permissionResult.status !== 'granted') {
    Alert.alert('Permission Denied', [{ text: 'ok' }])
    return false
  }
  return true
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },

  space: {
    width: 20,
    height: 20,
  },
  color: {
    backgroundColor: '#FFFFFF',
  },

  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },

  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
    fontWeight: 'bold'
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  
  image: {
    width: 500,
    height: 450,
    resizeMode: 'contain',
  }
});

const createFormData = (photo) => {
  const data = new FormData();
  data.append("file",photo);
  console.log(photo);

  return data;
};


const headers = {
  accept: "image/jpeg",
};

const RenderItem = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ff7f50',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 30,
      }}>
      <Text style={styles.title}>{item.title}</Text>
      <Image style={styles.image} source={item.image} />
      <View style={styles.space} />
      <Text style={styles.introTextStyle}>{item.text}</Text>
    </View>
  );
};


const slides = [
  {
    key: 'k1',
    title: 'DOG BREED IDENTIFIER',
    text: 'Upload A Clean Image To Identify The Dog Breed',
    image: require('../images/dogSlide.png'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#F7BB64',
  },

  
];