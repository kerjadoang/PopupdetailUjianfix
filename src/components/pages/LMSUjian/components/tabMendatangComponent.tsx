/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TabEmptyComponent from './tabEmptyComponent';
import {Styles} from '../style';
import ChevronIcon from '@assets/svg/ic16_chevron_right.svg';
import ChevronIconWhite from '@assets/svg/ic16_chevron_down_white.svg';
import CardExamComponent from './cardExamComponent';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetLMSListUjian, getLMSListUjianDestroy} from '@redux';
import Colors from '@constants/colors';
import {Button, SwipeUp} from '@components/atoms';
import {useIsFocused} from '@react-navigation/native';
import IconUp from '@assets/svg/ic16_chevron_up.svg';
import IconDown from '@assets/svg/ic16_chevron_down.svg';
import {useAsyncEffect} from '@hooks/useAsyncEffect';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {RootState} from 'src/redux/rootReducer';

const LIMIT_OFFSET = {
  page: 1,
  limit: 10,
};
const TabMendatangComponent = ({route}: any) => {
  const {
    handleOpenPopUp,
    handleSetPopUpType,
    handleSetCardData,
    fetchOnExamGoingData,
  } = route.params;

  const getLMSListUjian: any = useSelector(
    (state: RootState) => state.getLMSListUjian,
  );
  const listUjianData = getLMSListUjian?.data ?? [];

  const [isOpenPopUpSubject, setIsOpenPopUpSubject] = useState<boolean>(false);
  const [listSubjectId, setListSubjectId]: any = useState<
    {id: any; name: string; is_choosed: boolean}[]
  >([]);
  const [choosedListSubjectId, setChoosedListSubjectId]: any = useState<
    number[]
  >([]);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const [seeAll, setSeeAll] = useState<boolean>(false);
  const subjectFilter = listSubjectId;
  const [pagination, setPagination] = useState<any>(LIMIT_OFFSET);
  const isLoadingGetList = getLMSListUjian.loading;

  const __onEndReached = () => {
    const {nextPage, loading} = getLMSListUjian;
    if (nextPage && !loading) {
      setPagination((prevState: any) => ({
        ...prevState,
        page: pagination.page + 1,
      }));
    }
  };

  useEffect(() => {
    if (!isFocus) {
      return;
    }
    fetchData();
  }, [isFocus, pagination, choosedListSubjectId]);

  useEffect(() => {
    return () => {
      dispatch(getLMSListUjianDestroy());
    };
  }, []);

  const fetchData = () => {
    dispatch(
      fetchGetLMSListUjian(
        {
          ...pagination,
          search: '',
          status_student: [],
          subject_id: choosedListSubjectId,
          status: ['scheduled'],
          resetList: pagination === LIMIT_OFFSET,
        },
        async (res: any) => {
          const _resListSubject: {
            id: any;
            name: string;
            is_choosed: boolean;
          }[] = [];
          const promises = res?.data?.data?.map((listExamData: any) => {
            _resListSubject.push({
              id: listExamData?.subject?.id,
              name: listExamData?.subject?.name,
              is_choosed: false,
            });
          });
          await Promise.all(promises);
          // if (listSubjectId.length != 0) return;
          // setListSubjectId(_resListSubject);
        },
      ),
    );
  };

  const refetchData = () => {
    setChoosedListSubjectId([]);
    dispatch(getLMSListUjianDestroy());
    fetchOnExamGoingData?.();
  };

  useEffect(() => {
    setPagination(LIMIT_OFFSET);
  }, [choosedListSubjectId]);

  const resetSubjectFilter = () => {
    const resetArray = subjectFilter?.map(
      (item: {id: any; name: string; is_choosed: boolean}) => {
        return {...item, is_choosed: false};
      },
    );
    setListSubjectId(resetArray);
  };

  //get list subject for filter mapel
  useAsyncEffect(async () => {
    const resListSubject = await apiGet({url: URL_PATH.get_list_subject});
    const mappedResListSubject = resListSubject?.map((item: any) => ({
      ...item,
      is_choosed: false,
    }));
    setListSubjectId(mappedResListSubject);
  }, []);

  const renderChildrenPopUpSubject = () => (
    <View
      style={[
        Styles.popUpContentContainer,
        // {minHeight: WINDOW_HEIGHT * Number(`0.${listSubjectId.length}`)},
      ]}>
      <View style={Styles.popUpContentInnerContainer}>
        <View style={Styles.popUpFilterContainer}>
          <Text style={Styles.popUpFilterText}>Filter</Text>
        </View>
        <View style={Styles.popUpSubHeaderContainer}>
          <View style={Styles.popUpSubHeaderLeft}>
            <Text style={Styles.popUpSubHeaderLeftText}>Mata Pelajaran</Text>
          </View>
          <View style={Styles.popUpSubHeaderRight}>
            <Pressable
              onPress={() => {
                const resetArray = subjectFilter?.map(
                  (item: {id: any; name: string; is_choosed: boolean}) => {
                    return {...item, is_choosed: true};
                  },
                );
                setListSubjectId(resetArray);
              }}>
              <Text style={Styles.popUpSubHeaderRightText}>Pilih Semua</Text>
            </Pressable>
          </View>
        </View>
        <ScrollView>
          <View style={Styles.popUpSubjectListContainer}>
            {subjectFilter?.map(
              (
                _subjectData: {id: any; name: string; is_choosed: boolean},
                index: number,
              ) => {
                if (!seeAll && index > 3) {
                  return <View key={'listSubject' + index} />;
                }

                return (
                  <Pressable
                    key={'listSubject' + index}
                    onPress={() => {
                      const updatedArray = subjectFilter?.map(
                        (item: {
                          id: any;
                          name: string;
                          is_choosed: boolean;
                        }) => {
                          if (item.id === _subjectData?.id) {
                            return {...item, is_choosed: !item?.is_choosed};
                          }
                          return item;
                        },
                      );
                      setListSubjectId(updatedArray);
                    }}
                    style={
                      _subjectData?.is_choosed
                        ? Styles.popUpSubjectCardChoosed
                        : Styles.popUpSubjectCard
                    }>
                    <Text
                      style={
                        _subjectData?.is_choosed
                          ? Styles.popUpSubjectCardTextChoosed
                          : Styles.popUpSubjectCardText
                      }>
                      {_subjectData?.name}
                    </Text>
                  </Pressable>
                );
              },
            )}
          </View>
        </ScrollView>
        {seeAll ? (
          <TouchableOpacity
            style={Styles.popUpShowAllContainer}
            onPress={() => setSeeAll(false)}>
            <Text style={Styles.popUpShowAllButton}>Tampilkan Sedikit</Text>
            <IconUp width={16} height={16} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={Styles.popUpShowAllContainer}
            onPress={() => setSeeAll(true)}>
            <Text style={Styles.popUpShowAllButton}>Tampilkan Semua</Text>
            <IconDown width={16} height={16} />
          </TouchableOpacity>
        )}

        <View style={Styles.popUpSubmitButtonContainer}>
          <View style={Styles.popUpSubmitButton}>
            <Button
              action={async () => {
                const resetArray = subjectFilter?.map(
                  (item: {id: any; name: string; is_choosed: boolean}) => {
                    return {...item, is_choosed: false};
                  },
                );
                setListSubjectId(resetArray);
              }}
              background={Colors.white}
              color={Colors.primary.base}
              borderColor={Colors.primary.base}
              borderWidth={1}
              label="Atur Ulang"
            />
          </View>
          <View style={Styles.popUpSubmitButton}>
            <Button
              action={async () => {
                const _resChoosedSubject: {
                  id: any;
                  name: string;
                  is_choosed: boolean;
                }[] = [];
                subjectFilter?.map(
                  (item: {id: any; name: string; is_choosed: boolean}) => {
                    if (item.is_choosed) {
                      _resChoosedSubject.push(item?.id);
                    }
                  },
                );
                setChoosedListSubjectId(_resChoosedSubject);
                setIsOpenPopUpSubject(false);
                setSeeAll(false);
              }}
              label="Terapkan"
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={Styles.tabMendatangContainer}>
      <View style={Styles.tabContentContainerStyle}>
        <View style={Styles.tabMendatangSecondInnerContainer}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {/* button filter mapel */}
            <TouchableOpacity
              onPress={() => {
                setIsOpenPopUpSubject(true);
              }}
              style={
                choosedListSubjectId?.length > 0
                  ? Styles.tabMapelFilterButtonStyle3
                  : Styles.tabMapelFilterButtonStyle2
              }>
              <Text
                style={
                  choosedListSubjectId?.length > 0
                    ? Styles.tabMapelTitleStyle2
                    : Styles.tabMapelTitleStyle
                }>
                {choosedListSubjectId?.length > 0
                  ? `${choosedListSubjectId?.length} Mapel`
                  : 'Semua Mapel'}
              </Text>
              <View
                style={
                  choosedListSubjectId?.length > 0
                    ? Styles.tabMapelIconStyle2
                    : Styles.tabMapelIconStyle
                }>
                {choosedListSubjectId?.length > 0 ? (
                  <ChevronIconWhite />
                ) : (
                  <ChevronIcon />
                )}
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <FlatList
          data={(listUjianData as [])?.removeDuplicate?.()}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, id): any => id}
          contentContainerStyle={Styles.contentContainerStyle}
          ListEmptyComponent={() => {
            if (isLoadingGetList) {
              return <ActivityIndicator />;
            }
            return (
              <TabEmptyComponent
                withFilter={choosedListSubjectId?.length !== 0}
                actionFilter={() => {
                  setChoosedListSubjectId([]);
                  resetSubjectFilter();
                }}
              />
            );
          }}
          onEndReached={__onEndReached}
          renderItem={({item}) => (
            <CardExamComponent
              filterType={'scheduled'}
              cardData={item}
              handleOpenPopup={handleOpenPopUp}
              handleSetPopUpType={handleSetPopUpType}
              handleSetCardData={() => handleSetCardData(item)}
              refetchData={refetchData}
            />
          )}
        />
      </View>
      {/* modal untuk filter mapel */}
      <SwipeUp
        isSwipeLine
        visible={isOpenPopUpSubject}
        onClose={() => {
          setSeeAll(false);
          return setIsOpenPopUpSubject(false);
        }}
        height={100}
        children={renderChildrenPopUpSubject()}
      />
    </View>
  );
};

export default TabMendatangComponent;
