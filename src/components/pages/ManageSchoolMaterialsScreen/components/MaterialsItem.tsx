import {Pressable, Text, View} from 'react-native';
import React from 'react';
import IconClass from '@assets/svg/iconKelas.svg';
import IconMore from '@assets/svg/ic24_more_gray.svg';
import {SubjectCard} from '@components/pages/ListSubjectSchoolMaterialsScreen/components/SubjectCard';
import {styles} from '../style';
interface IProps {
  index: number;
  data?: any;
  dataLength: number;
  onPressClass?: any;
  onPressSubject?: any;
  subjectSelected?: any;
  setSubjectSelected?: any;
}
const MaterialsItem = (props: IProps) => {
  return (
    <View
      style={[
        styles.materialsContainer,
        {
          marginBottom: props?.index + 1 === props?.dataLength ? 150 : 0,
        },
      ]}>
      <View style={styles.classContaner}>
        <View style={{flexDirection: 'row'}}>
          <IconClass width={32} height={32} />
          <Text style={styles.subjectTitle}>
            {props?.data?.class?.name ?? ''}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            props?.onPressClass();
            props?.setSubjectSelected(props?.data);
          }}>
          <IconMore width={24} height={24} />
        </Pressable>
      </View>
      {props?.data?.subject?.map((i: any, index: number) => (
        <SubjectCard
          key={index}
          data={i}
          index={index}
          leftIconSize={24}
          stylesTitle={{
            fontSize: 14,
            lineHeight: 18,
          }}
          onPressSubject={props?.onPressSubject}
          setSubjectSelected={props?.setSubjectSelected}
          isNavigate
        />
      ))}
      {props?.index + 1 < props?.dataLength ? (
        <View style={styles.rectangle} />
      ) : null}
    </View>
  );
};

export default MaterialsItem;
