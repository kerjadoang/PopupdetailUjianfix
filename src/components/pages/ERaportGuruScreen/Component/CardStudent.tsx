import {CCheckBox} from '@components/atoms';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MoreIcon from '@assets/svg/ic_more_gray.svg';

type Props = {
  name: string;
  nisn: string;
  isShare: boolean;
  isCheck: boolean;
  onCheck: () => void;
  onMore: () => void;
};

const CardStudent = ({
  name,
  nisn,
  isShare,
  onMore,
  onCheck,
  isCheck,
}: Props) => {
  return (
    <View style={s.container}>
      <View style={s.containerInfo}>
        <CCheckBox
          customStyle={{justifyContent: 'center'}}
          isChecked={isCheck}
          onPressCheck={onCheck}
          right={12}
        />
        <View>
          <Text style={s.name}>{name}</Text>
          <Text style={{marginVertical: 4}}>NISN : {nisn || '-'}</Text>
          {isShare ? (
            <View
              style={{
                backgroundColor: Colors.primary.light3,
                borderRadius: 16,
                paddingVertical: 4,
                alignItems: 'center',
                width: 115,
              }}>
              <Text style={s.shared}>Sudah Dibagikan</Text>
            </View>
          ) : null}
        </View>
      </View>
      <TouchableOpacity onPress={onMore}>
        <MoreIcon />
      </TouchableOpacity>
    </View>
  );
};
const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 15,
    borderColor: Colors.dark.neutral20,
    borderWidth: 1,
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  containerInfo: {flexDirection: 'row', flex: 1},
  name: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  nisn: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
  },
  shared: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
  },
});

export {CardStudent};
