import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import React, {FC, useCallback} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import {bgBlueOrnament} from '@assets/images';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Fonts from '@constants/fonts';
import CardBankSoalSubject from '@components/atoms/CardBankSoalSubject';
import usePTNBankSoalScreen from './usePTNBankSoalScreen';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SvgUri} from 'react-native-svg';
import {showErrorToast} from '@constants/functional';

const Tab = createMaterialTopTabNavigator();

const TAB_NAMES = {
  TPS: 'TPS',
  SAINTEK: 'SAINTEK',
  SOSHUM: 'SOSHUM',
};

const MyTabContent: FC = ({route: {name}}: any) => (
  <MyTabContentItem type={name} />
);

const MyTabContentItem: FC<{type: any}> = ({type}) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'PTNBankSoalScreen'>>();
  const {
    tpsListSubject,
    saintekListSubject,
    soshumListSubject,
    getListQuestion,
  } = usePTNBankSoalScreen();

  const checkHaveQuestionData = async (_val: any, module: string) => {
    const haveData = await getListQuestion(_val?.id);

    if (haveData !== null) {
      navigation.navigate('MultipleChoiceQuestionScreen', {
        service: 'Bank Soal',
        title: _val?.name,
        subject_id: _val?.id,
        subject_name: _val?.name,
        module: module,
      });
    } else {
      showErrorToast('Soal tidak tersedia.');
    }
  };

  switch (type) {
    case TAB_NAMES.SAINTEK:
      return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>
          {saintekListSubject.map((_val: any) => (
            <CardBankSoalSubject
              key={_val?.id}
              icon={
                <SvgUri uri={_val?.icon_mobile} style={styles.subjectIcon} />
              }
              subject={_val?.name}
              numOfQuestions={_val?.total_question}
              action={() => checkHaveQuestionData(_val, 'saintek')}
            />
          ))}
        </ScrollView>
      );

    case TAB_NAMES.SOSHUM:
      return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>
          {soshumListSubject.map((_val: any) => {
            return (
              <CardBankSoalSubject
                key={_val?.id}
                icon={
                  <SvgUri uri={_val?.icon_mobile} style={styles.subjectIcon} />
                }
                subject={_val?.name}
                numOfQuestions={_val?.total_question}
                action={() => checkHaveQuestionData(_val, 'soshum')}
              />
            );
          })}
        </ScrollView>
      );

    default:
      return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>
          {tpsListSubject.map((_val: any) => (
            <CardBankSoalSubject
              key={_val?.id}
              icon={
                <SvgUri uri={_val?.icon_mobile} style={styles.subjectIcon} />
              }
              subject={_val?.name}
              numOfQuestions={_val?.total_question}
              action={() => checkHaveQuestionData(_val, 'tps')}
            />
          ))}
        </ScrollView>
      );
  }
};

const PTNBankSoalScreen: FC = () => {
  const __renderMyTabBarlabel = useCallback(
    ({children, focused}: {children: string; focused: boolean}) => {
      return (
        <Text
          style={[
            styles.containerTabBarLabel,
            focused && {color: Colors.primary.base},
          ]}>
          {children}
        </Text>
      );
    },
    [],
  );

  return (
    <View style={{flex: 1}}>
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        label={'Bank Soal'}
        styleLabel={styles.styleLabel}
        backgroundColor="transparent"
        colorLabel={Colors.white}
      />
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />

      <View style={styles.cardContainer}>
        <Tab.Navigator
          backBehavior="none"
          sceneContainerStyle={styles.containerTab}
          style={styles.tabMargin}
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarIndicatorStyle: styles.tabBarIndicator,
          }}>
          {Object.values(TAB_NAMES).map(_val => (
            <Tab.Screen
              key={_val}
              name={_val}
              component={MyTabContent}
              options={{
                tabBarLabel: __renderMyTabBarlabel,
              }}
            />
          ))}
        </Tab.Navigator>
      </View>
    </View>
  );
};

export {PTNBankSoalScreen};

const styles = StyleSheet.create({
  subjectIcon: {marginRight: 12, flex: 1},
  flex1: {flex: 1},
  tabMargin: {marginTop: 12, marginHorizontal: 12},
  tabBar: {
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
    backgroundColor: Colors.primary.background,
  },
  tabBarIndicator: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 4,
    backgroundColor: Colors.primary.base,
  },
  styleLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    paddingTop: 10,
  },
  bgBlueOrnament: {
    resizeMode: 'cover',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: '#F9FCFF',
  },
  cardContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.primary.background,
    paddingBottom: 32,
  },
  containerTab: {
    paddingTop: 16,
    paddingHorizontal: 2,
    backgroundColor: Colors.primary.background,
  },
  containerTabBarLabel: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
  },
});
