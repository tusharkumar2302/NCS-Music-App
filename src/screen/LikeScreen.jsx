import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {iconSizes, spacing} from '../constants/dimensions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {fontFamilies} from '../constants/fonts';
import {fontSize} from '../constants/dimensions';
import SongCard from '../components/SongCard';
import FloatingPlayer from '../components/FloatingPlayer';
import useLikeSongs from '../store/likeStore';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

const LikeScreen = () => {
  const {likedSongs, addToLiked} = useLikeSongs();
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePlayTrack = async (selectedTrack, songs = likedSongs) => {
    const trackIndex = songs.findIndex(
      track => track.url === selectedTrack.url,
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
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign
            name={'arrowleft'}
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <SimpleLineIcons
            name={'equalizer'}
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.headingText}>Liked Songs</Text>
        }
        data={likedSongs}
        renderItem={({item}) => (
          <SongCard
            containerStyle={{width: '47%'}}
            imageStyle={{
              height: 160,
              width: 160,
              borderRadius: 10,
            }}
            item={item}
            handlePlay={item => {
              handlePlayTrack(item);
            }}
          />
        )}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 500,
          paddingHorizontal: spacing.lg,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginVertical: spacing.lg,
        }}
      />
      <FloatingPlayer />
    </View>
  );
};

export default LikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    alignItems: 'center',
  },
  headingText: {
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
  },
});
