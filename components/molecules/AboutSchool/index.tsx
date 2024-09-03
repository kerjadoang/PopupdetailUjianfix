import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import RenderImage from '@components/atoms/RenderImage';

type AboutSchoolProps = {
  action: CallBack<void>;
  schoolImage: string;
};

const AboutSchool: FC<AboutSchoolProps> = ({action}) => {
  const {getUser}: any = useSelector((state: RootState) => state);
  const {name, path_url} = getUser?.data?.school || false;

  return (
    <View style={styles.flexDirection}>
      <RenderImage
        imageUrl={path_url}
        style={styles.imageProfile}
        height={styles.imageProfile.height}
        width={styles.imageProfile.width}
      />
      <View style={styles.flexCol}>
        <View>
          <Text style={styles.school}>{name || '-'}</Text>
        </View>
        <Pressable style={styles.aboutContent} onPress={action}>
          <Text style={styles.about}>Tentang Sekolah </Text>
          <Icon name="chevron-right" size={14} color={Colors.primary.base} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    gap: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  flexCol: {
    flexDirection: 'column',
    gap: 4,
  },
  imageProfile: {
    width: 48,
    height: 48,
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: Colors.white,
    borderColor: Colors.primary.light3,
  },
  school: {
    fontFamily: 'Poppins-SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    width: '80%',
    fontSize: 16,
    color: Colors.dark.neutral100,
  },
  about: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    color: Colors.primary.base,
  },
  aboutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

export {AboutSchool};
