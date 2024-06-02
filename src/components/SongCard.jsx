import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fonts';
import {fontSize, spacing} from '../constants/dimensions';

const imageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/577/325x325/1714555301_9XwoUbAlJy_artwork-Cradles.png';

const SongCard = ({containerStyle, imageStyle}) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle]}>
      <Image source={{uri: imageUrl}} style={[styles.coverImage, imageStyle]} />
      <Text style={styles.title} numberOfLines={1}>
        Cradles
      </Text>
      <Text style={styles.artist}>Sub Urban</Text>
    </TouchableOpacity>
  );
};

export default SongCard;

const styles = StyleSheet.create({
  container: {
    // height: 330,
    // width: 270,
  },
  coverImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.medium,
    textAlign: 'center',
    fontSize: fontSize.lg,
    paddingVertical: spacing.sm,
  },
  artist: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontFamily: fontFamilies.regular,
    fontSize: fontSize.md,
  },
});
