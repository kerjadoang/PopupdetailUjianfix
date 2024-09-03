import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
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
import {fetchgetLMSListUjianRiwayat} from '@redux';
import Colors from '@constants/colors';
import {Button, SwipeUp} from '@components/atoms';
import {useIsFocused} from '@react-navigation/native';
import IconUp from '@assets/svg/ic16_chevron_up.svg';
import IconDown from '@assets/svg/ic16_chevron_down.svg';
import SearchInput from '@components/atoms/SearchInput';
import {isStringContains} from '@constants/functional';
import {useAsyncEffect} from '@hooks/useAsyncEffect';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {RootState} from 'src/redux/rootReducer';
const LIMIT_OFFSET = {
  page: 1,
  limit: 10,
};

const TabRiwayatComponent = ({route}: any) => {
  const {handleOpenPopUp, handleSetPopUpType, handleSetCardData} = route.params;
  const getLMSListUjian: any = useSelector(
    (state: RootState) => state.getLMSListUjian,
  );
  const listUjianData = getLMSListUjian?.riwayatData ?? [];
  const [isOpenPopUpSubject, setIsOpenPopUpSubject] = useState<boolean>(false);
  const [isOpenPopUpEvaluation, setIsOpenPopUpEvaluation] =
    useState<boolean>(false);
  const [listSubjectId, setListSubjectId]: any = useState<
    {id: any; name: string; is_choosed: boolean}[]
  >([]);
  const [listStudentType, setListStudentType]: any = useState<
    {id: any; name: string; is_choosed: boolean}[]
  >([
    {id: 1, name: 'done', is_choosed: false},
    {id: 2, name: 'done_scoring', is_choosed: false},
  ]);
  const [choosedListSubjectId, setChoosedListSubjectId]: any = useState<
    number[]
  >([]);
  const [choosedEvaluationType, setChoosedEvaluationType]: any = useState<
    string[]
  >([]);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const [seeAll, setSeeAll] = useState<boolean>(false);
  const subjectFilter = listSubjectId;
  const isLoadingGetList = getLMSListUjian.loadingRiwayat;

  const [pagination, setPagination] = useState<any>(LIMIT_OFFSET);
  const [searchTxt, setSearchTxt] = useState<string>('');

  const __onEndReached = () => {
    const {riwayatNextPage, loadingRiwayat} = getLMSListUjian;
    if (riwayatNextPage && !loadingRiwayat) {
      setPagination((prevState: any) => ({
        ...prevState,
        page: pagination.page + 1,
      }));
    }
  };

  const refetchRiwayat = useCallback(() => {
    dispatch(
      fetchgetLMSListUjianRiwayat(
        {
          ...pagination,
          search: searchTxt,
          // status_student:
          //   choosedEvaluationType?.length === 0
          //     ? ['done', 'done_scoring']
          //     : choosedEvaluationType,
          subject_id: choosedListSubjectId,
          status:
            choosedEvaluationType?.length === 0
              ? ['done', 'done_scoring']
              : choosedEvaluationType,
          resetList: pagination === LIMIT_OFFSET,
        },
        async (res: any) => {
          const _resListSubject: {
            id: any;
            name: string;
            is_choosed: boolean;
          }[] = [];
          const promises = res?.data?.data?.map((listExamData: any) => {
            const _foundObj = _resListSubject.find(
              (item: any) => item?.id === listExamData?.subject?.id,
            );

            if (!_foundObj) {
              _resListSubject.push({
                id: listExamData?.subject?.id,
                name: listExamData?.subject?.name,
                is_choosed: false,
              });
            }
          });
          await Promise.all(promises);
          // if (listSubjectId.length != 0) return;
          // setListSubjectId(_resListSubject);
        },
      ),
    );
  }, [
    choosedEvaluationType,
    choosedListSubjectId,
    dispatch,
    pagination,
    searchTxt,
  ]);

  useEffect(() => {
    if (!isFocus) {
      return;
    }
    refetchRiwayat();
  }, [
    isFocus,
    pagination,
    choosedListSubjectId,
    choosedEvaluationType,
    searchTxt,
    refetchRiwayat,
  ]);

  useEffect(() => {
    setPagination(LIMIT_OFFSET);
  }, [choosedListSubjectId, choosedEvaluationType]);

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
        <TouchableOpacity
          style={Styles.popUpShowAllContainer}
          onPress={() => setSeeAll(!seeAll)}>
          <Text style={Styles.popUpShowAllButton}>
            Tampilkan {seeAll ? 'Sedikit' : 'Semua'}
          </Text>
          {seeAll ? (
            <IconUp width={16} height={16} />
          ) : (
            <IconDown width={16} height={16} />
          )}
        </TouchableOpacity>

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
                    return item;
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

  const renderChildrenPopUpEvaluation = () => (
    <View style={Styles.popUpContentContainer}>
      <View style={Styles.popUpContentInnerContainer}>
        <View style={Styles.popUpFilterContainer}>
          <Text style={Styles.popUpFilterText}>Filter</Text>
        </View>
        <View style={Styles.popUpSubHeaderContainer}>
          <View style={Styles.popUpSubHeaderLeft}>
            <Text style={Styles.popUpSubHeaderLeftText}>Penilaian</Text>
          </View>
          <View style={Styles.popUpSubHeaderRight} />
        </View>
        <View style={Styles.popUpSubjectListContainer}>
          <Pressable
            onPress={() => {
              const updatedArray = listStudentType.map(
                (item: {id: any; name: string; is_choosed: boolean}) => {
                  if (item.id === 1) {
                    return {...item, is_choosed: !item?.is_choosed};
                  }
                  return item;
                },
              );
              setListStudentType(updatedArray);
            }}
            style={
              listStudentType?.[0]?.is_choosed
                ? Styles.popUpSubjectCardChoosed
                : Styles.popUpSubjectCard
            }>
            <Text
              style={
                listStudentType?.[0]?.is_choosed
                  ? Styles.popUpSubjectCardTextChoosed
                  : Styles.popUpSubjectCardText
              }>
              Belum Dinilai
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              const updatedArray = listStudentType.map(
                (item: {id: any; name: string; is_choosed: boolean}) => {
                  if (item.id === 2) {
                    return {...item, is_choosed: !item?.is_choosed};
                  }
                  return item;
                },
              );
              setListStudentType(updatedArray);
            }}
            style={
              listStudentType?.[1]?.is_choosed
                ? Styles.popUpSubjectCardChoosed
                : Styles.popUpSubjectCard
            }>
            <Text
              style={
                listStudentType?.[1]?.is_choosed
                  ? Styles.popUpSubjectCardTextChoosed
                  : Styles.popUpSubjectCardText
              }>
              Sudah Dinilai
            </Text>
          </Pressable>
        </View>
        <View style={Styles.popUpSubmitButtonContainer}>
          <View style={Styles.popUpSubmitButton}>
            <Button
              action={() => {
                const updatedArray = listStudentType.map(
                  (item: {id: any; name: string; is_choosed: boolean}) => {
                    return {...item, is_choosed: false};
                  },
                );
                setListStudentType(updatedArray);
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
              action={() => {
                const _resChoosedEvaluation: string[] = [];
                listStudentType.map(
                  (item: {id: any; name: string; is_choosed: boolean}) => {
                    if (item.is_choosed) {
                      _resChoosedEvaluation.push(item?.name);
                    }
                  },
                );
                setChoosedEvaluationType(_resChoosedEvaluation);
                setIsOpenPopUpEvaluation(false);
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
        <SearchInput
          onChangeText={(text: string) => setSearchTxt(text)}
          query={searchTxt}
          onClear={() => setSearchTxt('')}
          onSubmit={() => Keyboard.dismiss()}
        />
        <View style={Styles.tabRiwayatInner2Container}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {/* button filter mapel */}
            <TouchableOpacity
              onPress={() => setIsOpenPopUpSubject(true)}
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
            {/* button filter penilaian */}
            <TouchableOpacity
              onPress={() => setIsOpenPopUpEvaluation(true)}
              style={
                choosedEvaluationType?.length === 1
                  ? Styles.tabMapelFilterButtonStyle3
                  : Styles.tabMapelFilterButtonStyle2
              }>
              <Text
                style={
                  choosedEvaluationType?.length === 1
                    ? Styles.tabMapelTitleStyle2
                    : Styles.tabMapelTitleStyle
                }>
                {choosedEvaluationType?.length === 1
                  ? isStringContains(choosedEvaluationType?.[0], 'scoring')
                    ? 'Sudah Dinilai'
                    : 'Belum Dinilai'
                  : 'Semua Penilaian'}
              </Text>
              <View
                style={
                  choosedEvaluationType?.length === 1
                    ? Styles.tabMapelIconStyle2
                    : Styles.tabMapelIconStyle
                }>
                {choosedEvaluationType?.length === 1 ? (
                  <ChevronIconWhite />
                ) : (
                  <ChevronIcon />
                )}
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <FlatList
          data={(listUjianData as []).removeDuplicate?.()}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, id): any => id}
          ListEmptyComponent={() => {
            if (isLoadingGetList) {
              return <ActivityIndicator />;
            }
            return (
              <TabEmptyComponent
                withFilter={
                  choosedEvaluationType?.length !== 0 ||
                  choosedListSubjectId?.length !== 0
                }
                actionFilter={() => {
                  setChoosedEvaluationType([]);
                  setChoosedListSubjectId([]);
                  resetSubjectFilter();
                }}
                title="Belum Ada Riwayat Ujian"
                subTitle="Ujian yang telah berakhir dan selesai dinilai
akan tampil di sini."
              />
            );
          }}
          contentContainerStyle={Styles.contentContainerStyle}
          onEndReached={__onEndReached}
          renderItem={({item, index}) => (
            <CardExamComponent
              key={index}
              filterType={'done_scoring'}
              cardData={item}
              currentFilter={choosedEvaluationType}
              handleOpenPopup={handleOpenPopUp}
              handleSetPopUpType={handleSetPopUpType}
              handleSetCardData={() => handleSetCardData(item)}
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
        // height={500}
        children={renderChildrenPopUpSubject()}
      />
      {/* modal untuk filter filter penilaian */}
      <SwipeUp
        isSwipeLine
        visible={isOpenPopUpEvaluation}
        onClose={() => setIsOpenPopUpEvaluation(false)}
        height={500}
        children={renderChildrenPopUpEvaluation()}
      />
    </View>
  );
};

export default TabRiwayatComponent;
