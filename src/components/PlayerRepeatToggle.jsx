import {TouchableOpacity} from 'react-native';
import React from 'react';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../constants/colors';
import {iconSizes} from '../constants/dimensions';

const PlayerRepeatToggle = () => {
  return (
    <TouchableOpacity>
      <MaterialCommunityIcons
        name={'repeat'}
        color={colors.iconSecondary}
        size={iconSizes.lg}
      />
    </TouchableOpacity>
  );
};

export default PlayerRepeatToggle;


