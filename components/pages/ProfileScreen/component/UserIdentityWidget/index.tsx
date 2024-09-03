import React from 'react';
import {Text, Pressable, View} from 'react-native';
import IconEdit from '@assets/svg/ic_edit.svg';
import useUserIdentityWidget from './useUserIdentityWidget';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import Avatar from '@components/atoms/Avatar';

const UserIdentityWidget = (props: any) => {
  const navigation: any = useNavigation();
  const {imageUser, getUser}: any = useUserIdentityWidget();
  const {full_name, school, school_name, avatar}: IBaseUser =
    getUser?.data || '-';
  const schoolName = school?.name || school_name;

  const _renderContentStudent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.imageOutterContainer}>
          <View style={styles.imageInnerContainer}>
            <Avatar id={imageUser || avatar} style={styles.imageUser} />
          </View>
        </View>

        <View style={styles.badgeNameContainer}>
          <Text style={styles.badgeName}>{full_name || '-'}</Text>
          <Pressable
            style={styles.iconEditContainer}
            onPress={() => {
              navigation.navigate('ProfileEditScreen', {});
            }}>
            <IconEdit width={16} height={16} />
          </Pressable>
        </View>

        <View style={styles.badgeClassContainer}>
          <Text style={styles.badgeClassText}>{`${
            getUser?.data?.class?.name || '-'
          } • ${schoolName || '-'}`}</Text>
        </View>
      </View>
    );
  };

  const _renderContentParent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.imageOutterParentContainer}>
          <View style={styles.imageInnerContainer}>
            <Avatar id={imageUser || avatar} style={styles.imageUser} />
          </View>
        </View>

        <View style={styles.badgeNameContainer}>
          <Text style={styles.badgeName}>{full_name || '-'}</Text>
          <Pressable
            style={styles.iconEditContainer}
            onPress={() => {
              navigation.navigate('ProfileEditScreen', {});
            }}>
            <IconEdit width={16} height={16} />
          </Pressable>
        </View>

        <View style={styles.badgeClassParentContainer}>
          <Text style={styles.badgeClassParentText}>{'Orang Tua'}</Text>
        </View>
      </View>
    );
  };

  const _renderContentHeadMaster = () => {
    return (
      <View style={styles.container}>
        <View style={styles.imageOutterHeadMasterContainer}>
          <View style={styles.imageInnerContainer}>
            <Avatar id={imageUser || avatar} style={styles.imageUser} />
          </View>
        </View>

        <View style={styles.badgeNameContainer}>
          <Text style={styles.badgeName}>{full_name || '-'}</Text>
          <Pressable
            style={styles.iconEditContainer}
            onPress={() => {
              navigation.navigate('ProfileEditScreen', {});
            }}>
            <IconEdit width={16} height={16} />
          </Pressable>
        </View>

        <View style={styles.badgeClassContainer}>
          <Text style={styles.badgeClassText}>{`Kepala Sekolah • ${
            schoolName || '-'
          }`}</Text>
        </View>
      </View>
    );
  };

  const _renderContentTeacher = () => {
    return (
      <View style={styles.container}>
        <View style={styles.imageOutterHeadMasterContainer}>
          <View style={styles.imageInnerContainer}>
            <Avatar id={imageUser || avatar} style={styles.imageUser} />
          </View>
        </View>

        <View style={styles.badgeNameContainer}>
          <Text style={styles.badgeName}>{full_name || '-'}</Text>
          <Pressable
            style={styles.iconEditContainer}
            onPress={() => {
              navigation.navigate('ProfileEditScreen', {});
            }}>
            <IconEdit width={16} height={16} />
          </Pressable>
        </View>

        <View style={styles.badgeClassContainer}>
          <Text style={styles.badgeClassText}>{`Guru • ${
            schoolName || '-'
          }`}</Text>
        </View>
      </View>
    );
  };

  const _renderContentAdmin = () => {
    return (
      <View style={styles.container}>
        <View style={styles.imageOutterAdminContainer}>
          <View style={styles.imageInnerContainer}>
            <Avatar id={imageUser || avatar} style={styles.imageUser} />
          </View>
        </View>

        <View style={styles.badgeNameContainer}>
          <Text style={styles.badgeName}>{full_name || '-'}</Text>
          <Pressable
            style={styles.iconEditContainer}
            onPress={() => {
              navigation.navigate('ProfileEditScreen', {});
            }}>
            <IconEdit width={16} height={16} />
          </Pressable>
        </View>

        <View style={styles.badgeClassAdminContainer}>
          <Text style={styles.badgeClassAdminText}>{`Admin • ${
            schoolName || '-'
          }`}</Text>
        </View>
      </View>
    );
  };

  /*
  USER_TYPE_ID
  1. Murid >> B2C B2B
  2. Orang Tua >> Ngikut anak
  3. Mentor
  4. Kepsek >> B2B B2G
  5. Guru >> B2B
  6. Admin >> B2B
 */

  const isUserTypeParent = props?.userTypeId == 2;
  const isUserTypeHeadMaster = props?.userTypeId == 4;
  const isUserTypeTeacher = props?.userTypeId == 5;
  const isUserTypeAdmin = props?.userTypeId == 6;
  return (
    <>
      {isUserTypeParent
        ? _renderContentParent()
        : isUserTypeHeadMaster
        ? _renderContentHeadMaster()
        : isUserTypeTeacher
        ? _renderContentTeacher()
        : isUserTypeAdmin
        ? _renderContentAdmin()
        : _renderContentStudent()}
    </>
  );
};

export {UserIdentityWidget};
