import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  navigation: {
    backgroundColor: '#232333',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    alignItems: 'center',
  },
  song: {
    color: '#BEB7F3',
    fontSize: 16,
  },
  artist: {
    color: '#ffffff',
  }
});

export default musicPlayerLandscape;