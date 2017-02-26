import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const getRandomIntBetween = (start, end) => Math.floor(Math.random() * end) + start;

const isAndroid = Platform.OS === 'android';
const playlist = [
  {name: 'Todd Terry Remix', artist: 'Demi Devato', popularity: 5},
  {name: 'VARA Remix', artist: 'Demi Devato', popularity: 5},
  {name: 'Dave Aude Remix', artist: 'Demi Devato', popularity: 3},
  {name: 'Cahill Remix', artist: 'Demi Devato', popularity: 6},
  {name: 'Plastic Plates Remix', artist: 'Demi Devato', popularity: 9},
  {name: 'Mike Cruz Remix', artist: 'Demi Devato', popularity: 2},
];

class musicPlayerLandscape extends Component {
  state = {
    isLandscape: false,
    soundBarHeight: new Animated.Value(0),
    playlistAppear: playlist.map(playlistItem => new Animated.Value(0)),
    isPlayingIndex: 3,
  }

  componentDidMount() {
    this.animateSoundBars();
  }

  componentDidUpdate() {
    if (this.state.isLandscape) {
      this.state.playlistAppear.forEach(animation => animation.setValue(0));
      Animated.stagger(100, this.state.playlistAppear.map(animation => {
        return Animated.timing(animation, {toValue: 1, duration: 300});
      })).start();
    }
  }
  
  animateSoundBars = () => {
    Animated.timing(
      this.state.soundBarHeight, 
      {toValue: 1, duration: 30},
    ).start(() => {
      Animated.timing(
        this.state.soundBarHeight, 
        {toValue: 0.3, duration: 420},
      ).start(this.animateSoundBars);
    });
  }

  setOrientation = ({nativeEvent}) => {
    this.setState({isLandscape: nativeEvent.layout.width > nativeEvent.layout.height});
  }

  combineStyles = () => {
    return Object.keys(stylesGeneral).reduce((combinedStyles, val) => {
      combinedStyles[val] = stylesGeneral[val];
      if (this.state.isLandscape && stylesLandscape.hasOwnProperty(val)) {
        combinedStyles[val] = {...stylesGeneral[val], ...stylesLandscape[val]}
      }
      return combinedStyles;
    }, {});
  }
  
  render() {
    const {isLandscape, soundBarHeight, isPlayingIndex} = this.state;
    const styles = this.combineStyles();

    return (
      <View style={styles.container} onLayout={this.setOrientation}>  
        <StatusBar barStyle="light-content" />
        <View style={styles.innerContainer}>
          <View style={styles.navigation}>
            <Text style={styles.song}>{playlist[isPlayingIndex].name}</Text>
            <Text style={styles.artist}>{playlist[isPlayingIndex].artist}</Text>
          </View>
          <View style={styles.player}>
            {!isLandscape && <Image source={require('../img/demi-lovato.jpg')} style={styles.cover} />}
            {isLandscape ? (
              <View style={styles.playlist}>
                {playlist.map((playlistItem, index) => (
                  <Animated.View 
                    style={[
                      styles.playlistItem,
                      {
                        left: this.state.playlistAppear[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [Dimensions.get('window').width / 2, 0],
                        })
                      }
                    ]} 
                    key={playlistItem.name}
                  >
                    <View style={[styles.playlistItemSoundBars, isPlayingIndex === index && styles.playlistItemSoundBarsVisible]}>
                      {[...Array(3).keys()].map(index => (
                        <Animated.View 
                          key={index} 
                          style={[
                            styles.playlistItemSoundBar, 
                            {
                              height: soundBarHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, getRandomIntBetween(2, 10)],
                              }),
                            },
                          ]} 
                        />
                      ))}
                    </View>
                    <Text style={[styles.playlistItemText, isPlayingIndex === index && styles.playlistItemTextActive]}>{playlistItem.name}</Text>
                    <View style={styles.playlistItemPopularity}>
                      {[...Array(10).keys()].map(index => (
                        <View 
                          key={index} 
                          style={[
                            styles.playlistItemPopularityBar, 
                            index < playlistItem.popularity && styles.playlistItemPopularityBarActive,
                          ]} 
                        />
                      ))}
                    </View>
                  </Animated.View>
                ))}
              </View>
            ) : (
              <View style={styles.soundBars}>
                {[...Array(30).keys()].map(index => (
                  <Animated.View 
                    key={index} 
                    style={[
                      styles.soundBar, 
                      {
                        height: soundBarHeight.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, getRandomIntBetween(3, 70)],
                        }),
                      },
                    ]} 
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
  },
  coverBig: {
    width: null,
    flex: 1,
  },
  soundBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 70,
  },
  soundBar: {
    flex: 1,
    backgroundColor: '#426E93',
    marginRight: 5,
    borderRadius: 3,
  },
  playlist: {
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  playlistItemText: {
    color: '#AAAAAA',
    flex: 1,
  },
  playlistItemTextActive: {
    color: '#ffffff',
  },
  playlistItemSoundBars: {
    flexDirection: 'row',
    marginRight: 5,
    opacity: 0,
    alignItems: 'flex-end',
    height: 10,
  },
  playlistItemSoundBarsVisible: {
    opacity: 1,
  },
  playlistItemSoundBar: {
    width: 4,
    height: 10,
    marginRight: 3,
    backgroundColor: '#65CBDD',
  },
  playlistItemPopularity: {
    flexDirection: 'row',
  },
  playlistItemPopularityBar: {
    width: 2,
    height: 12,
    marginRight: 2,
    backgroundColor: '#33333E',
  },
  playlistItemPopularityBarActive: {
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
    marginHorizontal: 15,
  },
  nextPreviousButton: {
    width: 40,
    height: 40,
  },
};

export default musicPlayerLandscape;