/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Pressable, FlatList} from 'react-native';
import Colors from '@constants/colors';
// routing
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, CCheckBox, MainView} from '@components/atoms';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
// const windoweight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;
import {virtualMeetingStateUpdate, fetchListUserRapatVirtual} from '@redux';
import BlueArrowLeft from '@assets/svg/blueArrowLeft.svg';
import IconSearchBlue from '@assets/svg/ic_search_blue.svg';
import SearchInput from '@components/atoms/SearchInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Avatar from '@components/atoms/Avatar';
import {_handlerRoleName} from '@constants/functional';
import IconClose from '@assets/svg/ic32_close_round.svg';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ParamList} from 'type/screen';
import RenderImage from '@components/atoms/RenderImage';

interface ISearch {
  status: boolean;
  value: string;
}
const RapatVirtualListParticipantsScreen = () => {
  // routing setup
  const currUser: IBaseUser = useSelector(
    (state: RootState) => state.getUser.data,
  );
  const dispatch: any = useDispatch();
  const {virtualMeetingState, virtualMeetingListUser} = useSelector(
    (state: RootState) => state,
  );
  const route =
    useRoute<RouteProp<ParamList, 'RapatVirtualListParticipantsScreen'>>();
  const navigation: any =
    useNavigation<
      StackNavigationProp<ParamList, 'RapatVirtualListParticipantsScreen'>
    >();

  // state
  const [search, setSearch] = useState<ISearch>({
    status: false,
    value: '',
  });

  useEffect(() => {
    dispatch(fetchListUserRapatVirtual(search?.value));
  }, [search.value]);

  const renderHeader = () => {
    return (
      <View style={styles.MB_24}>
        {search.status ? (
          <View style={[styles.row, styles.spaceCenter]}>
            <SearchInput
              query={search.value}
              onChangeText={function (text: string): void {
                setSearch({...search, value: text});
              }}
              onClear={() => {
                setSearch({...search, value: ''});
              }}
              cancelable={true}
              onPressCancel={() =>
                setSearch({...search, status: !search.status})
              }
            />
          </View>
        ) : (
          <View style={[styles.row, styles.spaceCenter]}>
            <Pressable onPress={() => navigation.goBack()}>
              <BlueArrowLeft width={18} height={18} />
            </Pressable>

            <Text style={styles.titlePage}>Pilih Peserta Rapat</Text>
            <TouchableOpacity
              onPress={() => setSearch({...search, status: !search.status})}>
              <IconSearchBlue width={24} height={24} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const {data: user} = virtualMeetingListUser;

  const _handlerOnPressCheckBox = (data: any) => {
    dispatch(virtualMeetingStateUpdate(data, 'participant'));
  };

  const _handlerOnPressCheckBoxAll = (data: any) => {
    dispatch(virtualMeetingStateUpdate(data, 'participant_all'));
  };

  const check = (data: any) => {
    const objectExists = virtualMeetingState?.participant
      ?.flat()
      ?.some?.((meeting: any) => {
        return JSON.stringify(meeting) === JSON.stringify(data);
      });
    return objectExists;
  };

  const submit = () => {
    if (virtualMeetingState.participant.length > 0) {
      navigation.goBack();
    } else {
      Toast.show({
        type: 'warning',
        text1: 'Tambahkan minimal 1 orang.',
      });
    }
  };

  return (
    <View style={styles.container}>
      {renderHeader()}

      {virtualMeetingState.participant.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.listParticipantRow}
          data={virtualMeetingState?.participant.flat()}
          renderItem={(item: any) => {
            item = item.item;
            return (
              <Pressable
                onPress={() => _handlerOnPressCheckBox(item)}
                key={item?.id}
                style={{width: 64, marginHorizontal: 8}}>
                <View style={{alignItems: 'center'}}>
                  <Avatar id={item?.avatar} />
                  <TouchableOpacity
                    onPress={() => {}}
                    style={{marginTop: -20, marginRight: -10}}>
                    <IconClose width={32} height={32} />
                  </TouchableOpacity>
                </View>

                <Text
                  style={[styles.cardRoleTitle, {textAlign: 'center'}]}
                  numberOfLines={2}>
                  {item?.full_name}
                </Text>
              </Pressable>
            );
          }}
        />
      )}

      <MainView
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <View style={[styles.row, styles.MT_8]}>
          <Text style={styles.selectAllText}>Pilih Semua</Text>
        </View>

        <CCheckBox
          isChecked={virtualMeetingState?.isCheckAll}
          onPressCheck={() => {
            const allUser = user?.flatMap((item: any) => {
              return item.user.map((user: any) => user);
            });

            if (!virtualMeetingState?.isCheckAll) {
              _handlerOnPressCheckBoxAll(allUser);
            } else {
              _handlerOnPressCheckBoxAll([]);
            }
          }}
        />
      </MainView>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.MB_50}
        data={user}
        renderItem={(item: any) => {
          item = item.item;
          return (
            <>
              {item?.user && (
                <View key={item?.id} style={[styles.row, styles.MT_8]}>
                  <Text style={styles.typeUser}>{item?.name}</Text>
                </View>
              )}
              {}

              {item?.user?.map((spesificUser: any) => {
                return (
                  <View key={spesificUser?.id}>
                    <View style={styles.card}>
                      <View style={styles.row}>
                        <Avatar id={spesificUser?.avatar} />
                        <View>
                          <Text style={styles.cardNameTitle}>
                            {spesificUser?.full_name || '-'}
                          </Text>
                          <Text style={styles.cardRoleTitle}>
                            {_handlerRoleName(spesificUser?.user_type_id)}
                          </Text>
                        </View>
                      </View>
                      <CCheckBox
                        isChecked={check(spesificUser)}
                        onPressCheck={() => {
                          _handlerOnPressCheckBox(spesificUser);
                        }}
                      />
                    </View>
                    <View style={styles.gapVertical20} />
                  </View>
                );
              })}
            </>
          );
        }}
      />

      <View style={styles.containerBottomShadow}>
        <Button label={'Tambahkan'} action={() => submit()} fontSize={16} />
      </View>
    </View>
  );
};
export {RapatVirtualListParticipantsScreen};
