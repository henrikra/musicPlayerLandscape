import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
} from 'react-native';

const getRandomIntBetween = (start, end) => Math.floor(Math.random() * end) + start;

const soundBarHeights = [...Array(50).keys()].map(() => getRandomIntBetween(1, 50));

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
          <View style={styles.soundBars}>
            {soundBarHeights.map((height, index) => (
              <View 
                key={index} 
                style={[styles.soundBar, {height, backgroundColor: index % 2 === 0 ? '#426E93' : '#111122'}]} 
              />
            ))}
          </View>
          <View style={styles.buttons}>
            <View style={styles.nextPreviousButton} />
            <View style={styles.playPauseButton} />
            <View style={styles.nextPreviousButton} />
          </View>
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
    padding: 30,
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
    marginBottom: 50,
  },
  soundBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  soundBar: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 30,
  },
  playPauseButton: {
    height: 60,
    width: 60,
    backgroundColor: '#232333',
    borderRadius: 30,
    marginHorizontal: 20,
  },
  nextPreviousButton: {
    height: 50,
    width: 50,
    backgroundColor: '#7854FF',
    borderRadius: 25,
  },
});

export default musicPlayerLandscape;