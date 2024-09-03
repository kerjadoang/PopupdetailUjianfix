/* eslint-disable react-hooks/exhaustive-deps */
import {
  SwipeUp,
  SwipeUpProps,
  CheckboxInput,
  Button,
  EmptyDisplay,
  MainText,
} from '@components/atoms';
import Colors from '@constants/colors';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {IJadwalkanUjianFormValues} from '../CreateJadwalUjianScreen';
import SearchInput from '@components/atoms/SearchInput';
import MaskotIconEmptyState from '@assets/svg/robot_empty_search.svg';
import {List} from 'react-native-paper';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

type InputRombelUserProps = {
  inputs?: any;
  selectedVal?: any;
  onSelect?: (name: keyof IJadwalkanUjianFormValues, val: any) => void;
  selectedOption?: IBaseRombelUser[];
  setSearchRombelUserQuery: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  searchRombelUserQuery: string | undefined;
  isEditOrDuplicate?: boolean;
} & SwipeUpProps;

type INewSelectAllUser = {
  name: string;
  rombel_id?: number;
};

const InputRombelUser: React.FC<InputRombelUserProps> = props => {
  const [selectedUser, setSelectedUser] = useState<IBaseRombelUser[]>([]);
  const [selectAllUserRombel, setSelectAllUserRombel] = useState<
    INewSelectAllUser[]
  >([]);
  const plainData: ISelectMultiRombel[] = props.inputs;
  const [expandedId, setExpandedId] = useState<any>();

  useEffect(() => {
    if (props.visible) {
      setSelectedUser(props.selectedOption || []);
    }
  }, [props.visible]);

  const onSelect = (val: IBaseRombelUser) => {
    const userRombelId = val.user_rombel?.[0]?.rombel_class_school_id;
    const userRombelName = val.user_rombel?.[0].rombel_class_school_name || '';
    const isExist = selectedUser?.some(user => user?.id === val?.id);
    if (isExist) {
      const filterUser = selectedUser?.filter(user => user?.id !== val?.id);
      setSelectedUser(filterUser);

      setSelectAllUserRombel(prevState =>
        prevState.filter(data => data.rombel_id !== userRombelId),
      );
    } else {
      const finalSelectedUser = [...(selectedUser ?? []), val];
      const currentUserRombel = finalSelectedUser?.filter?.(
        user => user.user_rombel?.[0].rombel_class_school_id === userRombelId,
      );

      const plainDataRombel =
        plainData?.find(data => data.rombel_class_school_id === userRombelId)
          ?.rombel_user || [];

      setSelectedUser(finalSelectedUser);
      const newSelectedRombel: INewSelectAllUser = {
        name: userRombelName,
        rombel_id: userRombelId,
      };

      setSelectAllUserRombel(prevState =>
        currentUserRombel.length === plainDataRombel.length
          ? [...prevState, newSelectedRombel]
          : prevState.filter(data => data.rombel_id !== userRombelId),
      );
    }
  };

  const _onAccordionPress = (newExpandedId: string | number) =>
    expandedId === newExpandedId
      ? setExpandedId(undefined)
      : setExpandedId(newExpandedId);

  const renderItem = useCallback(
    (item: IBaseRombelUser) => {
      return (
        <View
          style={{width: '100%', gap: 12, paddingTop: 12}}
          key={`${item?.id}`}>
          <CheckboxInput
            label={item?.full_name}
            onPress={() => onSelect(item)}
            selected={selectedUser?.some(selected => selected?.id === item?.id)}
          />
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: Colors.dark.neutral20,
            }}
          />
        </View>
      );
    },
    [selectedUser],
  );

  return (
    <SwipeUp {...props}>
      <View
        style={{
          paddingHorizontal: 16,
          padding: 16,
          gap: 16,
          height: expandedId ? WINDOW_HEIGHT - 100 : 450,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            color: Colors.dark.neutral100,
            textAlign: 'center',
          }}>
          Pilih Murid
        </Text>
        <SearchInput
          query={props.searchRombelUserQuery ?? ''}
          onClear={() => props.setSearchRombelUserQuery('')}
          onChangeText={text => props.setSearchRombelUserQuery(text)}
          placeholder="Cari Murid"
        />
        <List.AccordionGroup
          expandedId={expandedId}
          onAccordionPress={_onAccordionPress}>
          <FlatList
            data={props?.inputs}
            renderItem={(item: IMultipleRombel) => {
              const isCheckedAll = selectAllUserRombel.some(
                rombel => rombel.rombel_id === item.item.rombel_class_school_id,
              );
              return (
                <List.Accordion
                  id={item?.item.rombel_class_school_id}
                  title={
                    <MainText type="SemiBold" fontSize={16}>
                      {item?.item?.rombel_class_school_name}
                    </MainText>
                  }>
                  <View style={{paddingHorizontal: 12}}>
                    {!props?.searchRombelUserQuery ? (
                      <View
                        style={{width: '100%', gap: 12}}
                        key={Math.random()}>
                        <CheckboxInput
                          label={'Semua Murid'}
                          // containerStyle={{paddingVertical: 12}}
                          onPress={() => {
                            setSelectedUser(prevState => {
                              return !isCheckedAll
                                ? [...prevState, ...item?.item?.rombel_user]
                                : prevState.filter(
                                    data =>
                                      data.user_rombel?.[0]
                                        ?.rombel_class_school_id !==
                                      item.item.rombel_class_school_id,
                                  );
                            });

                            const newSelectedRombel: INewSelectAllUser = {
                              name: item.item.rombel_class_school_name,
                              rombel_id: item.item.rombel_class_school_id,
                            };

                            setSelectAllUserRombel(prevState =>
                              prevState.pushOrRemove(newSelectedRombel, {
                                customCondition: (data: INewSelectAllUser) =>
                                  data.rombel_id ===
                                  item.item.rombel_class_school_id,
                              }),
                            );
                          }}
                          selected={isCheckedAll}
                        />
                        <View
                          style={{
                            height: 1,
                            width: '100%',
                            backgroundColor: Colors.dark.neutral20,
                          }}
                        />
                      </View>
                    ) : null}
                    {item?.item?.rombel_user.map((user: any) => {
                      return <View key={user?.id}>{renderItem(user)}</View>;
                    })}
                  </View>
                </List.Accordion>
              );
            }}
            ListEmptyComponent={() => (
              <EmptyDisplay
                title={'Pencarian Tidak Ditemukan'}
                desc={`Hasil pencarian "${props.searchRombelUserQuery}" nihil.\n Coba masukkan kata kunci lainnya!`}
                titleStyle={{fontSize: 16, textAlign: 'center'}}
                descStyle={{fontSize: 14}}
                btnLabelStyle={{fontSize: 16}}
                btnContainerStyle={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
                imageSvg={<MaskotIconEmptyState />}
              />
            )}
          />
        </List.AccordionGroup>
        <View
          style={{
            paddingTop: 16,
            backgroundColor: Colors.white,
          }}>
          <Button
            label="Simpan"
            action={() => {
              setExpandedId(undefined);
              return props.onSelect?.('users', selectedUser);
            }}
            isDisabled={selectedUser.length < 1 || !plainData}
          />
        </View>
      </View>
    </SwipeUp>
  );
};

export default InputRombelUser;
