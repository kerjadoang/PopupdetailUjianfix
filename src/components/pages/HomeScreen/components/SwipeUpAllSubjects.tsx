import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import LogoLearn from '@assets/svg/ic24_logo_learn.svg';
import LogoMediaAjar from '@assets/svg/ic_media_ajar.svg';
import IcLaporan from '@assets/svg/ic24_laporan.svg';
import Colors from '@constants/colors';
import {Button, Widget} from '@components/atoms';

type ISwipeUpAllSubjects = {
  onPressSubject: any;
  subjectData: any;
  onPressSubjectReport: any;
  isFromLMS?: boolean;
  isIKM?: boolean;
};

export const SwipeUpAllSubjects = React.memo(
  ({
    onPressSubject,
    onPressSubjectReport,
    subjectData,
    isFromLMS,
    isIKM,
  }: ISwipeUpAllSubjects) => {
    return (
      <View style={styles.swipeUpContainer}>
        <View style={styles.swpTopContent}>
          <View style={styles.swpTopInnerContent}>
            <View style={styles.swpTopBodyContent}>
              {isIKM ? (
                <LogoMediaAjar width={24} height={24} />
              ) : (
                <LogoLearn width={24} height={24} />
              )}
              <Text style={styles.swpTopTitle}>
                {isIKM ? 'Media Ajar' : 'Learn'}
              </Text>
            </View>
            <View style={styles.swpTopTitle2Container}>
              <Text style={styles.swpTopTitle2}>
                Mau belajar apa hari ini ?
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.swpMiddleContent}>
          <View style={styles.swpMiddleContent2}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.swpMiddleScrollViewInner}>
                {subjectData?.map((ie: any, index: number) => {
                  return (
                    <View
                      key={`swipeContent${index}`}
                      style={styles.swpMiddleInnerContent}>
                      <View>
                        <Widget
                          type={1}
                          title={ie?.name || ie?.subject_name || '-'}
                          action={() => {
                            onPressSubject(ie);
                          }}
                          remove={false}
                          add={false}
                          imageId={ie?.icon_mobile}
                          svg={
                            ie?.icon_path_url ||
                            ie?.subject_details?.icon_path_url
                          }
                          backgroundColor={Colors.white}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
        {!isFromLMS && (
          <View style={styles.swpBottomContent}>
            <Button
              label={'Lihat Progres Belajar Saya'}
              textStyle={{flex: 0.85, textAlign: 'center', paddingRight: 16}}
              rightIcon
              iconLeft={<IcLaporan />}
              action={onPressSubjectReport}
            />
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  swipeUpContainer: {height: 400, width: '100%', marginTop: 10},
  swpTopContent: {flex: 1, alignItems: 'center'},
  swpTopTitle: {
    marginLeft: '1%',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.base,
    marginTop: '1%',
    fontSize: 14,
    lineHeight: 18,
  },
  settingFavIconActionContainer: {
    position: 'absolute',
    right: 10,
    width: 20,
    height: 20,
    backgroundColor: Colors.success.light1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swpMiddleContent2: {
    width: '100%',
    height: 250,
  },
  swpMiddleTitleContainer: {flex: 1},
  subjectIcon: {width: 60, height: 60, marginBottom: 10},
  swpMiddleInnerContent: {
    alignItems: 'center',
    marginVertical: 10,
    height: 100,
    marginHorizontal: 10,
  },
  swpMiddleScrollViewInner: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  swpMiddleContent: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  swpBottomContent: {
    flex: 1.4,
    paddingHorizontal: '10%',
    justifyContent: 'center',
  },
  swpTopInnerContent: {
    flex: 1,
    alignItems: 'center',
  },
  swpTopTitle2Container: {flexDirection: 'row', alignItems: 'center'},
  swpTopTitle2: {
    marginLeft: '1%',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
    marginTop: '1%',
    fontSize: 20,
    lineHeight: 28,
  },
  swpTopTitle3: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: '4%',
  },
  swpMiddleIconSubject: {
    width: 50,
    height: 50,
    marginHorizontal: '5%',
    marginVertical: '10%',
    borderRadius: 50,
  },
  swpTopBodyContent: {flexDirection: 'row', alignItems: 'center', gap: 8},
  content: {
    flex: 2,
    backgroundColor: Colors.primary.light4,
    padding: 16,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  fab: {
    backgroundColor: 'yellow',
  },
  swpMiddleTitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    fontSize: 12,
  },
  box: {
    height: '100%',
    backgroundColor: Colors.primary.light4,
    flex: 1,
  },
  settingFavContainer: {width: '100%', height: 600, backgroundColor: 'white'},
  settingFavTopContentContainer: {flex: 1, marginTop: '2%'},
  settingFavTopTitleContainer: {
    width: '100%',
    marginTop: '2%',
    marginBottom: '2%',
    paddingHorizontal: '5%',
  },
  settingFavTopTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  settingFavBottomContentContainer: {
    width: '100%',
    marginTop: '2%',
    flexDirection: 'row',
    height: 100,
  },
  settingFavEmptyIcon: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingFavBottomContainer: {
    flex: 3,
    backgroundColor: 'white',
  },
  settingFavBottomTitlecontainer: {width: '100%', paddingHorizontal: '5%'},
  settingFavBottomTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  settingFavBottomScrollView: {marginTop: '5%', marginBottom: '10%'},
  settingFavBottomSubjectContainer: {marginHorizontal: 5, marginBottom: 20},
  settingFavSubmitButtonContainer: {marginHorizontal: '5%'},
});
