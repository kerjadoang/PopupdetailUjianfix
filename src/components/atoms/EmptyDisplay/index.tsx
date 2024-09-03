/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Colors from '@constants/colors';
import React from 'react';
import Fonts from '@constants/fonts';

type Props = {
  imageSvg?: React.ReactNode;
  image?: any;
  title?: String;
  desc?: string;
  action?: any;
  btnLabel?: string;
  btnLabelStyle?: StyleProp<TextStyle>;
  descStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  btnContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  btnIcon?: React.ReactNode;
};
const windoweight = Dimensions.get('window').height;

const EmptyDisplay = ({
  imageSvg,
  image,
  title,
  desc,
  action,
  btnLabel,
  ...props
}: Props) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {imageSvg ? (
        imageSvg
      ) : (
        <Image
          source={image}
          style={{
            width: '60%',
            height: windoweight / 2.5,
            resizeMode: 'contain',
          }}
        />
      )}
      <View>
        <Text style={[styles.title, props.titleStyle]}>{title}</Text>
        <Text style={[styles.desc, props.descStyle]}>{desc}</Text>

        {action && btnLabel && (
          <TouchableOpacity
            style={[
              styles.btn,
              !action && styles.displayNone,
              props.btnContainerStyle,
            ]}
            onPress={action}>
            {props.btnIcon}
            <Text style={[styles.label, props.btnLabelStyle]}>{btnLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export {EmptyDisplay};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: Fonts.BoldPoppins,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 6,
    textAlign: 'center',
    color: Colors.dark.neutral100,
  },
  desc: {
    fontFamily: Fonts.LightPoppins,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 18,
    color: Colors.dark.neutral60,
  },
  btn: {
    backgroundColor: Colors.primary.base,
    borderRadius: 35,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'center',
    marginVertical: 20,
  },
  label: {
    fontFamily: Fonts.BoldPoppins,
    fontWeight: 'bold',
    fontSize: 17,
    color: Colors.white,
  },
  displayNone: {
    display: 'none',
  },
});
