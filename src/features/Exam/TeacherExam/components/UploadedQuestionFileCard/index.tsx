import React from 'react';
import {FlatList, Pressable, View} from 'react-native';
import styles from './styles';
import {UploadFileWrapperCard} from '../UploadFileWrapperCard';
import {MainView, PoppinsText} from '@components/atoms';
import IcFileX from '@assets/svg/ic_file_x.svg';
import IcMoreBlue from '@assets/svg/ic24_more_blue.svg';
import {pressableStyle} from '@constants/styles';

const SeparatorItem = () => <MainView height={8} />;

const HeaderItem = () => (
  <PoppinsText type="SemiBoldPoppins" style={styles.errorTitle}>
    Preview soal gagal, terdapat kesalahan:
  </PoppinsText>
);

type Props = {
  onPressMore?: VoidCallBack;
  errorData?: string[];
  title?: string;
};

const UploadedQuestionFileCard = ({
  onPressMore,
  errorData = [],
  title,
}: Props) => {
  return (
    <UploadFileWrapperCard style={styles.container}>
      <View style={styles.titleContainer}>
        <IcFileX width={20} height={20} />
        <PoppinsText type="SemiBoldPoppins" style={styles.title}>
          {title}
        </PoppinsText>
        <MainView flex={1} />
        <Pressable style={pressableStyle} onPress={onPressMore}>
          <IcMoreBlue transform={[{rotate: '90deg'}]} />
        </Pressable>
      </View>

      {errorData.length !== 0 && (
        <FlatList
          scrollEnabled={false}
          data={errorData}
          style={styles.errorContentContainer}
          ListHeaderComponent={HeaderItem}
          ItemSeparatorComponent={SeparatorItem}
          keyExtractor={item => item}
          renderItem={({item}) => {
            return (
              <View style={styles.errorItemContainer}>
                <View style={styles.dot} />
                <PoppinsText type="RegularPoppins" style={styles.errorTextItem}>
                  {item}
                </PoppinsText>
              </View>
            );
          }}
        />
      )}
    </UploadFileWrapperCard>
  );
};

export {UploadedQuestionFileCard};
