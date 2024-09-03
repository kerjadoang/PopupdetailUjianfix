import React from 'react';
import {View} from 'react-native';
import Card from '../component/Card';
import ResultStar from '../component/ResultStar';
import {SwipeUp} from '@components/atoms';
import SwipeChildren from '../component/SwipeChildren';
import useSesiKelas from './useSesiKelas';
interface SesiKelasProps {
  data?: any;
}
const SesiKelas: React.FC<SesiKelasProps> = ({data}) => {
  // ROUTING

  // const {data} = route?.params;

  const {rating, setShow, setType, show, type, absent, detailAbsent}: any =
    useSesiKelas(data);

  return (
    <View>
      <View>
        <Card
          action={() => {
            setShow(true);
            setType(1);
          }}
          data_attendance={absent}
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
        children={<SwipeChildren type={type} data_absent={detailAbsent} />}
      />
    </View>
  );
};
export {SesiKelas};
