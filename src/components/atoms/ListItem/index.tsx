import React, {FC} from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import Colors from '@constants/colors';
import {ISpecificSearchResponseData} from '@redux';
import {_handlerCapitalizeFirstLetter} from '@constants/functional';

type ListItemProps = {
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  groupStyle?: StyleProp<TextStyle>;
  left?: React.ReactNode;
  right?: React.ReactNode;
  firstIndex?: boolean;
  onPress?: PressableProps['onPress'];
} & ISpecificSearchResponseData;

const ListItem: FC<ListItemProps> = props => {
  let backgroundColor;
  switch (props.service_method?.group) {
    case 'event':
      backgroundColor = '#FEEFEF';
      break;
    case 'paket':
      backgroundColor = '#F6EEFF';
      break;
    default:
      backgroundColor = '#E5FBFE';
      break;
  }

  return (
    <Pressable
      onPress={props.onPress}
      style={conditionalStyles(props).container}>
      {props.left}
      <View style={styles.contentContainer}>
        <View style={conditionalStyles(props).textContainer}>
          {props.service_method?.group && props.type === 'lainnya' && (
            <View
              style={[
                styles.groupContainer,
                {
                  backgroundColor: backgroundColor,
                },
              ]}>
              <Text style={[styles.group, props.groupStyle]}>
                {_handlerCapitalizeFirstLetter(props.service_method?.group)}
              </Text>
            </View>
          )}
          <Text style={[styles.title, props.titleStyle]} numberOfLines={2}>
            {props.name}
          </Text>
          {props.subject?.name && (
            <Text style={[styles.description, props.descriptionStyle]}>
              {props.subject?.name}
            </Text>
          )}
        </View>
        {props.right}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.dark.neutral100,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
    fontSize: 11,
  },
  groupContainer: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginBottom: 2,
  },
  group: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral80,
    fontSize: 11,
  },
});

const conditionalStyles = (props: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: props.firstIndex ? 0 : 16,
    },
    textContainer: {
      marginLeft: props.left ? 16 : 0,
    },
  });

export {ListItem};
