
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import RNCamera from 'react-native-camera';
import { Icon } from 'native-base';
import { dirPicutures } from './dirStorage';
const moment = require('moment');

let { height, width } = Dimensions.get('window');
let orientation = height > width ? 'Portrait' : 'Landscape';

const moveAttachment = async (filePath, newFilepath) => {
  return new Promise((resolve, reject) => {
    RNFS.mkdir(dirPicutures)
      .then(() => {
        RNFS.moveFile(filePath, newFilepath)
          .then(() => {
            resolve(true);
          })
          .catch(error => {
            console.log('error', error);
            reject(error);
          });
      }) 
      .catch(err => {
        console.log('file path not created error', err);
        reject(err);
      });
  });
};

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation
    };
  }

  componentWillMount() {
    Dimensions.addEventListener('change', this.handleOrientationChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleOrientationChange);
  }

  handleOrientationChange = dimensions => {
    ({ height, width } = dimensions.window);
    orientation = height > width ? 'Portrait' : 'Landscape';
    this.setState({ orientation });
  };

  saveImage = async filePath => {
    try {
      const imageName = `${moment().format('Dog')}.jpg`;
      const newFilepath = `${dirPicutures}/${imageName}`;
      await moveAttachment(filePath, newFilepath);

    } catch (error) {
      console.log(error);
    }
  };

  takePicture() {
    this.camera
      .capture()
      .then(data => {
        this.saveImage(data.path);
      })
      .catch(err => {
        console.error('Capture Picture Error', err);
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" translucent />

        <RNCamera
          captureTarget={camera.constants.CaptureTarget.disk}
          ref={ cam => {
            this.camera = cam;
          }}
          style={styles.container}
          aspect={camera.constants.Aspect.fill}
          orientation="auto"
        >
          <View
            style={
              this.state.orientation === 'Portrait' ? (
                styles.buttonContainerPortrait
              ) : (
                styles.buttonContainerLandscape
              )
            }
          >
            <TouchableOpacity
              onPress={() => this.takePicture()}
              style={
                this.state.orientation === 'Portrait' ? (
                  styles.buttonPortrait
                ) : (
                  styles.buttonLandscape
                )
              }
            >
              <Icon name="camera" style={{ fontSize: 40, color: 'white' }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={
                this.state.orientation === 'Portrait' ? (
                  styles.buttonPortrait
                ) : (
                  styles.buttonLandscape
                )
              }
            >
              <Icon
                name="close-circle"
                style={{ fontSize: 40, color: 'white' }}
              />
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainerPortrait: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  buttonContainerLandscape: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  buttonPortrait: {
    backgroundColor: 'transparent',
    padding: 5,
    marginHorizontal: 20
  },
  buttonLandscape: {
    backgroundColor: 'transparent',
    padding: 5,
    marginVertical: 20
  }
});

export default Camera;