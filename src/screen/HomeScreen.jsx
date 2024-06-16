import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// import {colors} from '../constants/colors';
import Header from '../components/Header';
import {fontFamilies} from '../constants/fonts';
import {fontSize, spacing} from '../constants/dimensions';
import SongCardWithCategory from '../components/SongCardWithCategory';
import FloatingPlayer from '../components/FloatingPlayer';
import {songsWithCategory} from '../data/songsWithCategory';
import {useTheme} from '@react-navigation/native';

const HomeScreen = () => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header />
      <FlatList
        data={songsWithCategory}
        renderItem={({item}) => <SongCardWithCategory item={item} />}
        contentContainerStyle={{
          paddingBottom: 400,
        }}
      />
      <FloatingPlayer />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.background,
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
