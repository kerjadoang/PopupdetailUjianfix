/* eslint-disable react-native/no-inline-styles */
import {Button} from '@components/atoms';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import dayjs from 'dayjs';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {SvgUri} from 'react-native-svg';

const PromoDetailScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'PromoDetailScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'PromoDetailScreen'>>();
  return (
    <SafeAreaView style={styles.background}>
      <Header />
      <View style={styles.buyButtonContainer}>
        <View style={styles.buyButtonInnerContainer}>
          <Button
            label={'Beli Paket'}
            action={() =>
              navigation?.navigate('PackageScreen', {
                package_id: route?.params?.data?.id_relasi,
              })
            }
          />
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{route?.params?.data?.title}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {dayjs(route?.params?.data?.created_at).format('D MMM YYYY, HH:mm')}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          {route?.params?.data?.path_url?.endsWith('svg') ? (
            <SvgUri
              width={'100%'}
              height={150}
              uri={route?.params?.data?.path_url}
            />
          ) : (
            <Image
              source={{uri: route?.params?.data?.path_url ?? ''}}
              style={{width: 150, height: 150}}
            />
          )}
        </View>
        <View>
          <Text style={styles.description}>
            {route?.params?.data?.description}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {width: '100%', borderRadius: 10, height: 150},
  titleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
  },
  imageContainer: {alignItems: 'center', marginVertical: 10},
  dateContainer: {marginVertical: 10},
  titleContainer: {marginTop: 0},
  bodyContainer: {marginHorizontal: '5%', marginTop: 20},
  backIconContainer: {height: 80, justifyContent: 'center', marginLeft: '5%'},
  textButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {position: 'absolute', top: 0, width: '100%', height: 150},
  snackbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
  dateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    lineHeight: 16,
    color: Colors.dark.neutral80,
  },
  buyButtonInnerContainer: {width: '90%'},
  headerInner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    flexDirection: 'row',
  },
  emptyNotificationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContent: {
    alignItems: 'center',
  },
  maskotIcon: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  topDescription: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.dark.neutral100,
    fontFamily: 'Poppins-SemiBold',
  },
  bottomDescription: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  emptyNotificationContent: {
    width: '90%',
    marginTop: '80%',
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonContainer: {
    width: '100%',
    height: 80,
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    alignItems: 'center',
    paddingTop: 15,
  },
});

export {PromoDetailScreen};
