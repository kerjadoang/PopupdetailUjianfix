import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {convertDate, isStringContains} from '@constants/functional';
import Colors from '@constants/colors';

type Props = {
  item: IUjianHistory;
  onButtonPress: CallBack<void>;
  isDoneScoring: CallBackWithParams<boolean | undefined, IUjianHistory>;
  isFromTeacher?: boolean;
};

const StudentUjianHistoryCard: FC<Props> = ({
  item,
  onButtonPress,
  isDoneScoring,
  isFromTeacher,
}) => {
  const isNotAttended = isStringContains(
    item.student_exam?.[0]?.status || '',
    undefined,
    ['ditugaskan', 'mengerjakan'],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.shadowProp, styles.card]}>
        <View
          style={[styles.chipsContainer, {borderRadius: 25, marginBottom: 8}]}>
          <Text
            style={[
              styles.chipsFont,
              {paddingVertical: 4, paddingHorizontal: 8},
            ]}>
            {item?.service?.name}
          </Text>
        </View>

        <View style={[styles.rowBetween]}>
          <View style={{flex: 3}}>
            <Text style={styles.subjectCard}>{item?.subject?.name}</Text>
            <Text style={styles.titleCard}>{item?.title}</Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              disabled={isNotAttended && isFromTeacher}
              style={[
                styles.buttonContainer,
                {
                  borderColor:
                    !isNotAttended || !isFromTeacher
                      ? Colors.primary.base
                      : Colors.dark.neutral60,
                },
              ]}
              onPress={onButtonPress}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      !isNotAttended || !isFromTeacher
                        ? Colors.primary.base
                        : Colors.dark.neutral80,
                  },
                ]}>
                {!isFromTeacher || isDoneScoring(item) ? 'Detail' : 'Periksa'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 8,
          }}>
          <View>
            <Text style={styles.dikumpulkan}>Dikumpulkan</Text>
            <Text style={styles.dateStyle}>
              {`${convertDate(
                item?.student_exam?.[0].exam_history?.created_at ||
                  item?.end_time,
              ).format('ddd, D MMM YYYY • HH:mm')}`}
            </Text>
          </View>
          <View style={{width: '28%'}}>
            <Text style={styles.nilaiStyle}>Nilai</Text>
            {isDoneScoring(item) ? (
              <Text style={styles.sudahdinilai}>
                {item?.student_exam?.[0].exam_history?.point || 0}
              </Text>
            ) : (
              <Text style={styles.belumdinilai}>Belum dinilai</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default StudentUjianHistoryCard;
