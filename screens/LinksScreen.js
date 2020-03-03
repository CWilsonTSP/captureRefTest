import React, {Component } from 'react';
import {
    Button, 
    Alert,
    Image, 
    View, 
    Text, 
    ScrollView, 
    StyleSheet,
    Dimensions
}
from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as Sharing from 'expo-sharing';

// export async getCameraRollPermissions() => {
//     console.log("permissions?")
//     const { Permissions } = Expo;
//     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//     if (status === 'granted'){
//         // creates the image with the uri
//         const asset = MediaLibrary.createAssetAsync(uri);
//     } else {
//         // handle permissions denied
//         console.log("Permission denied for CAMERA_ROLL")
//     }   
// }

export default class LinksScreen extends Component {
    onCapture = uri => {
        console.log("grabbed image with uri ", uri);
        Sharing.shareAsync(uri);
         
    }

    onImageLoad = () => {
        this.refs.viewshot.capture().then(uri => {
            console.log(uri);
            uri = "file://" + uri;
            console.log(uri);
            // const { status } = Permissions.askAsync(Permissions.CAMERA_ROLL);
            // const asset = MediaLibrary.createAssetAsync(uri);
            //
            // Alert.alert("Saved image of view!")

            Sharing.shareAsync(uri);

        })
    }

    render(){

  return (
    <View style={styles.container}>
        <Button title="Share Image" onPress={this.onImageLoad}/>
        <ViewShot style={styles.hidden} ref="viewshot">
            <Image ref="image" style={{width:1920, height:1080}} source={require('../assets/images/pokemon.png')}/>
        </ViewShot>
    </View>
  );

 }
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const window = Dimensions.get('window')

const styles = StyleSheet.create({
  fixed: {
    width: 1920,
    height: 1080,
    backgroundColor: '#fff',
},
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  hidden:{
    width: 1920,
    height: 1080,
    backgroundColor: '#fff',
    top: window.height,
    bottom: -window.height,
  }
});
