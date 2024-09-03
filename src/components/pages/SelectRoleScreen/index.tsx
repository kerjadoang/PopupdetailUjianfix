import {translateId} from '@assets/language/id';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {styles} from './style';
import useSelectRole from './useSelectRole';

const SelectRoleScreen = ({}) => {
  const route = useRoute();
  const {listRole} = useSelectRole();
  const {username}: any = route?.params || false;
  const navigation: any = useNavigation();

  const _renderScreen = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Header />

        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>
            {translateId.RegisterScreen.HeaderTitle}
          </Text>

          {listRole?.data?.slice(0, 2)?.map((value: any, index: any) => {
            const {id, path_url, name, description} = value || false;
            const isTypeStudent = id === 1;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('PersonalDataScreen', {
                    userName: username,
                    userTypeId: id,
                  });
                }}
                style={{
                  ...styles.cardContainer,
                  borderColor: isTypeStudent
                    ? Colors.secondary.base
                    : Colors.success.base,
                }}>
                {!path_url ? null : path_url?.endsWith('.svg') ? (
                  <View style={styles.cardImageSvgContainer}>
                    <SvgUri
                      uri={path_url}
                      width={88}
                      height={88}
                      style={styles.cardImageSvg}
                    />
                  </View>
                ) : (
                  <Image
                    style={styles.cardImagePng}
                    source={{
                      uri: path_url,
                    }}
                  />
                )}

                <View style={styles.cardTextContainer}>
                  <Text
                    style={{
                      ...styles.cardTitle,
                      color: isTypeStudent
                        ? Colors.primary.base
                        : Colors.success.base,
                    }}>
                    {name}
                  </Text>

                  <Text
                    style={{
                      ...styles.cardDescription,
                      color: isTypeStudent
                        ? Colors.primary.base
                        : Colors.success.base,
                    }}>
                    {description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  return _renderScreen();
};

export {SelectRoleScreen};
