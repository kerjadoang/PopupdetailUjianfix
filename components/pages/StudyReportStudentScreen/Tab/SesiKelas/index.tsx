import React from 'react';
import {View} from 'react-native';
import Card from '../../component/Card';
import ResultStar from '../../component/ResultStar';
import {SwipeUp} from '@components/atoms';
import SwipeChildren from '../../component/SwipeChildren';
import {NotAttendReport} from '../../component/NotAttendReport';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {useSesiKelas} from './useSesiKelas';

interface Iprops {
  subject: any;
  student?: any;
}
const SesiKelas = (props: Iprops) => {
  const {
    rating,
    detailAttendance,
    setShow,
    setType,
    show,
    type,
    attendance,
    absent,
    isLoading,
  }: any = useSesiKelas(props?.subject, props?.student);

  return (
    <View>
      <View>
        <Card
          action={() => {
            setShow(true);
            setType(1);
          }}
          data_attendance={attendance}
          data_absent={attendance?.absent_count}
          action_not_present={() => {
            setShow(true);
            setType(2);
          }}
        />
        <ResultStar rating={rating?.rating?.toFixed(1)} />
      </View>
      <SwipeUp
        height={200}
        visible={show}
        onClose={() => setShow(false)}
        children={
          type === 1 ? (
            <SwipeChildren type={type} data_attendance={detailAttendance} />
          ) : (
            <NotAttendReport presensiAbsent={absent} />
          )
        }
      />
      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};
export {SesiKelas};
