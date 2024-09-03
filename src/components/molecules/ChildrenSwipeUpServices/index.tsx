import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';
import Fonts from '@constants/fonts';

export const ChildrenSwipeUpServices = (props: any) => {
  const {
    data,
    logo,
    setIsShowServicesSubjects,
    singleButton,
    OnPressButton1,
    OnPressButton2,
    dualButton,
    title,
    ButtonLabel1,
    ButtonLabel2,
    subTitle,
    isLMS,
  } = props;

  return (
    <View style={styles.swipeUpContainerSoal}>
      <View style={styles.swpTopContentSoal}>
        {logo}
        <View style={styles.swpTopTitle2Container}>
          <Text style={[styles.swpTopTitle2, styles.swpTopTitle3]}>
            {title}
          </Text>
          {subTitle && <Text style={[styles.swpSubTitle]}>{subTitle}</Text>}
        </View>
        {!isLMS && <View style={styles.rectangle} />}
      </View>
      <View style={styles.swpMiddleContentSoal}>
        {data?.map((ie: any, index: number) => {
          return (
            <View key={index} style={styles.swpMiddleContent3}>
              {ie.icon}
              <View style={styles.soalSubContent}>
                <Text style={styles.soalTitle}>{ie.text}</Text>
                <Text style={styles.soalText}>{ie.textSubject}</Text>
              </View>
            </View>
          );
        })}
      </View>
      {OnPressButton1 && (
        <View style={styles.swpBottomContentSoal}>
          <Button
            label={ButtonLabel1}
            style={
              dualButton
                ? styles.SoalButton
                : singleButton
                ? [styles.SoalButton]
                : [styles.SoalButton, {width: '100%'}]
            }
            background={dualButton && Colors.primary.light3}
            color={dualButton && Colors.primary.base}
            action={() => {
              setIsShowServicesSubjects(false);
              if (OnPressButton1) {
                OnPressButton1();
              }
            }}
          />
          {dualButton ? (
            <Button
              label={ButtonLabel2}
              style={styles.SoalButton}
              action={() => {
                setIsShowServicesSubjects(false);
                if (OnPressButton2) {
                  OnPressButton2();
                }
              }}
            />
          ) : (
            <></>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  swipeUpContainerSoal: {
    backgroundColor: Colors.white,
  },
  swpTopContentSoal: {
    alignItems: 'center',
    marginTop: 36,
  },
  rectangle: {
    backgroundColor: Colors.dark.neutral10,
    height: 4,
    marginVertical: '8%',
    width: '100%',
    padding: 0,
  },
  swpMiddleContent3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  soalSubContent: {
    flexDirection: 'column',
    width: '70%',
    marginBottom: '4%',
  },
  soalTitle: {
    marginLeft: '4%',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
    fontSize: 14,
    lineHeight: 22,
  },
  soalText: {
    marginLeft: '4%',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral80,
    fontSize: 12,
    lineHeight: 16,
  },
  swpBottomContentSoal: {
    marginHorizontal: 32,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
  },
  SoalButton: {
    width: '55%',
    marginHorizontal: '2%',
  },
  swpMiddleContentSoal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  swpTopTitle2Container: {alignItems: 'center'},
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
  swpSubTitle: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral80,
  },
});
