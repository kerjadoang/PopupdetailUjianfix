/* eslint-disable react-hooks/exhaustive-deps */
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {styles} from './styles';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import {Header} from '@components/atoms';
import Colors from '@constants/colors';
import {Image} from 'react-native';
import {bgBlueOrnament} from '@assets/images';
import useDiagnoticTestResult from './useDiagnoticTestResult';
import {ProfessionCard} from './components/ProfessiCard';
import {parseHtml} from '@constants/functional';
import {TabRekomendasi} from './Tab/TabRekomendasi';
import {TabPilihanPribadi} from './Tab/TabPilihanPribadi';
import LinearGradient from 'react-native-linear-gradient';
import RenderImage from '@components/atoms/RenderImage';
import RenderHtmlView from '@components/organism/RenderHtmlView';

const DiagnoticTestResultScreen = () => {
  const {
    navigation,
    getUser,
    userAnakData,
    dataResult,
    setUserProfessions,
    selected,
    alreadyDoneDiagnotic,
    Tab,
    tabActive,
    tabNavigator,
    setTabActive,
    universityMajorsKp,
    universityMajors,
  } = useDiagnoticTestResult();

  const htmlSource = {
    html: parseHtml(
      dataResult?.profession_characteristic?.descriptionFront || '<div/>',
      '',
      [{searchValue: '<div<', replaceValue: '<'}],
    ),
  };

  const _renderAlreadyFinishedDiagnotic = useMemo(() => {
    return (
      <View style={styles.containerTab}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.navigatorTabBarStyle,
            tabBarIndicatorStyle: styles.navigatorTabIndicatorStyle,
          }}>
          {tabNavigator?.map((name: any) => {
            return (
              <Tab.Screen
                initialParams={{
                  universityMajorsKp: universityMajorsKp,
                  universityMajors: universityMajors,
                }}
                key={name ?? ''}
                name={name ?? ''}
                component={
                  name === 'Rekomendasi' ? TabRekomendasi : TabPilihanPribadi
                }
                listeners={{
                  focus: () => setTabActive(name),
                }}
                options={{
                  tabBarLabelStyle:
                    tabActive === name ?? ''
                      ? styles.labelActiveStyle
                      : styles.labelStyle,
                  tabBarLabel: name ?? '',
                  tabBarPressColor: Colors.primary.background2,
                  tabBarStyle: {
                    backgroundColor: Colors.primary.background,
                  },
                }}
              />
            );
          })}
        </Tab.Navigator>
      </View>
    );
  }, [universityMajorsKp, universityMajors, tabActive]);
  return (
    <View style={styles.container}>
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        label={'Hasil Minat dan Kepribadian'}
        styleLabel={styles.styleLabel}
        backgroundColor="transparent"
        colorLabel={Colors.white}
      />
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
      <View style={styles.subContainer}>
        <ScrollView
          style={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: userAnakData?.path_url || getUser?.data?.path_url,
              }}
              style={styles.userImage}
            />
            <View style={styles.profileRightContainer}>
              <Text style={styles.profileTitle}>
                Halo, {dataResult?.fullname ?? '-'}
              </Text>
              <Text style={styles.profileLabel}>
                Berikut hasil tes minat dan kepribadian kamu
              </Text>
            </View>
          </View>
          <RenderImage
            imageUrl={dataResult?.profession_characteristic?.picture}
            style={styles.assetStyle}
          />
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Deskripsi</Text>
            <View style={styles.descriptionContent}>
              {dataResult?.profession_characteristic?.descriptionFront ? (
                <RenderHtmlView source={htmlSource} />
              ) : null}
              {dataResult?.profession_characteristic?.description ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DiagnoticDescriptionScreen', {
                      source: {
                        html:
                          dataResult?.profession_characteristic?.description ??
                          '',
                      },
                    });
                  }}>
                  <Text style={styles.viewMore}>Lihat Selengkapnya</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          {dataResult?.successfull_figures?.length !== 0 ? (
            <View>
              <View style={styles.rectangle} />
              <View style={styles.successfullFigure}>
                <Text style={styles.descriptionTitle}>Tokoh Sukses</Text>
                <ScrollView
                  horizontal
                  nestedScrollEnabled
                  contentContainerStyle={styles.successfullFigureSroll}>
                  {dataResult?.successfull_figures?.map(
                    (item: any, index: number) => (
                      <ImageBackground
                        key={index}
                        style={styles.successfullCharacterPicture}
                        resizeMode={'cover'}
                        source={{
                          uri: item?.image_path_url,
                        }}>
                        <LinearGradient
                          colors={['#FFFFFF00', '#000000CC']}
                          style={styles.successfullCharacterPictureOverlay}
                        />
                        <View style={[styles.textCharacterPicture]}>
                          <Text
                            style={[styles.titleCharacterPicture]}
                            ellipsizeMode="tail"
                            numberOfLines={2}>
                            {item.name || '-'}
                          </Text>
                          <Text
                            style={[styles.labelCharacterPicture]}
                            numberOfLines={2}>
                            {item.description || '-'}
                          </Text>
                        </View>
                      </ImageBackground>
                    ),
                  )}
                </ScrollView>
              </View>
            </View>
          ) : null}
          <View style={styles.rectangle} />
          {alreadyDoneDiagnotic && universityMajorsKp && universityMajors ? (
            _renderAlreadyFinishedDiagnotic
          ) : alreadyDoneDiagnotic && universityMajors ? (
            _renderAlreadyFinishedDiagnotic
          ) : (
            <View style={styles.professionRecomendContainer}>
              <View style={styles.professionRecomendRow}>
                <Text style={styles.descriptionTitle}>Rekomendasi Profesi</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DiagnoticRecommendationScreen', {
                      professions: dataResult?.professions,
                    })
                  }>
                  <Text style={styles.viewAll}>Lihat Semua</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.professionRecomendScroll}>
                {dataResult?.professions?.map((obj: any, index: number) => (
                  <ProfessionCard
                    label={obj?.name}
                    key={index}
                    selected={selected?.id === obj?.id}
                    action={() => {
                      setUserProfessions(obj);
                    }}
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export {DiagnoticTestResultScreen};
