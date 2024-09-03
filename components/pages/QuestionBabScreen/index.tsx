import React, {useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import {styles} from './style';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import IconArrowBottom from '@assets/svg/ic_arrow_bottom_blue.svg';
import {bgBlueOrnament} from '@assets/images';
import {SvgUri} from 'react-native-svg';
import IconCheck from '@assets/svg/ic_play_btn_blue.svg';
import {ProgressCircle} from '@components/atoms';
import RightIcon2 from '@assets/svg/ic24_chevron_up_grey.svg';
import RightIcon from '@assets/svg/ic_arrow_right_blue.svg';
import Lock from '@assets/svg/ic24_lock.svg';
import useFormQuestion from './useFormQuestion';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const QuestionBabScreen = ({route}: any) => {
  const {chapterData} = route.params || false;
  const {getSoalVideo} = useFormQuestion(chapterData);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
  };
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'QuestionBabScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          iconLeft={<IconArrowLeftWhite />}
          backgroundColor={Colors.primary.base}
        />
      ),
    });
  }, [navigation]);
  const window = Dimensions.get('window');
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerWrapperSecond}>
        <View>
          {chapterData?.icon_path_url ? (
            <View style={styles.iconContainer}>
              <SvgUri uri={chapterData?.icon_path_url} width={40} height={40} />
            </View>
          ) : (
            <View />
          )}
        </View>
        <View style={{paddingLeft: 12}}>
          <Text style={styles.headerWrapperSecondSubTitle}>
            {'Video Animasi'}
          </Text>
          <View
            style={{
              width: window.width * 0.6,
              flexWrap: 'wrap',
            }}>
            <Text style={styles.headerWrapperSecondTitle}>
              {chapterData?.name}
            </Text>
          </View>
        </View>
      </View>
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
      <View style={styles.cardContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.container}>
            <View style={styles.bottomContainer}>
              {getSoalVideo?.map((item: any, key: any) => (
                <Pressable
                  disabled={!item?.unlocked}
                  onPress={() => handleSelectItem(item?.id)}
                  key={key}
                  style={[
                    styles.button,
                    styles.shadowProp,
                    {
                      backgroundColor: item?.unlocked
                        ? Colors.white
                        : '#E7EBEE',
                    },
                  ]}>
                  <View style={styles.buttonContainer}>
                    <View>
                      <Text
                        style={[
                          styles.title,
                          {
                            color: item?.unlocked ? Colors.black : '#868E96',
                            width: 290,
                          },
                        ]}>
                        {item?.name}
                      </Text>
                      <Text
                        style={[
                          styles.subTitle,
                          {
                            color: item?.unlocked
                              ? Colors.dark.neutral50
                              : '#868E96',
                          },
                        ]}>
                        {item?.content?.length} Video
                      </Text>
                    </View>
                    {item?.unlocked ? (
                      <View>
                        {selectedItem === item?.id ? (
                          <RightIcon2 width={25} height={25} />
                        ) : (
                          <IconArrowBottom width={25} height={25} />
                        )}
                      </View>
                    ) : (
                      <Lock width={25} height={25} />
                    )}
                  </View>
                  {selectedItem === item?.id ? (
                    <View style={{borderWidth: 1, borderColor: '#E7EBEE'}} />
                  ) : null}
                  {selectedItem === item?.id ? (
                    <View>
                      {item?.content?.map((content: any, key: any) => (
                        <Pressable
                          key={key}
                          style={styles.buttonContainer}
                          onPress={() =>
                            navigation.navigate('VideoAnimationScreen', {
                              chapterData: item?.content[key],
                              allChapterData: item,
                              type: 'soal',
                              subject: chapterData,
                            })
                          }>
                          <View style={styles.subContainer}>
                            <ProgressCircle
                              progress={50}
                              size={64}
                              strokeWidth={6}
                              color={Colors.primary.base}
                              children={<IconCheck width={52} height={52} />}
                            />
                            <View style={{marginLeft: 20}}>
                              <Text style={styles.subTitle}>
                                Video Animasi | {content?.duration_formatted}
                              </Text>
                              <Text
                                numberOfLines={2}
                                style={[
                                  styles.title,
                                  {
                                    flex: 1,
                                    marginRight: 16,
                                  },
                                ]}>
                                {content?.title}
                              </Text>
                            </View>
                          </View>
                          <RightIcon width={25} height={25} />
                        </Pressable>
                      ))}
                    </View>
                  ) : null}
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export {QuestionBabScreen};
