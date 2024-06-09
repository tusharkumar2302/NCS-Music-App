import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import SongCard from './SongCard';
import {spacing} from '../constants/dimensions';
import {fontSize} from '../constants/dimensions';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fonts';
import TrackPlayer from 'react-native-track-player';

const SongCardWithCategory = ({item}) => {
  const handlePlayTrack = async (selectedTrack, songs = item.songs) => {
    const trackIndex = songs.findIndex(
      (track) => track.url === selectedTrack.url
    );
    if (trackIndex === -1) {
      return;
    }
    const beforeTracks = songs.slice(0, trackIndex);
    const afterTracks = songs.slice(trackIndex + 1);

    await TrackPlayer.reset();

    await TrackPlayer.add(selectedTrack);
    await TrackPlayer.add(afterTracks);
    await TrackPlayer.add(beforeTracks);

    await TrackPlayer.play();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>{item.title}</Text>
      <FlatList
        data={item.songs}
        renderItem={({item}) => (
          <SongCard
            item={item}
            handlePlay={selectedTrack => {
              handlePlayTrack(selectedTrack);
            }}
          />
        )}
        horizontal={true}
        ItemSeparatorComponent={<View style={{marginHorizontal: spacing.xs}} />}
        contentContainerStyle={{paddingHorizontal: spacing.lg}}
      />
    </View>
  );
};

export default SongCardWithCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
});