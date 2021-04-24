import React, { Component } from 'react'
import { View, Text, Image, Button,  StyleSheet, Spacer, ImageBackground } from 'react-native'
import * as ImagePicker from "react-native-image-picker"
import * as Permissions from 'react-native';
import axios from "axios";
import { RNCamera } from 'react-native-camera';


export default class Upload extends Component {
  state = {
    photo: null,
    image: true,
    photoName : null,
  }

  

  // clickImage = async () => {

	// 	const hasPermission = await askForPermission()
	// 	if (!hasPermission) {
	// 		return
	// 	} else {

	// 		let image = await ImagePicker.launchCameraAsync({
	// 			mediaTypes: ImagePicker.MediaTypeOptions.Images,
	// 			allowsEditing: true,
	// 			aspect: [3, 3],
	// 			quality: 1,
	// 			base64: true,
	// 		})
  //   }
  // }


  selectImage = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
        this.setState({image: null})
      }
    })
  }

  UploadImage = () => {
    
    axios
    .post("http://10.0.2.2:5000/image", createFormData(this.state.photo),{
      headers: {
        'Content-Type': this.state.photo.type
      }
    })
    // fetch(" http://192.168.0.12:5000/image", {
    //   method: "POST",
    //   body: createFormData(this.state.photo)
    // })
      .then(response => {
        this.setState({photoName : response.data })
        alert(this.state.photoName);
        console.log(this.state.photoName)
        // this.setState({ photo: null });
        
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  render() {
    const { photo } = this.state
    const { image } = this.state
    const { photoName } = this.state
    return (

          <View style={{flex: 1}}>
      <View style={{flexGrow: 1, backgroundColor: 'grey', alignItems: 'center'}}>
      <Text style={{}}>Dog Identifier</Text>
      {image && (
      < Image
        source={require('../images/dog.jpg')} 
        style={{
          position: 'absolute',
            width: '100%',
            height: '100%',
            aspectRatio: 1,
        
        }}      /> )}
{photo && (
          <React.Fragment>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
            <Button title="Upload" onPress={this.UploadImage} />
          </React.Fragment>
        )}

{/* {photoName && (
  <Text style={{}}>{photoName}</Text>
  )} */}

    </View>
    <View style={{height: 100, backgroundColor: 'white', }}>
    {/* <Button title="Camera" onPress={this.clickImage} /> */}
    
    <Button title="Gallery" onPress={this.selectImage} />
    </View>
  </View>

    )
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
});

const fd = new FormData();

const createFormData = (photo, body) => {
  const data = new FormData();
  data.append("file", photo.uri);
console.log(photo);
  // data.append("photo", {
  //   name: 'image.jpg',
  //   type: photo.type,
  //   uri: photo.uri,
  // });

  return data;
};
  const headers = {
    accept : "image/jpeg",
  };




  /* <View style={{ flex: 1}}>
      <ImageBackground
      source={require('../images/dog.jpg')}
      style={{
        position: 'absolute',
          width: '100%',
          height: '100%',
          aspectRatio: 1,   
      }} 
    >
      <Spacer size={200} />
      <View>
      <View style={{flex: 1}}>
          <Button
            title={'Camera'}
            icon={{ name: 'lock' }}
            onPress={this.selectImage}
          />
        </View>
      </View>

      <Spacer size={10} />


      <View>
      <View style={{flex: 1}}>
          <Button
            title={'Gallery'}
            backgroundColor={'#FB6567'}
            icon={{ name: 'face' }}
            onPress={this.selectImage}
          />
        </View>
      </View>

    </ImageBackground>
    </View> */