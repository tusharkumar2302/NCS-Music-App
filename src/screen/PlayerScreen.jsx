import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import {colors} from '../constants/colors';
import {iconSizes} from '../constants/dimensions';
import {spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import {fontSize} from '../constants/dimensions';
import {Image} from 'react-native';
import PlayerRepeatToggle from '../components/PlayerRepeatToggle';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import PlayerShuffleToggle from '../components/PlayerShuffleToggle';
import PlayerProgressBar from '../components/PlayerProgressBar';
import {
  GoToNextButton,
  GoToPreviousButton,
  PlayPauseButton,
} from '../components/PlayerControls';
import {useActiveTrack} from 'react-native-track-player';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import TrackPlayer from 'react-native-track-player';

// const imgUrl =
//   'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/287/325x325/mortals-feat-laura-brehm-1586948734-yFnA6l5Geq.jpg';
const PlayerScreen = () => {
  const navigation = useNavigation();
  const activeTrack = useActiveTrack();
  const isLiked = false;
  const [isMute, setIsMute] = useState(false);
  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setVolume();
  }, []);

  const setVolume = async () => {
    const volume = await TrackPlayer.getVolume();
    setIsMute(volume === 0 ? true : false);
  }

  if (!activeTrack) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}>
        <ActivityIndicator size={'large'} color={colors.iconPrimary} />
      </View>
    );
  }

  const handleToggleVolume = () => {
    TrackPlayer.setVolume(isMute ? 1 : 0);
    setIsMute(!isMute);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign
            name={'arrowleft'}
            color={colors.iconPrimary}
            size={iconSizes.lg}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Playing Now</Text>
      </View>
      <View style={styles.coverImageContainer}>
        <Image source={{uri: activeTrack.artwork}} style={styles.coverImage} />
      </View>

      <View style={styles.titleRowHeartContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{activeTrack.title}</Text>
          <Text style={styles.artist}>{activeTrack.artist}</Text>
        </View>
        <TouchableOpacity>
          <AntDesign
            name={isLiked ? 'heart' : 'hearto'}
            color={colors.iconSecondary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.playerControlContainer}>
        <TouchableOpacity
          style={styles.volumeWrapper}
          onPress={handleToggleVolume}>
          <Feather
            name={isMute ? 'volume-x' : 'volume-1'}
            color={colors.iconSecondary}
            size={iconSizes.lg}
          />
        </TouchableOpacity>

        <View style={styles.repeatShuffleWrapper}>
          <PlayerRepeatToggle />
          <PlayerShuffleToggle />
        </View>
      </View>

      <PlayerProgressBar />
      <View style={styles.playPauseContainer}>
        <GoToPreviousButton size={iconSizes.xl} />
        <PlayPauseButton size={iconSizes.xl} />
        <GoToNextButton size={iconSizes.xl} />
      </View>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    color: colors.textPrimary,
    justifyContent: 'center',
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
    flex: 1,
    textAlign: 'center',
  },
  coverImage: {
    height: 300,
    width: 300,
    borderRadius: 10,
  },
  coverImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  title: {
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.medium,
  },
  artist: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  titleRowHeartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  volumeWrapper: {
    flex: 1,
  },
  repeatShuffleWrapper: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  playPauseContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl,
    marginTop: spacing.xl,
  },
});
