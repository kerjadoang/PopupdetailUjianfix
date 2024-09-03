import {View, FlatList} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import {PopUp, SwipeUp} from '@components/atoms';
import SwipeUpContent from './SwipeUpContent';
import useFormTryOut from '../useFormTryOut';
import Robot from '@assets/svg/robot_gembira.svg';
import 'dayjs/locale/id';
import {ScheduleCard} from './ScheduleCard';
const ScheduleSectionTab = () => {
  const {
    data,
    getTryOutDesc,
    selectedType,
    dataDesc,
    dataType,
    hanldeSelect,
    submitRegister,
    show,
    setShow,
    showSwipe,
    setShowSwipe,
    popup,
    setpopup,
    resetSelectedType,
  } = useFormTryOut();
  const [status, setStatus] = useState(false);
  const [selectedData, setSelectedData] = useState();

  return (
    <View style={styles.containerSection}>
      <FlatList
        data={data}
        initialNumToRender={7}
        renderItem={({item, index}) => (
          <ScheduleCard
            key={index}
            item={item}
            index={index}
            onPress={(item: any) => {
              setStatus(item.isRegistered ? true : false);
              setShowSwipe(true);
              getTryOutDesc(item?.id);
              setSelectedData(item);
            }}
          />
        )}
        keyExtractor={item => item?.id}
        showsVerticalScrollIndicator={false}
      />
      <SwipeUp
        height={200}
        visible={showSwipe}
        children={
          <SwipeUpContent
            show={show}
            setshow={setShow}
            dataDesc={dataDesc}
            dataType={dataType}
            showSwipe={showSwipe}
            setShowSwipe={setShowSwipe}
            selectedType={selectedType}
            setSelectedType={selectedType}
            handleSelect={(item: any) => hanldeSelect(item)}
            submitRegister={submitRegister}
            selectedData={selectedData}
            status={status}
          />
        }
        onClose={() => {
          resetSelectedType();
          return setShowSwipe(false);
        }}
      />
      <PopUp
        show={popup}
        close={() => setpopup(false)}
        title="Terimakasih telah mendaftar"
        desc={'Selamat Mengerjakan !'}
        Icon={Robot}
        titleConfirm="OK"
        actionConfirm={() => {
          setpopup(false);
        }}
      />
    </View>
  );
};

export default ScheduleSectionTab;
