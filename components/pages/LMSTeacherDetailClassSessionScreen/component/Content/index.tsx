import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Empty} from '../Empty';
import {convertDate} from '@constants/functional';
import ActiveStar from '@assets/svg/star-active.svg';
import Avatar from '@components/atoms/Avatar';
import {CCheckBox} from '@components/atoms';

type Props = {
  type?: string;
  status?: string;
  data: any;
  active: number;
  showMarkStudent?: any;
  isMarkSeveralStudent?: boolean;
  markSeveralStudentItems?: any;
  severalStudentItems?: any[];
};

const Content = ({
  type,
  status,
  data,
  active = 0,
  showMarkStudent,
  isMarkSeveralStudent,
  markSeveralStudentItems,
  severalStudentItems,
}: Props) => {
  const isSelectedList = active == 0 ? data?.join : data?.not_join;
  return (
    <>
      {!isSelectedList || isSelectedList?.length == 0 ? (
        <Empty />
      ) : (
        <View style={styles.container}>
          {isSelectedList?.map(
            (
              value: {
                id: number;
                class_session_id: number;
                time_start: any;
                time_end: any;
                status: string;
                user_id: number;
                rating: number;
                created_at: any;
                updated_at: any;
                user: {
                  id: number;
                  full_name: string;
                  avatar: string;
                  coin: number;
                  path_url: string;
                };
                average_rating: string;
                checked?: boolean;
              },
              index: any,
            ) => {
              const fullName = value?.user?.full_name;
              const timeStart = value?.time_start;
              const timeEnd = value?.time_end;
              const timeStartUser = timeStart
                ? convertDate(timeStart).format('HH:mm')
                : '-';
              const timeEndUser = timeEnd
                ? convertDate(timeEnd).format('HH:mm')
                : '-';

              return (
                <View key={value?.id}>
                  <View key={index} style={styles.card}>
                    <Avatar id={value?.user?.avatar} />

                    <View style={[styles.cardTextContainer, {flex: 3}]}>
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {fullName ?? '-'}
                      </Text>
                      {(timeStart || timeEnd) && type == 'live' ? (
                        <Text
                          style={
                            styles.cardDescription
                          }>{`Masuk: ${timeStartUser}  •  Keluar: ${timeEndUser}`}</Text>
                      ) : (timeStart || timeEnd) && type == 'record' ? (
                        <Text
                          style={
                            styles.cardDescription
                          }>{`Masuk: ${timeStartUser}`}</Text>
                      ) : null}
                    </View>
                    {active === 0 && value?.rating ? (
                      <View style={styles.rateContainer}>
                        <ActiveStar width={20} height={20} />
                        <Text style={styles.rateValue}>{value?.rating}</Text>
                      </View>
                    ) : null}
                    {active == 0 && type == 'live' && status == 'finish' && (
                      <View
                        style={[
                          styles.cardTextContainer,
                          styles.cardTextContainer2,
                        ]}>
                        {!isMarkSeveralStudent ? (
                          <Pressable
                            onPress={() => showMarkStudent(value)}
                            style={{flexDirection: 'row'}}>
                            <View style={styles.markContainer}>
                              <Text style={styles.markTitle}>
                                {value?.rating ? 'Ubah' : 'Nilai'}
                              </Text>
                            </View>
                          </Pressable>
                        ) : (
                          <CCheckBox
                            // isChecked={value?.checked ?? false}
                            isChecked={
                              severalStudentItems?.some(
                                data => data.id === value.id,
                              ) || false
                            }
                            onPressCheck={() => {
                              // if (value.checked) {
                              //   value.checked = false;
                              // } else {
                              //   value.checked = true;
                              // }
                              markSeveralStudentItems(value);
                            }}
                          />
                        )}
                      </View>
                    )}
                  </View>
                  {index != isSelectedList.length - 1 ? (
                    <View style={styles.gap} />
                  ) : null}
                </View>
              );
            },
          )}
        </View>
      )}
    </>
  );
};

export {Content};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flex: 1,
  },
  rateContainer: {
    // backgroundColor: 'pink',
    flexDirection: 'row',
    flex: 1 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  rateValue: {
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 2,
  },
  gap: {
    height: 16,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    flexDirection: 'row',
  },
  cardIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    borderRadius: 100,
    marginRight: 12,
  },
  cardTextContainer: {
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  cardDescription: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  cardTextContainer2: {
    // backgroundColor: 'cyan',
    // flexGrow: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  cardTextContainer3: {
    flex: 3,
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  markContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    maxHeight: 50,
    justifyContent: 'center',
    backgroundColor: Colors.primary.light3,
  },
  markTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
  },
});
