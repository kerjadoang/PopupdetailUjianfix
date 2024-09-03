import React, {useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  StatusBar,
} from 'react-native';
import {styles} from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import Icon_history from '@assets/svg/ic24_history.svg';
import Icon_question from '@assets/svg/ic24_question_mark.svg';
import {bgBlueOrnament} from '@assets/images';
import Trophy from '@assets/svg/ic_trophy_tanya.svg';
import RightIcon from '@assets/svg/ic_arrow_right_blue.svg';
import Logo from '@assets/svg/logo_tanya_transparent.svg';
import Maskot from '@assets/svg/ic_mascot_tanya.svg';
import Maskot_cry from '@assets/svg/robot_sedih.svg';
import useFormAsk from './useFormAsk';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@components/atoms/ProgressBar';
import {PopUpWithIcon, SwipeUp} from '@components/atoms';
import dayjs from 'dayjs';
import {RenderChildSwipeInfo} from './component/RenderChildSwipeInfo';
import {RenderChildSwipe} from './component/RenderChildSwipe';
import Star from '@assets/svg/ic_tanya_star.svg';
import {RenderChildSwipeLevel} from './component/RenderChildSwipeLevel';
import {NotifBar} from './component/NotifBar';
import {ListItem} from './component/ListItem';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import messaging from '@react-native-firebase/messaging';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import RenderChildSlideInfo from './component/RenderChildSlideInfo';
import SwipeUpChoose from './component/SwipeUpChoose';
import {SCREEN_NAME} from '@constants/screen';

