import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
} from 'react-native';

class musicPlayerLandscape extends Component {
  render() {
    return (
      <View style={styles.container}>  
        <StatusBar barStyle="light-content" />
        <View style={styles.navigation}>
          <Text style={styles.song}>Dave Aude Remix</Text>
          <Text style={styles.artist}>Demi Lovato</Text>
        </View>
        <View style={styles.player}>
          <Image source={require('../img/demi-lovato.jpg')} style={styles.cover} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111122',
  },
  navigation: {
    backgroundColor: '#232333',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    alignItems: 'center',
  },
  player: {
    alignItems: 'center',
  },
  song: {
    color: '#BEB7F3',
    fontSize: 16,
  },
  artist: {
    color: '#ffffff',
  },
  cover: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 30,
  },
});

export default musicPlayerLandscape;