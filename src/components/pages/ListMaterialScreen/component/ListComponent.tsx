import {View, Text, Pressable, FlatList} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Right from '@assets/svg/ic_arrow_right_blue.svg';
import Icon1 from '@assets/svg/roundPorgressBook.svg';
import Icon2 from '@assets/svg/ic_play_btn_blue.svg';
import Icon3 from '@assets/svg/roundProgressBookPurple.svg';
import Ic_empty_pr from '@assets/svg/ic_empty_PR.svg';
import {Button} from '@components/atoms';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
type Props = {
  action?: any;
  data?: any;
  subject?: any;
  classes?: any;
  chapterName?: string;
};
const ListComponent = ({data, subject, classes, chapterName}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ListMaterialScreen'>>();

  const handleItemPress = item => {
    switch (item?.learning_method?.type) {
      case 'video':
        navigation.navigate('VideoAnimationScreen', {
          chapterData: {...item, chapterName: chapterName},
          isFromGuru: true,
        });
        break;
      case 'presentation':
        navigation.navigate('VideoPresentationScreen', {
          contentData: {...item, chapterName: chapterName},
          isFromGuru: true,
        });
        break;
      default:
        navigation.navigate('EbookScreen', {
          chapterData: {...item, chapterName: chapterName},
          isFromGuru: true,
        });
        break;
    }
  };
  const renderItem = ({item}: any) => {
    return (
      <Pressable
        style={[styles.card, styles.shadowProp]}
        key={item?.id}
        onPress={() => handleItemPress(item)}>
        <View style={styles.itemContent}>
          {item?.learning_method?.type === 'presentation' ? (
            <Icon1 width={64} height={64} />
          ) : item?.learning_method?.type === 'ebook' ? (
            <Icon3 width={64} height={64} />
          ) : (
            <Icon2 width={64} height={64} />
          )}
          <View style={styles.containerTitle}>
            <Text style={styles.subTitle}>{item?.learning_method?.name}</Text>
            <Text style={styles.titleBlack}>{item?.title}</Text>
          </View>
        </View>
        <Right width={24} />
      </Pressable>
    );
  };

  const renderEmpty = ({}: any) => {
    return (
      <View style={styles.emptyDataContainer}>
        <Ic_empty_pr width={100} height={100} />
        <Text style={[styles.notFoundTitle, styles.pt12]}>
          Belum Ada Materi Sekolah
        </Text>
        <Text style={[styles.notFoundTitle, styles.pb12]}>Ditambahkan</Text>
        <Button
          label={'+ Tambah Materi Sekolah'}
          style={styles.buttonNotFound}
          action={() =>
            navigation.navigate('AddSchoolMaterialsScreen', {
              materialsParams: {
                subject: subject,
                classes: classes,
                curriculum: subject?.curriculum,
              },
            })
          }
        />
      </View>
    );
  };
  return (
    <FlatList
      renderItem={renderItem}
      data={data}
      ListEmptyComponent={renderEmpty}
      keyExtractor={item => item?.id}
    />
  );
};

export default ListComponent;
