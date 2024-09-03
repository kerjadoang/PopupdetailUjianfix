import Colors from '@constants/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useAddSoalToPaketSoalUjian, useGetBankSoal} from '@services/lms';
import {IListBankSoalResponseData} from '@services/lms/type';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {List, ListAccordionProps} from 'react-native-paper';
import PaketSoalListItem from './components/PaketSoalListItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header, MainText, MainView} from '@components/atoms';
import ChevronDown from '@assets/svg/blue_arrow_down.svg';
import ChevronUp from '@assets/svg/blueArrowUp.svg';
import SearchInput from '@components/atoms/SearchInput';
import useDebounce from '@hooks/useDebounce';
import {ParamList} from 'type/screen';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import SoalListItem from './components/SoalListItem';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

type BankSoalItemProps = {
  data: IListBankSoalResponseData;
  title?: string;
  subtitle?: string;
  subject_id?: string;
  packageId?: string;
  class_id?: any;
  chapter_id?: any;
  navigation?: StackNavigationProp<ParamList, 'BankSoalScreen'>;
  expanded?: ListAccordionProps['expanded'];
  fromCreateJadwal?: boolean;
  onSelectFromCreateJadwal?: (param: IBasePackage) => void;
};

const BankSoalItem: React.FC<BankSoalItemProps> = props => {
  return (
    <List.Accordion
      title={
        <MainView
          flexDirection="row"
          alignItems="center"
          gap={4}
          width={WINDOW_WIDTH - 70}>
          <Text
            style={{
              flex: 5,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              color: Colors.dark.neutral100,
            }}
            numberOfLines={2}>
            {props.data?.name || ''}
          </Text>
          <MainText
            flex={1}
            fontFamily="Poppins-SemiBold"
            fontSize={12}
            color={Colors.dark.neutral60}>
            {props.data?.packages?.length ?? 0} Paket
          </MainText>
        </MainView>
      }
      right={props => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          {props.isExpanded ? <ChevronUp /> : <ChevronDown />}
        </View>
      )}
      style={{backgroundColor: Colors.white}}
      expanded={props.expanded}>
      <View style={{padding: 16, gap: 12}}>
        {props.data.packages?.map((packageItem: IBasePackage) => {
          return (
            <PaketSoalListItem
              data={packageItem}
              isBankSoal
              fromCreateJadwal={props.fromCreateJadwal}
              key={packageItem.id}
              onPressSelect={() =>
                props.onSelectFromCreateJadwal?.(packageItem)
              }
              onPress={
                props.fromCreateJadwal
                  ? () => {}
                  : () => {
                      props.navigation?.navigate(
                        'SelectSoalToAddToPaketSoalScreen',
                        {
                          package_id: packageItem.id,
                          package_id_to_be_add: props.packageId,
                          title: props.title,
                          subtitle: props.subtitle,
                          subject_id: props.subject_id,
                          class_id: props.class_id,
                          chapter_id: props.chapter_id,
                          mode: 'add_soal',
                        },
                      );
                    }
              }
              onPressDetail={() => {
                props.navigation?.navigate('DetailSoalScreen', {
                  order: 1,
                  title: 'Detail Paket Soal',
                  subtitle: packageItem.name,
                  subject_id: packageItem.subject_id,
                  class_id: packageItem.class_id,
                  package_id: packageItem.id,
                  chapter_id: packageItem.chapter_id,
                });
              }}
              // onPressDetail={props.fromCreateJadwal ? }
            />
          );
        })}
      </View>
    </List.Accordion>
  );
};

const BankSoalScreen: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'BankSoalScreen'>>();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'BankSoalScreen'>>();
  const {
    subject_id,
    title,
    subtitle,
    package_id,
    class_id,
    chapter_id,
    fromCreateJadwal,
    onSelectFromCreateJadwal,
  } = route.params;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const query = useDebounce(searchQuery, 300);

  const {data, refetch} = useGetBankSoal(subject_id);
  const {mutate: addSoalToPaketSoal} = useAddSoalToPaketSoalUjian();

  const onAddSoalToPaketSoal = async (item: IListBankSoalResponseData) => {
    try {
      const payloadData = [
        {
          question_id: item.question?.id,
          orders: item.question?.order,
        },
      ];
      await addSoalToPaketSoal(package_id, {
        questions: payloadData,
      });
      navigation.navigate('DetailPaketSoalListScreen', {
        subject_id,
        package_id: package_id,
        title,
        chapter_id,
        subtitle,
        mode: 'detail',
        class_id,
      });
      Toast.show({type: 'success', text1: 'Soal berhasil disimpan.'});
    } catch (e) {}
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={title} subLabel={subtitle} />,
    });
  }, []);

  const renderItem = ({item}: {item: IListBankSoalResponseData}) => {
    if (item.question?.id && !fromCreateJadwal) {
      return (
        <View style={{marginHorizontal: 16}}>
          <Text
            style={{
              flex: 5,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              color: Colors.dark.neutral100,
            }}>
            {item.question.chapter?.name}
          </Text>

          <View style={{marginVertical: 12}}>
            <SoalListItem
              data={item.question}
              index={0}
              selected={false}
              isSearchQuestionId
              onSelectQuestion={() => onAddSoalToPaketSoal(item)}
              // onSeeDetails={() => {
              //   navigation.push('DetailSoalScreen', {
              //     order: item.question?.order ?? 0,
              //     title,
              //     subject_id,
              //     class_id,
              //     package_id,
              //     chapter_id,
              //   });
              // }}
            />
          </View>
        </View>
      );
    }
    return (
      <BankSoalItem
        data={item}
        title={title}
        subtitle={subtitle}
        packageId={package_id}
        navigation={navigation}
        class_id={class_id}
        chapter_id={chapter_id}
        subject_id={subject_id}
        fromCreateJadwal={fromCreateJadwal}
        onSelectFromCreateJadwal={onSelectFromCreateJadwal}
      />
    );
  };

  useEffect(() => {
    refetch({name: query});
  }, [query]);

  const onQueryChange = (e: string) => {
    setSearchQuery(e);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        query={searchQuery}
        placeholder={
          fromCreateJadwal ? 'Cari paket soal' : 'Cari paket soal, ID soal'
        }
        onChangeText={onQueryChange}
        onClear={() => setSearchQuery('')}
      />
      <FlatList
        data={data?.data}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    gap: 16,
  },
});

export default BankSoalScreen;
