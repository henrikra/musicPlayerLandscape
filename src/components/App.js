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
const isAndroid = Platform.OS === 'android';

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
    const {isLandscape} = this.state;

    return (
      <View style={styles.container} onLayout={this.setOrientation}>  
        <StatusBar barStyle="light-content" />
        <View style={styles.innerContainer}>
          <View style={styles.navigation}>
            <Text style={styles.song}>Dave Aude Remix</Text>
            <Text style={styles.artist}>Demi Lovato</Text>
          </View>
          <View style={styles.player}>
            {!isLandscape && <Image source={require('../img/demi-lovato.jpg')} style={styles.cover} />}
            {isLandscape ? (
              <View style={styles.playList}>
                <View style={styles.playListItem}>
                  <View style={styles.playListItemSoundBars}>
                    <View style={styles.playListItemSoundBar} />
                    <View style={styles.playListItemSoundBar} />
                    <View style={styles.playListItemSoundBar} />
                  </View>
                  <Text style={styles.playListItemText}>Dave Aude Remix</Text>
                  <View style={styles.playListItemPopularity}>
                    <View style={styles.playListItemPopularityBar} />
                    <View style={styles.playListItemPopularityBar} />
                    <View style={styles.playListItemPopularityBar} />
                    <View style={styles.playListItemPopularityBar} />
                    <View style={styles.playListItemPopularityBar} />
                    <View style={styles.playListItemPopularityBar} />
                    <View style={styles.playListItemPopularityBar} />
                    <View style={styles.playListItemPopularityBar} />
                    <View style={styles.playListItemPopularityBar} />
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.soundBars}>
                {soundBarHeights.map((height, index) => (
                  <View 
                    key={index} 
                    style={[styles.soundBar, {height}]} 
                  />
                ))}
              </View>
            )}
            <View style={styles.buttons}>
              <View style={styles.nextPreviousButton}>
                <Icon name="backward" size={isLandscape ? 15 : 20} color="#ffffff" style={{left: -1}} />
              </View>
              <View style={styles.playPauseButton}>
                <Icon name="pause" size={isLandscape ? 20 : 25} color="#ffffff" />
              </View>
              <View style={styles.nextPreviousButton}>
                <Icon name="forward" size={isLandscape ? 15 : 20} color="#ffffff" style={{left: 2}} />
              </View>
            </View>
          </View>
        </View>
        {isLandscape && (
          <View style={styles.coverBigContainer}>
            <Image source={require('../img/demi-lovato.jpg')} style={styles.coverBig} />
          </View>
        )}
      </View>
    );
  }
}

const stylesGeneral = {
  container: {
    flex: 1,
    backgroundColor: '#111122',
  },
  innerContainer: {
    flex: 1, 
  },
  navigation: {
    backgroundColor: '#232333',
    padding: 20,
    paddingTop: isAndroid ? 20 : 40,
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
  coverBigContainer: {
    flex: 0,
    backgroundColor: 'red',
  },
  coverBig: {
    width: null,
    flex: 1,
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
  playList: {
    alignSelf: 'stretch',
  },
  playListItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playListItemText: {
    color: '#AAAAAA',
    flex: 1,
  },
  playListItemSoundBars: {
    flexDirection: 'row',
    marginRight: 5,
  },
  playListItemSoundBar: {
    width: 3,
    height: 10,
    marginRight: 3,
    backgroundColor: '#65CBDD',
  },
  playListItemPopularity: {
    flexDirection: 'row',
  },
  playListItemPopularityBar: {
    width: 2,
    height: 12,
    marginRight: 2,
    backgroundColor: '#33333E',
  },
  playListItemPopularityBarActive: {
    backgroundColor: '#878889',
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
    flexDirection: 'row-reverse',
  },
  coverBigContainer: {
    flex: 1,
  },
  navigation: {
    alignItems: 'flex-start',
    paddingTop: isAndroid ? 0 : 30,
    paddingBottom: 20,
    paddingLeft: 40,
  },
  playPauseButton: {
    width: 50,
    height: 50,
  },
  nextPreviousButton: {
    width: 40,
    height: 40,
  },
};

export default musicPlayerLandscape;