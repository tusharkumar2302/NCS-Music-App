import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fonts';
import {fontSize, spacing} from '../constants/dimensions';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {formatSecondsToMinute} from '../utils';

const PlayerProgressBar = () => {
  const {duration, position} = useProgress();

  const progress = useSharedValue(0.25);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }

  const trackElapsedTime = formatSecondsToMinute(position);
  const trackRemainingTime = formatSecondsToMinute(duration - position);

  return (
    <View>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        <Text style={styles.timeText}>
          {'-'}
          {trackRemainingTime}
        </Text>
      </View>
      <Slider
        style={styles.sliderContainer}
        containerStyle={{
          height: 7,
          borderRadius: spacing.sm,
        }}
        theme={{
          maximumTrackTintColor: colors.maximumTintColor,
          minimumTrackTintColor: colors.minimumTintColor,
        }}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
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
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  timeText: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.regular,
    fontSize: fontSize.sm,
    opacity: 0.75,
  },
  sliderContainer: {
    marginVertical: spacing.xl,
  },
});
