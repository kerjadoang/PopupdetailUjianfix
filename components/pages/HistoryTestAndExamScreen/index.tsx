/* eslint-disable react-native/no-inline-styles */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import CardItemTest from './component/CardItemTest';
import Fonts from '@constants/fonts';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import {
  Button,
  EmptyState,
  MainText,
  MainView,
  SwipeUp,
} from '@components/atoms';
import {convertDate, showErrorToast} from '@constants/functional';
import ProviderSOAL from '@services/soal/provider';
import {List} from 'react-native-paper';
import {useHistoryTestAndExamScreen} from './useHistoryTestAndExamScreen';
import CardBelumDikerjakan from './component/CardBelumDikerjakan';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

const HistoryTestAndExamScreen = ({}: any) => {
  const {
    user,
    popUpData,
    setIsOpenPopUp,
    setPopupData,
    handleMappingSoalCategory,
    navigation,
    type,
    subjectData,
    activeBtn,
    questionPackageServiceId,
    setQuestionPackageServiceUjianId,
    setActiveBtn,
    expandedId,
    _onAccordionPress,
    isOpenPopUp,
    rulesSOALTest,
    questionPackages,
    btn,
    handleItemClick,
  } = useHistoryTestAndExamScreen();

  const renderChildrenSwipeup = () => (
    <View style={styles?.soalTestContainer}>
      <View style={styles?.soalTestHeaderContainer}>
        <Text style={styles?.soalTestHeaderTextTop}>
          {popUpData?.category !== 'Ulangan Harian Test'
            ? popUpData?.category
            : popUpData?.name
            ? popUpData?.name
            : ''}
        </Text>

        <Text style={styles?.soalTestHeaderTextBottom}>
          {popUpData?.category === 'Ulangan Harian Test'
            ? 'Ulangan Harian • Test'
            : popUpData?.name
            ? popUpData?.name
            : ''}
        </Text>
      </View>
      <View style={styles?.soalTestInfoContainer}>
        <View style={styles?.soalTestInfoButtonContainer}>
          <Text style={styles?.soalTestInfoButtonText}>{`${
            popUpData?.package?.[0]?.total_question ??
            popUpData?.total_question ??
            0
          } Soal`}</Text>
        </View>
        <View style={styles?.soalTestInfoButtonContainer}>
          <Text style={styles?.soalTestInfoButtonText}>{'60 Menit'}</Text>
        </View>
      </View>
      <View style={styles?.soalTestRulesContainer}>
        <View>
          <Text style={[styles.soalTestRulesTitleText, {marginBottom: 5}]}>
            Cara Pengerjaan:
          </Text>
          {rulesSOALTest?.map((_rules: string) => (
            <View
              key={_rules}
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingLeft: 10,
              }}>
              <View style={{flex: 0.03}}>
                <Text style={styles.soalTestRulesTitleText}>{'•'}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={[
                    styles.soalTestRulesTitleText,
                    {fontFamily: Fonts.RegularPoppins},
                  ]}>
                  {_rules}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles?.soalTestSubmitButtonContainer}>
        <Button
          action={async () => {
            setIsOpenPopUp(false);
            try {
              const _res = await ProviderSOAL?.startSoalOrAkm({
                question_package_id:
                  popUpData?.package?.[0]?.id ?? popUpData?.id ?? 0,
                question_package_service_id:
                  popUpData?.package?.[0]?.question_package_service_id ??
                  popUpData?.question_package_service_id ??
                  0,
                duration_minutes: 60,
              });
              var resDataStartSoal: any = _res?.data || false;

              if (resDataStartSoal?.status === 500) {
                showErrorToast('Internal server error 500');
              } else {
                navigation.navigate('MultipleChoiceQuestionScreen', {
                  chapter_id:
                    popUpData?.package?.[0]?.chapter_id ??
                    popUpData?.chapter_id ??
                    0,
                  question_service_id:
                    QUESTION_SERVICE_TYPE?.SOAL_PILIHAN_GANDA,
                  question_package_id:
                    popUpData?.package?.[0]?.question_package_service_id ??
                    popUpData?.question_package_service_id ??
                    0,
                  title: popUpData?.name ?? '',
                  level_id: 1,
                  subTitle: '',
                  is_done: false,
                  service: popUpData?.category ?? '',
                  rules:
                    popUpData?.package?.[0]?.rules ??
                    popUpData?.package?.[0]?.instructions ??
                    popUpData?.rules ??
                    popUpData?.instructions ??
                    {},
                  question_data: resDataStartSoal,
                });
                null;
              }
            } catch (error: any) {
              if (
                error?.response?.data?.code === 906 ||
                error?.response?.data?.code === 100
              ) {
                navigation.navigate('MultipleChoiceQuestionScreen', {
                  chapter_id:
                    popUpData?.package?.[0]?.chapter_id ??
                    popUpData?.chapter_id ??
                    0,
                  question_service_id:
                    QUESTION_SERVICE_TYPE?.SOAL_PILIHAN_GANDA,
                  question_package_id:
                    popUpData?.package?.[0]?.question_package_service_id ??
                    popUpData?.question_package_service_id ??
                    0,
                  title: popUpData?.name ?? '',
                  level_id: 1,
                  subTitle: '',
                  is_done: false,
                  service: popUpData?.category ?? '',
                  rules:
                    popUpData?.package?.[0]?.rules ??
                    popUpData?.package?.[0]?.instructions ??
                    popUpData?.rules ??
                    popUpData?.instructions ??
                    {},
                  question_data: error?.response?.data,
                });
                null;
              } else {
                showErrorToast(
                  error?.response?.data?.message ??
                    'Internal server error [500]',
                );
              }
            }
          }}
          label="Mulai"
          style={styles?.soalTestSubmitButton}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header
        label={
          type === 'ULANGAN_HARIAN'
            ? 'Riwayat Nilai Test'
            : 'Riwayat Nilai Ujian'
        }
        subLabel={
          type === 'ULANGAN_HARIAN'
            ? `Ulangan Harian \u2022 ${subjectData?.subject?.name}`
            : subjectData?.subject?.name
        }
      />

      <View style={type === 'UJIAN' ? styles.btnContainer : {display: 'none'}}>
        {btn.map((element: any, index: any) => {
          return (
            <Pressable
              style={
                activeBtn === index ? styles.btnActive : styles.btnNonActive
              }
              onPress={() => {
                if (index === 1) {
                  setQuestionPackageServiceUjianId(6);
                } else if (index === 2) {
                  setQuestionPackageServiceUjianId(7);
                } else {
                  setQuestionPackageServiceUjianId(questionPackageServiceId);
                }

                setActiveBtn(index);
              }}
              key={element?.id || index}>
              <Text
                style={
                  activeBtn === index
                    ? styles.labelActive
                    : styles.labelNonActive
                }>
                {element}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.container}>
        <List.AccordionGroup
          expandedId={expandedId}
          onAccordionPress={_onAccordionPress}>
          <FlatList<ISOALReportPackage>
            data={questionPackages}
            renderItem={({item, index}) => {
              const packageWithUserHistory =
                item?.user_history ||
                item.package?.find(soalPackage => soalPackage?.user_history);

              return (
                <List.Accordion
                  id={item?.id || index}
                  style={{
                    backgroundColor: Colors.white,
                    justifyContent: 'center',
                  }}
                  title={
                    <MainText
                      type="SemiBold"
                      justifyContent="center"
                      fontSize={16}>
                      {item?.name}
                    </MainText>
                  }>
                  <MainView paddingHorizontal={10} paddingVertical={12}>
                    {!packageWithUserHistory ? (
                      <CardBelumDikerjakan
                        action={
                          user
                            ? undefined
                            : () => {
                                setPopupData({
                                  ...item,
                                  question_package_service_id:
                                    item?.package?.[0]
                                      ?.question_package_service_id ?? 4,
                                  category: handleMappingSoalCategory(),
                                });
                                setIsOpenPopUp(true);
                              }
                        }
                      />
                    ) : (
                      (
                        (packageWithUserHistory as IPackage).user_history ??
                        (packageWithUserHistory as UserHistory[])
                      )?.map((_item: any) => (
                        <CardItemTest
                          isArrowIcon={true}
                          key={_item?.id}
                          date={convertDate(_item?.created_at).format(
                            'DD MMM YYYY',
                          )}
                          title={_item?.attempt}
                          score={_item?.point ?? 0}
                          desc={`${_item?.correct_answer ?? 0} Benar \u2022 ${
                            _item?.wrong_answer ?? 0
                          } Salah \u2022 ${
                            _item?.pass_answer ?? 0
                          } Dilewati\nDurasi Pengerjaan: ${
                            _item?.duration ?? 0
                          } menit`}
                          action={() =>
                            handleItemClick(_item?.id, item?.name || '')
                          }
                        />
                      ))
                    )}
                  </MainView>
                </List.Accordion>
              );
            }}
            ListEmptyComponent={() => (
              <MainView height={WINDOW_HEIGHT * 0.735}>
                <EmptyState title="Belum ada riwayat" />
              </MainView>
            )}
          />
        </List.AccordionGroup>
      </View>
      <SwipeUp
        height={100}
        onClose={() => setIsOpenPopUp(false)}
        isSwipeLine={true}
        visible={isOpenPopUp}
        children={renderChildrenSwipeup()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  btnActive: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary.base,
    borderRadius: 21,
  },
  btnNonActive: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary.light3,
    borderRadius: 21,
  },
  labelActive: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  labelNonActive: {
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral80,
    fontSize: 14,
  },
  soalTestContainer: {
    width: '100%',
    paddingBottom: 100,
    backgroundColor: 'white',
  },
  soalTestHeaderContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
    paddingHorizontal: 10,
  },
  soalTestHeaderTextBottom: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    color: Colors?.dark?.neutral100,
    textAlign: 'center',
  },
  soalTestInfoButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors?.primary?.base,
  },
  soalTestRulesContainer: {
    width: '100%',
    marginTop: '5%',
    paddingHorizontal: '5%',
  },
  soalTestSubmitButtonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soalTestSubmitButton: {width: '90%'},
  soalTestRulesTitleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors?.dark?.neutral100,
  },
  soalTestInfoButtonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors?.primary?.light3,
    marginRight: 4,
  },
  soalTestInfoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '3%',
  },
  soalTestHeaderTextTop: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors?.primary?.base,
    marginBottom: 8,
  },
});
export {HistoryTestAndExamScreen};
