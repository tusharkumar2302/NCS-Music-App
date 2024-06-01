import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';
import {fontSize, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import {GoToNextButton, GoToPreviousButton} from './PlayerControls';
import {PlayPauseButton} from './PlayerControls';
import {useSharedValue} from 'react-native-reanimated';
import {Slider} from 'react-native-awesome-slider';

const imageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/687/325x325/red-lights-1717027255-5TrvbCgaUy.jpg';

const FloatingPlayer = () => {
  const progress = useSharedValue(0.2);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  return (
    <View>
      <View styl={{zIndex:1}}>
        <Slider
          style={styles.container}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          theme={{
            maximumTrackTintColor: colors.maximumTintColor,
            minimumTrackTintColor: colors.minimumTintColor,
          }}
          renderBubble={() => <View />}
        />
      </View>
      <TouchableOpacity style={styles.container} activeOpacity={0.85}>
        <Image source={{uri: imageUrl}} style={styles.coverImage} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Red Lights</Text>
          <Text style={styles.artist}>Ella Rosa, Cafe Disko</Text>
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
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artist: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
  playerControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingRight: spacing.lg,
  },
});
