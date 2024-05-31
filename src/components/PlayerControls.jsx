import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {iconSizes} from '../constants/dimensions';
import {colors} from '../constants/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export const GoToPreviousButton = ({size = iconSizes.lg}) => {
  return (
    <TouchableOpacity activeOpacity={0.85}>
      <FontAwesome6 name={'backward'} size={size} color={colors.iconPrimary} />
    </TouchableOpacity>
  );
};

export const PlayPauseButton = ({size = iconSizes.lg}) => {
  const isPlaying = true;
  return (
    <TouchableOpacity activeOpacity={0.85}>
      <FontAwesome6
        name={isPlaying ? 'pause' : 'play'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const GoToNextButton = ({size = iconSizes.lg}) => {
  return (
    <TouchableOpacity activeOpacity={0.85}>
      <FontAwesome6 name={'forward'} size={size} color={colors.iconPrimary} />
    </TouchableOpacity>
  );
};
