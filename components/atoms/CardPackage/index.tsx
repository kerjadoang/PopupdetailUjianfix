import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {Text, StyleSheet, View, Dimensions, Image} from 'react-native';
import {Button} from 'react-native-paper';
import RenderImage from '../RenderImage';
import {formatCurrency} from 'react-native-format-currency';

const windowWidth = Dimensions.get('window').width;
type Props = {
  title?: string;
  action?: any;
  image?: string;
  price?: string;
  priceBefore?: string;
  labelAction?: string;
};

const CardPackage = ({
  image,
  title,
  price,
  priceBefore,
  action,
  labelAction,
}: Props) => {
  return (
    <View style={styles.view}>
      <View style={styles.imageStyles}>
        <RenderImage
          imageUrl={image}
          svgStyle={styles.imgStyle}
          imageStyle={[styles.imgStyle, styles.imgSize]}
          width={180}
          height={110}
          placeholder={
            <Image
              source={require('@assets/images/img_placeholder.png')}
              style={[styles.imgStyle, styles.imgSize]}
            />
          }
        />
      </View>

      <View style={styles.viewText}>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {priceBefore ? (
            <Text style={styles.desc}>
              Mulai Dari{' '}
              {
                <Text style={{textDecorationLine: 'line-through'}}>
                  {
                    formatCurrency({
                      amount: Number(priceBefore || 0),
                      code: 'IDR',
                    })[0]
                  }
                </Text>
              }
            </Text>
          ) : null}
          <Text style={styles.price}>
            {
              formatCurrency({
                amount: Number(price || 0),
                code: 'IDR',
              })[0]
            }
          </Text>
        </View>
        <Button
          mode="outlined"
          onPress={action}
          buttonColor={Colors.primary.base}
          textColor={Colors.white}
          style={styles.button}>
          {labelAction}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: Colors.primary.base,
    borderRadius: 10,
    width: windowWidth * 0.43,
    margin: 4,
  },
  button: {
    marginTop: 12,
  },
  viewText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 12,
    width: '100%',
  },
  title: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    paddingBottom: 8,
  },
  desc: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.dark.neutral60,
  },
  price: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 18,
    color: Colors.dark.neutral80,
  },
  imageStyles: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    alignContent: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  imgSize: {
    width: 180,
    height: 110,
  },
});

export {CardPackage};
