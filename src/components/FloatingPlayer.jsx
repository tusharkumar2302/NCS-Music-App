import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import {fontSize, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import MovingText from './MovingText';
import {
  GoToNextButton,
  GoToPreviousButton,
  PlayPauseButton,
} from './PlayerControls';
import {useNavigation, useTheme} from '@react-navigation/native';
import TrackPlayer, {useProgress} from 'react-native-track-player';

const imageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/687/325x325/red-lights-1717027255-5TrvbCgaUy.jpg';

const FloatingPlayer = () => {
  const {colors} = useTheme();
  const activeTrack = useActiveTrack();
  const {duration, position} = useProgress();
  const navigation = useNavigation();
  const progress = useSharedValue(0.2);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }

  const handleOpenPlayerScreen = () => {
    navigation.navigate('PLAYER_SCREEN');
  };
  return (
    <View>
      <View style={{zIndex: 1}}>
        <Slider
          style={styles.sliderContainer}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          theme={{
            maximumTrackTintColor: colors.maximumTintColor,
            minimumTrackTintColor: colors.minimumTintColor,
          }}
          renderBubble={() => null}
          onSlidingStart={() => (isSliding.value = true)}
          onValueChange={async value => {
            await TrackPlayer.seekTo(value * duration);
          }}
          onSlidingComplete={async value => {
            if (!isSliding.value) {
              return;
            }
            isSliding.value = false;
            await TrackPlayer.seekTo(value * duration);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.85}
        onPress={handleOpenPlayerScreen}>
        <Image source={{uri: activeTrack?.artwork}} style={styles.coverImage} />
        <View style={styles.titleContainer}>
          <MovingText
            text={activeTrack.title}
            animationThreshold={15}
            style={[styles.title, {color: colors.textPrimary}]}
          />
          <Text style={[styles.artist, {color: colors.textSecondary}]}>
            {activeTrack.artist}
          </Text>
        </View>
        <View style={styles.playerControlContainer}>
          <GoToPreviousButton />
          <PlayPauseButton />
          <GoToNextButton />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  coverImage: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
  },
  title: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    overflow: 'hidden',
    marginLeft: spacing.sm,
    marginRight: spacing.lg,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artist: {
    fontSize: fontSize.md,
  },
  playerControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingRight: spacing.lg,
  },
});
