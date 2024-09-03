import React, {useLayoutEffect, useState} from 'react';
import {View, Text, Image, Pressable, ScrollView, Linking} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Header} from '@components/atoms';
import {styles} from './style';
import Robot from '@assets/svg/robot_sedih.svg';
import FastImage from 'react-native-fast-image';
import useFormDetailSessionClass from './useFormDetailSessionClass';
import {SvgUri} from 'react-native-svg';
import VideoPlayer from '@components/atoms/VideoPlayer';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {fetchTeacherJoinMeeting} from '@redux';
import {useDispatch} from 'react-redux';
import {convertDate} from '@constants/functional';
import Avatar from '@components/atoms/Avatar';
const DetailSessionClassScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'DetailTeacherScreen'>>();
  const dispatch = useDispatch();
  const {id, full_name, item} = route?.params;
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'DetailTeacherScreen'>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Detail Sesi Kelas'}
          backgroundColor="white"
          subLabel={full_name}
        />
      ),
    });
  }, [full_name, navigation]);
  const formatDateToCustomFormat = (dateString: any) => {
    const formattedDate = convertDate(dateString)
      .locale('id')
      .format('dddd, D MMMM YYYY • HH:MM');
    return formattedDate;
  };
  const formatDateToCustomFormatNoDays = (dateString: any) => {
    const formattedDate = convertDate(dateString).locale('id').format('HH:MM');
    return formattedDate;
  };
  const [count, setCount] = useState(1);
  const {
    dataDetailSession,
    image,
    avatarStudentJoin,
    avatarStudentNotJoin,
    getDetailSession,
  } = useFormDetailSessionClass(id);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[styles.row, {padding: 16}]}>
          <Text style={[styles.textBlue, styles.labelBlue]}>
            {dataDetailSession?.rombel_class?.name}
          </Text>
          <Text style={[styles.textBlue, styles.labelBlue]}>
            {dataDetailSession?.type}
          </Text>
          <Text style={[styles.textBlue, styles.labelBlue]}>
            {dataDetailSession?.platform}
          </Text>
        </View>
        {dataDetailSession?.type === 'record' ||
        dataDetailSession?.status === 'finish' ? (
          <VideoPlayer
            uri={dataDetailSession?.media?.path_url}
            status={dataDetailSession?.media?.status}
            thumbnail={dataDetailSession?.media?.thumbnail}
            fetch={getDetailSession}
          />
        ) : null}
        <View style={[styles.rowBetween, {alignItems: 'flex-start'}]}>
          <View style={{padding: 16}}>
            <Text style={styles.textTitle}>
              {dataDetailSession?.subject?.name}
            </Text>
            <Text style={styles.textTitleBigBlack}>
              {dataDetailSession?.title}
            </Text>
            <Text style={styles.textSubTitle}>
              {formatDateToCustomFormat(dataDetailSession?.time_start)} -{' '}
              {formatDateToCustomFormatNoDays(dataDetailSession?.time_end)}
            </Text>
            <Text
              style={
                dataDetailSession?.status === 'unstarted'
                  ? styles.textNotLive
                  : styles.textLive
              }>
              {dataDetailSession?.status}
            </Text>
          </View>
          {!image?.data?.path_url ? null : image?.data?.path_url?.endsWith(
              '.svg',
            ) ? (
            <SvgUri
              uri={image?.data?.path_url}
              style={styles.image}
              onError={() => {
                // eslint-disable-next-line no-console
                console.log('Error loading SVG');
              }}
            />
          ) : (
            <Image
              source={{uri: image?.data?.path_url1}}
              style={styles.image}
              onError={() => {
                // eslint-disable-next-line no-console
                console.log('Error loading image');
              }}
            />
          )}
        </View>
        <View style={styles.line} />
        <View style={{padding: 16}}>
          <Text style={styles.textTitleBlack}>Deskripsi</Text>
          <Text style={styles.textSubTitle}>
            {dataDetailSession?.description}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={[styles.row, {padding: 16, alignItems: 'center'}]}>
          <Avatar
            id={dataDetailSession?.user_created_by?.avatar}
            style={styles.image}
          />
          <View>
            <Text style={styles.textTitleBlack}>Di ajar oleh</Text>
            <Text style={styles.textSubTitle}>
              {dataDetailSession?.user_created_by?.full_name}
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        {dataDetailSession?.status === 'finish' ? null : (
          <View>
            <View>
              <View style={{padding: 16}}>
                <Text style={styles.textTitleBlack}>Peserta</Text>
              </View>
              <View>
                <View style={styles.rowBetween}>
                  <Pressable
                    style={styles.buttonChoose}
                    onPress={() => setCount(1)}>
                    <Text
                      style={
                        count === 1 ? styles.textBlueBold : styles.textGrey
                      }>
                      Hadir
                    </Text>
                    <View
                      style={
                        count === 1
                          ? styles.textNumberBlue
                          : styles.textNumberGrey
                      }>
                      <Text
                        style={[
                          count === 1 ? styles.textBlueBold : styles.textGrey,
                        ]}>
                        {dataDetailSession?.participant?.join?.length}
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable
                    style={styles.buttonChoose}
                    onPress={() => setCount(2)}>
                    <Text
                      style={
                        count === 2 ? styles.textBlueBold : styles.textGrey
                      }>
                      Tidak Hadir
                    </Text>
                    <View
                      style={
                        count !== 1
                          ? styles.textNumberBlue
                          : styles.textNumberGrey
                      }>
                      <Text
                        style={[
                          count !== 1 ? styles.textBlueBold : styles.textGrey,
                        ]}>
                        {dataDetailSession?.participant?.not_join?.length}
                      </Text>
                    </View>
                  </Pressable>
                </View>
                <View style={[styles.rowBetween, {alignItems: 'flex-end'}]}>
                  <View
                    style={
                      count === 1 ? styles.lineActive : styles.lineDeactivate
                    }
                  />
                  <View
                    style={
                      count === 2 ? styles.lineActive : styles.lineDeactivate
                    }
                  />
                </View>
              </View>
            </View>
            <View>
              <View>
                {dataDetailSession?.participant?.join?.length === 0 &&
                dataDetailSession?.participant?.not_join?.length === 0 ? (
                  <View style={styles.empty}>
                    <Robot width={100} />
                    <Text style={styles.textTitleBigBlack}>
                      Belum Ada Peserta
                    </Text>
                    <Text style={[styles.textSubTitle, {textAlign: 'center'}]}>
                      Belum ada peserta yang bergabung karena kelas belum
                      berlangsung.
                    </Text>
                  </View>
                ) : (
                  <>
                    {count === 1 && (
                      <View>
                        {avatarStudentJoin?.map((item, i) => (
                          <View
                            key={i}
                            style={[
                              styles.row,
                              {alignItems: 'center', padding: 16},
                            ]}>
                            <FastImage
                              source={{uri: item?.path_url}}
                              style={styles.image_2}
                            />
                            <Text style={styles.textTitleBlack}>
                              {item?.user?.full_name}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                    {count === 2 && (
                      <View>
                        {avatarStudentNotJoin?.map((item, i) => (
                          <View
                            key={i}
                            style={[
                              styles.row,
                              {alignItems: 'center', padding: 16},
                            ]}>
                            <FastImage
                              source={{uri: item?.path_url}}
                              style={styles.image_2}
                            />
                            <Text style={styles.textTitleBlack}>
                              {item?.user?.full_name}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      {dataDetailSession?.type === 'record' ? null : (
        <View>
          <Button
            label="Masuk Kelas"
            style={styles.buttonJoin}
            action={() =>
              // navigation.navigate('LMSTeacherMeetingLiveSessionScreen')
              {
                if (item?.platform === 'google_meet') {
                  if (item?.gmeet_id !== '') {
                    const meetUrl = `https://meet.google.com/${item?.gmeet_id}`;
                    Linking.openURL(meetUrl)
                      .then(() => {
                        navigation.goBack();
                      })
                      .catch(() => {});
                  } else {
                    Toast?.show({
                      type: 'error',
                      text1: 'Tidak dapat menemukan google meet id',
                    });
                  }
                } else if (item?.platform === 'zoom') {
                  dispatch(
                    fetchTeacherJoinMeeting(item?.id, () =>
                      navigation.navigate('LMSTeacherMeetingLiveSessionScreen'),
                    ),
                  );
                }
              }
            }
          />
        </View>
      )}
    </View>
  );
};

export {DetailSessionClassScreen};
