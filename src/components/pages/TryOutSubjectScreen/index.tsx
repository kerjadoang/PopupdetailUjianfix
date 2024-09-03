import {View, Text, Pressable, FlatList, Dimensions} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Header, SwipeUp} from '@components/atoms';
import Colors from '@constants/colors';
import {styles} from './styles';
import Left from '@assets/svg/ic24_chevron_left_white.svg';
import Calendar from '@assets/svg/clipboard-list.svg';
import Clock from '@assets/svg/clock-3.svg';
import Down from '@assets/svg/ic24_chevron_down_blue.svg';
import useFormTryOutSubject from './useFormTryOutSubject';
import Up from '@assets/svg/ic24_chevron_up_blue.svg';
import Right from '@assets/svg/ic_arrow_right_grey.svg';
import Lock from '@assets/svg/ic24_lock.svg';
import Check from '@assets/svg/ic_checklist_green.svg';
import MapelMatematika from '@assets/svg/ic56_mapel_matematika.svg';
import {SvgUri} from 'react-native-svg';
import Fonts from '@constants/fonts';
import {SubjectProgress} from '@services/ptn/type';
import ClipBoardIcon from '@assets/svg/clipboard-list.svg';
import ClockIcon from '@assets/svg/clock-3.svg';
import RenderHTML from 'react-native-render-html';
import {useStartTryoutPerSubject} from '@services/ptn';
import {parseHtml} from '@constants/functional';

const TryOutSubjectScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'TryOutSubjectScreen'>>();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'TryOutSubjectScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={route?.params?.title ?? 'Try Out'}
          backgroundColor={Colors.primary.base}
          colorLabel={'white'}
          iconLeft={<Left width={18} height={18} />}
        />
      ),
    });
  }, [navigation]);
  const {id, register_id} = route?.params || {};
  const {data, selectedItem, setSelectedItem, tryoutHistoryId} =
    useFormTryOutSubject(id, register_id);
  const [showDropDown, setshowDropDown] = useState(false);
  const [selectedSubjectProgress, setSelectedSubjectProgress] =
    useState<SubjectProgress>();
  const [showSwipeUp, setShowSwipeUp] = useState<boolean>(false);
  const {mutate: starTryoutPerSubject} = useStartTryoutPerSubject();

  const isTPS = selectedItem?.category === 'tps';

  const onStartTryoutPerSubject = async () => {
    const getNextSubjectIndex =
      (selectedItem?.subject as []).findIndex(
        item => item.id === selectedSubjectProgress?.id,
      ) + 1;
    try {
      const res = await starTryoutPerSubject({
        tryout_user_history_id: Number(tryoutHistoryId),
        subject_id: selectedSubjectProgress?.id!,
        condition: 'start',
      });
      setShowSwipeUp(false);
      navigation.push('TryOutQuestionScreen', {
        data: res.data ?? {},
        progressData: selectedItem?.subject,
        nextProgressData: isTPS
          ? selectedItem?.subject?.[getNextSubjectIndex]
          : null,
        type: selectedItem?.category,
        title: selectedSubjectProgress?.name ?? 'Try Out',
        remainDuration: selectedItem?.remain_duration,
      });
    } catch (e) {}
  };

  const renderItem = ({item}: {item: ItemData}) => {
    return (
      <>
        {item?.subject !== null ? (
          <View>
            <Pressable
              style={[{marginTop: 20}]}
              onPress={() => {
                setshowDropDown(!showDropDown);
                setSelectedItem(item);
              }}>
              <View style={styles.rowBetween}>
                <Text style={[styles.textTitleBlack]}>
                  {item?.category.toUpperCase()}
                </Text>
                <View style={[styles.row]}>
                  <View style={[styles.row, {marginRight: 10}]}>
                    <Calendar width={16} height={16} style={{marginRight: 5}} />
                    <Text style={styles.textSubTitleGrey}>
                      {item?.total_question} Soal
                    </Text>
                  </View>
                  <View style={[styles.row, {marginRight: 10}]}>
                    <Clock width={16} height={16} style={{marginRight: 5}} />
                    <Text style={styles.textSubTitleGrey}>
                      {item?.total_duration} Menit
                    </Text>
                  </View>
                  {showDropDown && selectedItem?.category === item?.category ? (
                    <Up width={24} height={24} />
                  ) : (
                    <Down width={24} height={24} />
                  )}
                </View>
              </View>
            </Pressable>
            {selectedItem?.category === item?.category && showDropDown ? (
              <View style={[styles.card, styles.shadowProp]}>
                {item?.subject?.map((_item: SubjectProgress, i: number) => {
                  return (
                    <Pressable
                      style={[styles.row, {marginVertical: 5, width: '100%'}]}
                      key={i}
                      disabled={
                        _item?.is_locked || _item?.status === 'finish'
                          ? true
                          : false
                      }
                      onPress={() => {
                        setSelectedSubjectProgress(_item);
                        setShowSwipeUp(true);
                      }}>
                      <View style={[styles.rowBetween, {width: '100%'}]}>
                        <View style={[styles.row, {width: '75%'}]}>
                          {_item?.path_url ? (
                            <SvgUri
                              uri={_item?.path_url}
                              style={styles.icon}
                              width={48}
                              height={48}
                            />
                          ) : (
                            <MapelMatematika width={48} height={48} />
                          )}
                          <View>
                            <Text style={[styles.textTitle]}>
                              {_item?.name}
                            </Text>
                            <View style={styles.row}>
                              <Calendar
                                width={16}
                                height={16}
                                style={{marginRight: 5}}
                              />
                              <Text style={styles.textSubTitleGrey}>
                                {_item?.total_question} Soal
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={[styles.row]}>
                          {_item?.status === 'finish' ? (
                            <Check width={24} height={24} />
                          ) : null}
                          {_item?.is_locked && _item?.status === 'unfinish' ? (
                            <Lock width={24} height={24} />
                          ) : (
                            <Right width={24} height={24} />
                          )}
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
          </View>
        ) : null}
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.scrollview}>
        <FlatList
          initialNumToRender={10}
          renderItem={renderItem}
          data={data ? data : []}
        />
      </View>
      <SwipeUp
        height={100}
        visible={showSwipeUp}
        onClose={() => setShowSwipeUp(false)}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 16,
            paddingTop: 10,
            gap: 12,
          }}>
          <Text
            style={{
              fontFamily: Fonts.SemiBoldPoppins,
              fontSize: 20,
              textAlign: 'center',
              color: Colors.dark.neutral100,
            }}>
            {selectedItem?.category?.toUpperCase()} •{' '}
            {selectedSubjectProgress?.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              justifyContent: 'center',
            }}>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 7,
                borderRadius: 30,
                backgroundColor: Colors.primary.light3,
                gap: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ClipBoardIcon />
              <Text
                style={{
                  fontFamily: Fonts.SemiBoldPoppins,
                  color: Colors.primary.base,
                  fontSize: 14,
                }}>
                {selectedSubjectProgress?.total_question} Soal
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 7,
                borderRadius: 30,
                backgroundColor: Colors.primary.light3,
                gap: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ClockIcon />
              <Text
                style={{
                  fontFamily: Fonts.SemiBoldPoppins,
                  color: Colors.primary.base,
                  fontSize: 14,
                }}>
                {selectedItem?.total_duration} Menit
              </Text>
            </View>
          </View>
          <View>
            <RenderHTML
              contentWidth={Dimensions.get('screen').width - 32}
              baseStyle={{color: Colors.black}}
              source={{
                html: parseHtml(selectedSubjectProgress?.description ?? ''),
              }}
            />
          </View>
          <Button label="Mulai" action={onStartTryoutPerSubject} />
        </View>
      </SwipeUp>
    </View>
  );
};

export {TryOutSubjectScreen};
