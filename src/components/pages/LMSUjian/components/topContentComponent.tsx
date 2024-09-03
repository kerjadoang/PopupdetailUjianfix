import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Styles} from '../style';
import TopEmptyComponent from './topEmptyComponent';
import CardExamComponent from './cardExamComponent';

const TopContentComponent = ({
  handleSetPopUpType,
  handleOpenPopUp,
  handleSetCardData,
  examData = [],
}: any) => {
  // const [examData, setExamData] = useState<any>([]);
  // const isFocus = useIsFocused();

  // const handleGetListExam = async () => {
  //   try {
  //     const _resFetchData: any = await ProviderLMS?.getLMSListUjian({
  //       limit: 10,
  //       page: 1,
  //       search: '',
  //       status: ['on_progress'],
  //       status_student: [],
  //       subject_id: [],
  //     });
  //     const ResData = _resFetchData?.data || false;
  //     setExamData(ResData?.data);
  //   } catch (error: any) {
  //     Toast?.show({
  //       type: 'error',
  //       text1:
  //         error?.response?.data?.message ||
  //         'Terjadi kesalahan pada sistem kami',
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (!isFocus) return;
  //   handleGetListExam();
  // }, [isFocus]);

  return (
    <View style={Styles.topContentContainer}>
      <View style={Styles.topContentTitleContainer}>
        <Text style={Styles.topContentTitle}>Ujian Berlangsung</Text>
      </View>
      {examData?.length <= 0 ? (
        <TopEmptyComponent />
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {examData?.map((_examData: any, index: number) => {
            return (
              <CardExamComponent
                key={`topContentComponent${index}`}
                handleOpenPopup={handleOpenPopUp}
                filterType="on_progress"
                cardData={_examData}
                handleSetPopUpType={handleSetPopUpType}
                handleSetCardData={handleSetCardData}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default TopContentComponent;
