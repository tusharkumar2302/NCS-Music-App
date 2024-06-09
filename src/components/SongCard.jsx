import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fonts';
import {fontSize, spacing} from '../constants/dimensions';
import TrackPlayer from 'react-native-track-player';

const imageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/577/325x325/1714555301_9XwoUbAlJy_artwork-Cradles.png';

const SongCard = ({item, containerStyle, imageStyle , handlePlay}) => {
  // const handlePlay = async (item) => {
    // console.log('item: ', item);
    // await TrackPlayer.add(item);
    // await TrackPlayer.play();
    // await TrackPlayer.pause()
  // };
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => handlePlay(item)}>
      <Image
        source={{uri: item.artwork}}
        style={[styles.coverImage, imageStyle]}
      />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.artist}>{item.artist}</Text>
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
