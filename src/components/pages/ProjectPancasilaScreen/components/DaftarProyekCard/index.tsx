import React, {FC} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';
import Colors from '@constants/colors';
import {ProgressCircle} from '@components/atoms';
import BlueArrowIcon from '@assets/svg/blueArrow.svg';
import IcMateri from '@assets/svg/ic52_materi.svg';
import DividerHeight from '../DividerHeight';
import DaftarProyekSubCard from '../DaftarProyekSubCard';

type dividerType = 'both' | 'bottom' | 'top' | 'none';
type Props = {
  dividerType: dividerType;
  name: string;
  isCardExpanded: boolean;
  data?: IDaftarProyekPancasila;
  onCardPress: (data?: IDaftarProyekPancasila) => void;
  onSubCardPress: (data?: IProyekPancasila) => void;
};

const DaftarProyekCard: FC<Props> = ({
  dividerType,
  name,
  data,
  isCardExpanded,
  onCardPress,
  onSubCardPress,
}) => {
  const isSubEmpty = data?.project?.length == 0;
  const isSubItemHide = !isSubEmpty && isCardExpanded;
  return (
    <View style={styles.container}>
      {/* Separator */}
      {dividerType !== 'bottom' && dividerType !== 'none' ? (
        <DividerHeight />
      ) : null}
      <Pressable
        onPress={() => onCardPress(data)}
        style={styles.lessonPresentastionContainer}>
        <View style={styles.lessonProgressContainer}>
          <ProgressCircle
            progress={2}
            size={65}
            strokeWidth={2}
            color={Colors.primary.base}
            children={<IcMateri />}
          />
        </View>
        <View style={styles.lessonTitleContainer}>
          <Text numberOfLines={2} style={styles.lessonTitle2}>
            {name}
          </Text>
        </View>
        <View style={styles.lessonArrowContainer}>
          <BlueArrowIcon
            height={14}
            width={8}
            transform={[{rotate: isCardExpanded ? '-90deg' : '0deg'}]}
          />
        </View>
      </Pressable>
      {/* Separator */}
      {dividerType !== 'top' && dividerType !== 'none' ? (
        <DividerHeight />
      ) : null}
      {isSubItemHide && (
        <DaftarProyekSubCard data={data?.project} onPress={onSubCardPress} />
      )}
    </View>
  );
};

export default DaftarProyekCard;
