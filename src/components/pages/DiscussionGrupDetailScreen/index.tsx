import React, {useLayoutEffect} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/atoms/Header';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import useDiscussionGrupDetailScreen from './useDiscussionGrupDetailScreen';
import RenderImage from '@components/atoms/RenderImage';
import {PlaceholderAvatar} from '@assets/images';

const DiscussionGrupDetailScreen = () => {
  const navigation: any = useNavigation();
  const {isLoading, detailUserData} = useDiscussionGrupDetailScreen();
  const {name, registration_number, email, phone_number, activity, path_url} =
    detailUserData || '-';

  const detailData = [
    {
      title: 'Nama',
      description: name,
    },
    {
      title: 'Nomor Induk Karyawan (NIK)',
      description: registration_number,
    },
    {
      title: 'Email',
      description: email,
    },
    {
      title: 'No. HP',
      description: phone_number,
    },
    {
      title: 'Kelas',
      description: activity,
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Detail Anggota'} />,
    });
  }, []);

  const _renderContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <RenderImage
            imageUrl={path_url}
            style={styles.cardAvatar}
            placeholder={
              <Image source={PlaceholderAvatar} style={styles.cardAvatar} />
            }
          />

          {detailData?.map((value: any, index: number) => {
            const {title, description} = value;

            return (
              <View key={index}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>

                {index != detailData?.length - 1 ? (
                  <View style={styles.gap} />
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <ScrollView
          bounces={false}
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          {_renderContent()}
        </ScrollView>
      </View>

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

export default DiscussionGrupDetailScreen;
