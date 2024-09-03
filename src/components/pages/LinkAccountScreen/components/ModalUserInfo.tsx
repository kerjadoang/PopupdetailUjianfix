import {Button, PopUp, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import {hostEndsWith} from '@constants/functional';
import React from 'react';
import {View, Text, StyleSheet, Image, ButtonProps} from 'react-native';
import RobotSuccess from '@assets/svg/robot_success.svg';

type ModalUserInfoProps = {
  data?: IBaseUser;
  onConfirm?: ButtonProps['onPress'];
  desc?: string;
  role?: 'orangtua' | 'anak';
  show?: boolean;
  setShow: (bool: boolean) => void;
  navigation?: any;
} & SwipeUpProps;

const ModalUserInfo: React.FC<ModalUserInfoProps> = props => {
  const school_name = props.data?.school_id
    ? props.data?.school?.name
    : props.data?.school_name;
  const rombel_class_school = props.data?.school_id
    ? props.data?.rombel_class_school_user?.[0]?.rombel_class_school?.name
    : props.data?.class?.name;
  const roleLabel =
    props.role === 'anak'
      ? 'Orang Tua'
      : `${rombel_class_school} ${school_name ? '\u2022' + school_name : ''}`;
  return (
    <SwipeUp
      onClose={props.onClose}
      visible={props.visible}
      height={props.height}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            // source={{uri: props.data?.path_url}}
            source={hostEndsWith(props.data?.path_url ?? '')}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title}>{props.data?.full_name}</Text>
        <Text style={styles.subtitle}>{roleLabel}</Text>
        <View style={styles.separator} />
        <Text style={styles.description}>{props.desc}</Text>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            outline
            label="Batal"
            action={props.onClose}
          />
          <Button
            style={styles.button}
            label="Konfirmasi"
            action={props.onConfirm}
          />
        </View>
      </View>
      <PopUp
        show={props?.show}
        Icon={RobotSuccess}
        titleConfirm="OK"
        close={() => {
          if (props?.setShow) {
            props.setShow(false);
            if (props?.onClose) {
              props?.onClose();
            }
          }
        }}
        actionConfirm={() => props?.navigation.goBack()}
        title="Permintaan Berhasil Dikirim"
        desc={`Notifikasi telah dikirim ke ${props?.data?.full_name} untuk melakukan verifikasi.`}
      />
    </SwipeUp>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    overflow: 'hidden',
  },
  avatar: {
    width: 80,
    height: 80,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 16,
    color: Colors.dark.neutral100,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral80,
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 16,
    backgroundColor: Colors.dark.neutral20,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {flex: 1},
});

export default ModalUserInfo;
