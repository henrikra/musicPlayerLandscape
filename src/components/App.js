import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const getRandomIntBetween = (start, end) => Math.floor(Math.random() * end) + start;

const soundBarHeights = [...Array(30).keys()].map(() => getRandomIntBetween(1, 50));

class musicPlayerLandscape extends Component {
  state = {
    isLandscape: false,
  }

  setOrientation = ({nativeEvent}) => {
    this.setState({isLandscape: nativeEvent.layout.width > nativeEvent.layout.height});
  }
  
  render() {
    const styles = Object.keys(stylesGeneral).reduce((acc, val) => {
      acc[val] = stylesGeneral[val];
      if (this.state.isLandscape && stylesLandscape.hasOwnProperty(val)) {
        acc[val] = {...stylesGeneral[val], ...stylesLandscape[val]}
      }
      return acc;
    }, {});

    return (
      <View style={styles.container} onLayout={this.setOrientation}>  
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
                style={[styles.soundBar, {height}]} 
              />
            ))}
          </View>
          <View style={styles.buttons}>
            <View style={styles.nextPreviousButton}>
              <Icon name="backward" size={20} color="#ffffff" style={{left: -1}} />
            </View>
            <View style={styles.playPauseButton}>
              <Icon name="pause" size={25} color="#ffffff" />
            </View>
            <View style={styles.nextPreviousButton}>
              <Icon name="forward" size={20} color="#ffffff" style={{left: 2}} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const stylesGeneral = {
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
    backgroundColor: '#426E93',
    marginRight: 5,
    borderRadius: 3,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 30,
  },
  playPauseButton: {
    height: 60,
    width: 60,
    backgroundColor: '#33333E',
    borderRadius: 30,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextPreviousButton: {
    height: 50,
    width: 50,
    backgroundColor: '#7854FF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const stylesLandscape = {
  container: {
    backgroundColor: 'red',
  },
};

export default musicPlayerLandscape;