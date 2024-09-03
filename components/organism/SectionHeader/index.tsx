import Colors from '@constants/colors';
import React from 'react';
import {
  Pressable,
  PressableProps,
  TextProps,
  ViewProps,
  View,
  StyleSheet,
  Text,
} from 'react-native';

type SectionHeaderProps = {
  sectionContainerStyle?: ViewProps['style'];
  sectionTitleStyle?: TextProps;
  sectionTitle: string;
  sectionSubtitle?: string;
  onPressSectionSubtitle?: PressableProps['onPress'];
};

const SectionHeader: React.FC<SectionHeaderProps> = props => {
  return (
    <View style={[styles.sectionContainer, props.sectionContainerStyle]}>
      <Text style={styles.sectionTitle}>{props.sectionTitle}</Text>
      {props.sectionSubtitle && (
        <Pressable onPress={props.onPressSectionSubtitle}>
          <Text style={styles.sectionSubtitle}>{props.sectionSubtitle}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
});

export default SectionHeader;
