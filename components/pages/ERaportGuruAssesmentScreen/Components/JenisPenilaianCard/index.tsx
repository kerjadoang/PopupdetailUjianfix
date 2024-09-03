import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Button, CCheckBox, SwipeUp} from '@components/atoms';
import {useJenisPenilaianCard} from './useJenisPenilaianCard';
import Colors from '@constants/colors';

type Props = {
  id: string;
  label: string;
  data: BasicCompetencyDetail[];
  isError?: boolean;
  onSimpan: (data: BasicCompetencyDetail[]) => void;
};

const JenisPenilaianCard: FC<Props> = ({
  data,
  id,
  label,
  isError,
  onSimpan,
}: Props) => {
  const {
    show,
    setShow,
    closeSwipeUp,
    _handlerOnCheck,
    _handlerShow,
    subItem,
    tempData,
    isButtonDisabled,
  } = useJenisPenilaianCard(data);

  const renderSwipeUp = () => {
    return (
      <View style={styles.swipeContainer}>
        <Text style={styles.titleSwipe}>Pilih KD {label}</Text>
        <View style={{marginBottom: 16}}>
          {tempData.map((_item: BasicCompetencyDetail, index: number) => {
            return (
              <View key={index}>
                <View style={styles.cardSwipe}>
                  <View>
                    <Text
                      style={
                        _item.choose ? styles.selectedKd : styles.unselectedKd
                      }>
                      KD {_item.no}
                    </Text>
                    <Text style={styles.kdName}>{_item.chapter}</Text>
                  </View>
                  <View style={styles.check}>
                    <CCheckBox
                      isChecked={_item.choose ?? false}
                      onPressCheck={() => _handlerOnCheck(_item)}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <Button
          label="Simpan"
          isDisabled={isButtonDisabled}
          action={() => {
            closeSwipeUp();
            onSimpan(tempData);
          }}
          style={styles.btmbtn}
        />
      </View>
    );
  };

  return (
    <View>
      <View style={[styles.containerCard, isError ? styles.errorBorder : null]}>
        <View style={{flex: 1}}>
          <Text style={styles.label}>{label}</Text>
          {isError ? (
            <Text style={styles.errorText}>KD belum diatur!</Text>
          ) : (
            <Text>{subItem}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setShow({...show, status: true, id: id})}>
          <Text style={[[styles.label, {color: Colors.primary.base}]]}>
            Atur KD
          </Text>
        </TouchableOpacity>
      </View>
      <SwipeUp
        swipeToClose={isButtonDisabled}
        backdropPressToClose={isButtonDisabled}
        backButtonClose={isButtonDisabled}
        visible={_handlerShow(id)}
        onClose={() => closeSwipeUp()}
        children={renderSwipeUp()}
      />
    </View>
  );
};

export default JenisPenilaianCard;