const AskScreen = () => {
  const {
    lastAccessed,
    data,
    handleValid,
    modal,
    handleModal,
    note,
    submitCoin,
    freeCoin,
    isLoading,
    section,
    setSection,
    show,
    setShow,
    handleTips,
    handleAskTips,
    selectImageFromGallery,
    handleChooseImage,
  }: any = useFormAsk();

  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'AskScreen'>>();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Toast.show({
        type: 'notif',
        text1: remoteMessage?.notification?.title,
        position: 'top',
        visibilityTime: 4000,
        onPress: () =>
          navigation.navigate('DetailHistoryTanyaScreen', {
            tanyaId: remoteMessage.data?.id,
          }),
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        onPressIconRight={() => {}}
        onPressIconLeft={() => navigation.goBack()}
        backgroundColor="transparent"
        iconRight={
          <View style={styles.row}>
            <Pressable
              style={({pressed}) => ({opacity: pressed ? 0.4 : 1})}
              onPress={() => {
                setSection(3);
                setShow(true);
              }}>
              <Icon_question width={24} height={24} />
            </Pressable>

            <Pressable
              style={({pressed}) => ({opacity: pressed ? 0.4 : 1})}
              onPress={() => navigation.navigate('HistoryTanyaScreen')}>
              <Icon_history width={24} height={24} />
            </Pressable>
            {/* </Coachmark> */}
          </View>
        }
      />
      <View style={styles.headerWrapperSecond}>
        <View style={styles.headerContainer}>
          <Logo width={143.16} />
          <Text style={styles.headerWrapperSecondSubTitle}>
            {'TANYAkan soal sulit ke Guru Ahli.'}
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('HomeCoinScreen');
            }}>
            <View>
              <Text style={styles.txtCoin}>Koin untuk bertanya</Text>
              <View style={styles.row}>
                <Image
                  source={require('@assets/images/koin_2.png')}
                  style={{width: 20, height: 20}}
                />
                <Text style={styles.coin}>{data?.total_coin}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.coin}>Detail</Text>
              <RightIcon width={24} />
            </View>
          </Pressable>
        </View>
      </View>
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
      <ScrollView
        style={styles.cardContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContentContainerStyle}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Mau Tanya Pelajaran Apa?</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                }}>
                {data?.session?.map((item: any, key: any) => (
                  <Text style={styles.sesi} key={key}>
                    {item?.name} {dayjs().format(`${item?.time_start}`)} -{' '}
                    {dayjs().format(`${item?.time_end}`)} {'  '}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.contentContainerStyle}>
              <View style={styles.contentContainerStyle}>
                {lastAccessed?.map((item: any, index: any) => (
                  <ListItem
                    data={item}
                    key={index}
                    action={() => handleValid(item)}
                  />
                ))}
              </View>
              {/* )} */}

              {data?.notif?.list.length !== 0 ? (
                <NotifBar
                  action={() =>
                    navigation.navigate('HistoryTanyaScreen', {
                      initialScreen: SCREEN_NAME.TerjawabTabScreen,
                    })
                  }
                  dataNotif={data?.notif?.description}
                />
              ) : null}

              <Pressable
                onPress={() => {
                  setShow(!show);
                  setSection(1);
                }}
                style={[styles.contentProgress, {marginTop: 20}]}>
                <Text style={styles.text}>Tipe Tanya</Text>
                <View style={[styles.row, {width: '100%'}]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 5,
                    }}>
                    <Star width={32} />
                    <View style={{marginLeft: 5}}>
                      <Text style={styles.coin}>{data?.tanya_type?.name}</Text>
                      <Text style={styles.text}>
                        {data?.tanya_type?.status}
                      </Text>
                    </View>
                  </View>
                  <RightIcon width={16} />
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShow(!show);
                  setSection(2);
                }}
                style={styles.contentProgress}>
                <Text style={styles.text}>Level Tanya</Text>
                <View
                  style={[
                    styles.row,
                    {width: '100%', justifyContent: 'flex-start'},
                  ]}>
                  <Text style={styles.coin}>{data?.level_tanya?.name}</Text>
                  <RightIcon width={16} />
                </View>
                <Text style={styles.text}>{data?.level_tanya?.answered}</Text>
                <View
                  style={[
                    styles.row,
                    {width: '100%', justifyContent: 'flex-start'},
                  ]}>
                  <View style={{width: '90%'}}>
                    <ProgressBar
                      progress={
                        (
                          (data?.level_tanya?.answered_count /
                            data?.level_tanya?.tanya_count) *
                          data?.level_tanya?.tanya_count
                        ).toFixed(2) + '%'
                      }
                      height={4}
                      activeColor={Colors.primary.base}
                      pasiveColor={Colors.primary.light2}
                    />
                  </View>
                  <Trophy width={24} />
                </View>
                <Text style={styles.text}>{data?.level_tanya?.tanya}</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <SwipeUp
          isSwipeLine={true}
          onClose={() => setShow(false)}
          visible={show}
          height={200}
          children={
            section === 1 ? (
              <RenderChildSwipe
                action={() => setShow(false)}
                actionPlus={() => navigation.navigate('HomeCoinScreen')}
                actionPrio={() => navigation.navigate('Cart')}
                isActive={data?.tanya_type}
              />
            ) : section === 2 ? (
              <RenderChildSwipeLevel action={() => setShow(false)} />
            ) : section === 3 ? (
              <RenderChildSwipeInfo action={() => setShow(false)} />
            ) : section === 4 ? (
              <RenderChildSlideInfo
                action={() => handleAskTips()}
                handleTips={value => handleTips(value)}
              />
            ) : section === 5 ? (
              <SwipeUpChoose
                action={selectImageFromGallery}
                actionCamera={handleChooseImage}
              />
            ) : null
          }
        />
        {modal ? (
          <PopUpWithIcon
            icon
            twoButton={note.includes('coin') ? true : false}
            iconName={
              note.includes('coin') ? (
                <Maskot_cry width={200} />
              ) : (
                <Maskot width={200} />
              )
            }
            title={note.includes('coin') ? 'Koint Tidak Cukup' : 'Sesi Ditutup'}
            desc={note}
            textButton={note.includes('coin') ? 'Beli Koin' : 'Kembali'}
            textButton_2={note.includes('coin') && 'Kembali'}
            action={() =>
              note.includes('coin')
                ? navigation.navigate('HomeCoinScreen')
                : handleModal()
            }
            action_2={note.includes('coin') && handleModal}
          />
        ) : null}
      </ScrollView>
      <View
        style={{
          backgroundColor: Colors.white,
          width: '100%',
          padding: 5,
        }}>
        {freeCoin ? null : (
          <Pressable style={styles.botButton} onPress={submitCoin}>
            <Image
              source={require('@assets/images/koin_2.png')}
              style={{width: 24, height: 24}}
            />
            <Text style={styles.txtButton}>
              Ambil {data?.free_coin} Koin GRATIS untuk bertanya
            </Text>
          </Pressable>
          // </Coachmark>
        )}
      </View>
      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};

export {AskScreen};
