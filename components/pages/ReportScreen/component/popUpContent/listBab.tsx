/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';

type _IListBab = {
  chapterData: any;
  setChapterChoosed: any;
  handleShowPopUp: any;
  chapterChoosed: any;
};

const AllChapterData = {
  chapter: {
    id: 0,
    name: 'Semua Bab',
    subject_id: 0,
  },
};

const ListBab = ({
  chapterData,
  setChapterChoosed,
  handleShowPopUp,
  chapterChoosed,
}: _IListBab) => {
  const [chapterArr, setChapterArr] = useState<any[]>([]);
  useEffect(() => {
    const resArr = [AllChapterData];
    chapterData?.length > 0 && resArr.push(...chapterData);
    setChapterArr(resArr);
  }, []);
  return (
    <View>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            lineHeight: 28,
            color: Colors.dark.neutral100,
            marginBottom: '3%',
          }}>
          Pilih Bab
        </Text>
        {chapterArr?.map((ie: any) => {
          return (
            <Pressable
              key={`chapterData${ie?.chapter?.id}`}
              onPress={() => {
                setChapterChoosed(ie?.chapter?.id), handleShowPopUp(false);
              }}
              style={{
                width: '100%',
                flexDirection: 'row',
                paddingVertical: '3%',
                alignItems: 'center',
              }}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                {chapterChoosed === ie?.chapter?.id ? (
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 16,
                      lineHeight: 24,
                      color: Colors.primary.base,
                    }}>
                    {ie?.chapter?.name}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 16,
                      lineHeight: 24,
                      color: Colors.dark.neutral100,
                    }}>
                    {ie?.chapter?.name}
                  </Text>
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                {chapterChoosed === ie?.chapter?.id ? (
                  <View
                    style={{
                      borderRadius: 50,
                      width: 20,
                      height: 20,
                      backgroundColor: 'white',
                      borderWidth: 6,
                      borderColor: Colors.primary.base,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      borderRadius: 50,
                      width: 20,
                      height: 20,
                      backgroundColor: 'white',
                      borderWidth: 1.5,
                      borderColor: Colors.dark.neutral50,
                    }}
                  />
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default ListBab;
