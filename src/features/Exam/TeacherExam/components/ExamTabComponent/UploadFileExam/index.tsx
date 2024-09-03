import React from 'react';
import {FlatList, Pressable, ScrollView, View} from 'react-native';
import styles from './styles';
import {QuestionTemplate} from '../../QuestionTemplate';
import {AttachQuestionFileCard} from '../../AttachQuestionFileCard';
import {UploadedQuestionFileCard} from '../../UploadedQuestionFileCard';
import {MainView, PoppinsText, SwipeUp} from '@components/atoms';
import {useDisclosure} from '@hooks/useDisclosure';
import {Divider} from 'react-native-paper';
import {pressableStyle} from '@constants/styles';
const mockErrorData = [
  'Penggunaan karakter salah di soal nomor 23',
  'Penggunaan karakter salah di soal nomor 30',
  'Format soal tidak sesuai di soal nomor 30',
];

const mockUploadedFile = [
  {
    id: 1,
    title: 'Pilihan Ganda.docx',
    errorData: [],
  },
  {
    id: 2,
    title: 'Ganda Campuran.docx',
    errorData: mockErrorData,
  },
  {
    id: 3,
    title: 'Campuran Ganda.docx',
  },
];

type SwipeupButtonProps = {title: string; onPress: VoidCallBack};

const SwipeupButton = ({onPress, title}: SwipeupButtonProps) => (
  <Pressable style={pressableStyle} onPress={onPress}>
    <PoppinsText style={styles.uploadedMoreSwipeupText}>{title}</PoppinsText>
  </Pressable>
);

const SeparatorItem = () => <MainView height={16} />;

type Props = {};

const UploadFileExam = ({}: Props) => {
  const {
    isVisible: isUploadedMoreSwipeup,
    show: showIsUploadedMoreSwipeup,
    hide: hideIsUploadedMoreSwipeup,
  } = useDisclosure();

  return (
    <ScrollView style={styles.container}>
      <AttachQuestionFileCard />
      <QuestionTemplate />
      <PoppinsText type="BoldPoppins" style={styles.uploadedQuestionText}>
        File yang terunggah
      </PoppinsText>
      <FlatList
        style={{marginBottom: 20}}
        data={mockUploadedFile}
        scrollEnabled={false}
        ItemSeparatorComponent={SeparatorItem}
        keyExtractor={({id}) => id.toString()}
        renderItem={({item}) => {
          return (
            <UploadedQuestionFileCard
              title={item.title}
              errorData={item.errorData}
              onPressMore={() => showIsUploadedMoreSwipeup(item)}
            />
          );
        }}
      />
      <SwipeUp
        visible={isUploadedMoreSwipeup}
        onClose={hideIsUploadedMoreSwipeup}>
        <View style={styles.uploadedMoreSwipeupContainer}>
          <SwipeupButton
            title="Unggah Ulang"
            onPress={() => {
              hideIsUploadedMoreSwipeup();
            }}
          />
          <Divider />
          <SwipeupButton
            title="Hapus"
            onPress={() => {
              hideIsUploadedMoreSwipeup();
            }}
          />
        </View>
      </SwipeUp>
    </ScrollView>
  );
};

export {UploadFileExam};
