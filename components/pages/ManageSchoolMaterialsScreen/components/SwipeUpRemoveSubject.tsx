import {ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SubjectCardCheckbox} from './SubjectCardCheckbox';
import {Button} from '@components/atoms';
import {styles} from '../style';
import IconClass from '@assets/svg/iconKelas.svg';
interface Iprops {
  data?: any;
  classSelected: any;
  setIsShowRemoveSubject: any;
  subjectSelected: any;
  setSubjectSelected: any;
  onPressSaved: any;
}
const SwipeUpRemoveSubject = (props: Iprops) => {
  const [subjectSelectedTemporary, setSubjectSelectedTemporary] = useState([]);
  return (
    <View
      style={[
        styles.swipeUpContainer,
        {flexDirection: 'column', marginTop: 16},
      ]}>
      <Text style={[styles.textSwipeUpActionLabel]}>
        Pilih Mata Pelajaran Untuk Dihapus
      </Text>

      {props?.data
        ?.filter((x: any) => x?.class === props?.classSelected)
        ?.map((i: any, index: number) => (
          <View key={index}>
            <View style={{flexDirection: 'row', marginBottom: 16}}>
              <IconClass width={32} height={32} />
              <Text style={[styles.textSwipeUpActionLabel, styles.classText]}>
                {i?.class?.name}
              </Text>
            </View>
            <View
              style={{
                height: i?.subject?.length >= 7 ? 400 : null,
                marginBottom: 16,
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {i?.subject?.map((o: any, index: number) => (
                  <SubjectCardCheckbox
                    data={o}
                    index={index}
                    key={index}
                    subjectSelected={subjectSelectedTemporary}
                    setSubjectSelected={setSubjectSelectedTemporary}
                    lengthData={i?.subject?.length}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={styles.bottomSwipeUpContainer}>
              <Button
                label={'Batal'}
                style={[styles.buttonSwipeUp, {marginRight: 6}]}
                fontSize={16}
                outline
                borderWidth={1}
                action={() => {
                  props?.setIsShowRemoveSubject(false);
                }}
              />
              <Button
                label={'Lanjut'}
                style={[styles.buttonSwipeUp]}
                fontSize={16}
                isDisabled={subjectSelectedTemporary?.length === 0}
                action={() => {
                  props.setSubjectSelected(subjectSelectedTemporary);
                  props?.onPressSaved(subjectSelectedTemporary);
                }}
              />
            </View>
          </View>
        ))}
    </View>
  );
};

export default SwipeUpRemoveSubject;
