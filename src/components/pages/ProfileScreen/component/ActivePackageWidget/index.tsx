import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {Button} from '@components/atoms';
import IconAcademic from '@assets/svg/ic_academic.svg';
import {styles} from './style';
import {_handlerConvertAllDate, isDeepEqual} from '@constants/functional';
import {useNavigation} from '@react-navigation/native';
import RenderImage from '@components/atoms/RenderImage';
import {IMAGES} from '@constants/image';

const propsAreEqual = (prevProps: any, nextProps: any) =>
  isDeepEqual(prevProps, nextProps);

const ActivePackageWidget = React.memo((props: any) => {
  const navigation: any = useNavigation();
  const packageDetail: any = props?.packageDetail?.data?.package || false;

  const _renderContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <IconAcademic width={26} height={16} />
          <Text style={styles.groupMentorTitle}>{'Paket Aktif'}</Text>
        </View>

        {packageDetail?.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            {packageDetail?.map((value: any, index: any) => {
              return (
                <View key={index} style={styles.cardContentConnected}>
                  <RenderImage
                    imageUrl={value?.path_url}
                    width={100}
                    height={60}
                    style={styles.svg}
                    placeholder={
                      <Image
                        source={IMAGES.imgPlaceHolder}
                        style={[
                          styles.svg,
                          {width: 100, height: 60, borderRadius: 4},
                        ]}
                      />
                    }
                  />

                  <View>
                    <Text style={styles.connectedTitle}>{value?.name}</Text>
                    <Text style={styles.connectedSubtitle}>
                      {`Berlaku sampai ${_handlerConvertAllDate(
                        value?.EndTime,
                        2,
                        2,
                      )}`}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.cardContentNotConnected}>
            <View>
              <Text style={styles.notConnectedTitle}>
                {'Belum Berlangganan'}
              </Text>
              <Text style={styles.notConnectedSubtitle}>
                {'Beli paket Kelas Pintar sekarang'}
              </Text>
            </View>

            <Button
              style={styles.notConnectedButton}
              label={'Beli Paket'}
              action={() => {
                navigation.navigate('Cart', {});
              }}
            />
          </View>
        )}
      </View>
    );
  };

  /*
  USER_TYPE_ID
  1. Murid >> B2C B2B
  2. Orang Tua >> Ngikut anak
  3. Mentor
  4. Kepsek >> B2B B2G
  5. Guru >> B2B
  6. Admin >> B2B
 */

  const isHideWidget = props?.userTypeId == 2;
  return <>{isHideWidget ? null : _renderContent()}</>;
}, propsAreEqual);

export {ActivePackageWidget};
