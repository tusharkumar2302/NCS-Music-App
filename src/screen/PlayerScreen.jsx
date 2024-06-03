import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
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

const imgUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/287/325x325/mortals-feat-laura-brehm-1586948734-yFnA6l5Geq.jpg';
const PlayerScreen = () => {
  const isLiked = false;
  const isMute = false;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <AntDesign
            name={'arrowleft'}
            color={colors.iconPrimary}
            size={iconSizes.lg}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Playing Now</Text>
      </View>
      <View style={styles.coverImageContainer}>
        <Image source={{uri: imgUrl}} style={styles.coverImage} />
      </View>

      <View style={styles.titleRowHeartContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mortals (feat. Laura Brehm)</Text>
          <Text style={styles.artist}>Warriyo, Laura Brehm</Text>
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
        <TouchableOpacity style={styles.volumeWrapper}>
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
        <GoToPreviousButton size={iconSizes.xl}/>
        <PlayPauseButton size={iconSizes.xl}/>
        <GoToNextButton size={iconSizes.xl}/>
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
  }
});
