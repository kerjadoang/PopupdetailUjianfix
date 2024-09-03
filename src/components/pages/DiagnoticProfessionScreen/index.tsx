import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import {Button, Header, SwipeUp} from '@components/atoms';
import Colors from '@constants/colors';
import {Image} from 'react-native';
import {bgBlueOrnament} from '@assets/images';
import useDiagnoticProfessionResult from './useDiagnoticProfessionResult';
import {ButtonMajors} from './components/ButtonMajors';
import RobotSedih from '@assets/svg/robot_sedih.svg';
import {TabScreen} from './Tab/Tab';
import {RecommendationCard} from './components/RecommendationCard';
import SwipeUpRating from '../DiagnoticCheckOpportunityScreen/components/SwipeUpRating';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

const DiagnoticProfessionScreen = () => {
  const {
    navigation,
    profession,
    majors,
    selected,
    Tab,
    tabActive,
    handleOnPressTab,
    major,
    _setSelectedMajors,
    isValid,
    rating,
    setRating,
    isShowSubmitResult,
    setIsShowSubmitResult,
    _handlerSave,
    _handlerLater,
    isShowSwipeUpNotSuscribed,
    setIsShowSwipeUpNotSuscribed,
    isLoading,
    setNavigateToCart,
    navigateToCart,
    onAnotherMajor,
  } = useDiagnoticProfessionResult();

  const _renderSwipeUpNotSuscribed = () => {
    return (
      <View style={styles.notSuscribedContainer}>
        <RobotSedih width={100} height={100} />
        <Text style={styles.notSuscribedTitle}>
          Belum Berlangganan Paket PTN
        </Text>
        <Text style={styles.notSuscribedLabel}>
          Fitur ini hanya dapat diakses oleh pengguna paket. Akses PTN dengan
          berlangganan.
        </Text>
        <View style={styles.bottomContainer}>
          <Button
            label="Berlangganan"
            style={styles.buttonSwipeUp}
            action={() => {
              setIsShowSwipeUpNotSuscribed(false);
              setNavigateToCart(true);
              navigation.navigate('Cart');
            }}
          />
        </View>
      </View>
    );
  };
  const _renderNotFound = () => {
    return (
      <View style={styles.notFoundContainer}>
        <RobotSedih width={100} height={100} />
        <Text style={styles.notFoundTitle}>
          Belum Ada Rekomendasi Universitas
        </Text>
        <Text style={styles.notFoundLabel}>
          Silahkan pilih jurusan terlebih dahulu
        </Text>
      </View>
    );
  };

  const _renderSwipeUpRating = () => (
    <SwipeUpRating
      onPressLater={() => {
        setIsShowSubmitResult(false);
        _handlerLater();
      }}
      setRating={setRating}
      rating={rating}
      onPressSave={() => {
        setIsShowSubmitResult(false);
        _handlerSave();
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        label={profession?.name ?? '-'}
        styleLabel={styles.styleLabel}
        backgroundColor="transparent"
        colorLabel={Colors.white}
      />
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
      <View style={styles.subContainer}>
        <ScrollView
          showsVerticalScrollIndicator
          contentContainerStyle={styles.contentContainerStyle}
          style={{flex: 1}}
          nestedScrollEnabled>
          <View style={styles.majorRecommendationContainer}>
            <View style={styles.majorRecommendationHeader}>
              <Text style={styles.title}>Rekomendasi Jurusan</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('DiagnoticRecommendationScreen', {
                    majors: majors,
                    profession: profession,
                  });
                }}>
                <Text style={styles.viewAll}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.max}>*Maksimal 3 pilihan</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.majorsScroll}>
              {majors?.map((obj: any, index: number) => {
                const data = {id: obj?.id, major: obj?.major};
                return (
                  <ButtonMajors
                    key={index}
                    label={obj?.major?.name}
                    action={() => {
                      _setSelectedMajors(data);
                    }}
                    selected={selected?.some(
                      (obj: any) => obj?.id === data?.id,
                    )}
                  />
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.rectangle} />
          <View style={styles.universityListContainer}>
            <Text style={[styles.title, {padding: 16}]}>
              Daftar Universitas
            </Text>
            {isValid ? (
              <Tab.Navigator
                screenOptions={{
                  tabBarStyle: styles.navigatorTabBarStyle,
                  tabBarIndicatorStyle: styles.navigatorTabIndicatorStyle,
                }}>
                {major?.map((obj: any) => {
                  return (
                    <Tab.Screen
                      initialParams={{major_id: obj?.major?.id}}
                      key={obj?.major?.name ?? ''}
                      name={obj?.major?.name ?? ''}
                      component={TabScreen}
                      listeners={{
                        focus: () => handleOnPressTab(obj?.major?.name ?? ''),
                      }}
                      options={{
                        tabBarLabelStyle:
                          tabActive === obj?.major?.name ?? ''
                            ? styles.labelActiveStyle
                            : styles.labelStyle,
                        tabBarLabel: obj?.major?.name ?? '',
                        tabBarPressColor: Colors.primary.background2,
                        tabBarStyle: {
                          backgroundColor: Colors.primary.background,
                        },
                      }}
                    />
                  );
                })}
              </Tab.Navigator>
            ) : (
              _renderNotFound()
            )}
          </View>
          {/* {isValid && !isAlreadySetRating ? ( */}
          <View>
            <View style={[styles.rectangle, {marginTop: 16}]} />
            <View style={styles.bottomContainer}>
              <RecommendationCard
                actionAnother={onAnotherMajor}
                actionDone={() => {
                  setIsShowSubmitResult(true);
                }}
              />
            </View>
          </View>
          {/* ) : null} */}
        </ScrollView>
      </View>
      <SwipeUp
        isSwipeLine={true}
        visible={isShowSubmitResult}
        onClose={() => {
          setIsShowSubmitResult(false);
        }}
        height={500}
        children={_renderSwipeUpRating()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeUpNotSuscribed}
        onClose={() => {
          setIsShowSwipeUpNotSuscribed(false);
          if (!navigateToCart) {
            navigation.goBack();
          }
        }}
        height={500}
        children={_renderSwipeUpNotSuscribed()}
      />
      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};

export {DiagnoticProfessionScreen};
