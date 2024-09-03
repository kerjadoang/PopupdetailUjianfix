import React, {FC, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import CircleIcon from '@components/atoms/CircleIcon';
import IcChevronUp from '@assets/svg/ic24_chevron_up_blue.svg';
import IcChevronDown from '@assets/svg/ic24_chevron_down_blue.svg';
import {CardWrapper, Checkbox, MainView} from '@components/atoms';
import {FlatList} from 'react-native-gesture-handler';
import useDidMountEffect from '@hooks/useDidmountEffect';
import {PoppinsText} from '@components/atoms/Poppins';
import {ParticipantItem} from '@features/Exam';

type Props = {
  title?: string;
  dropdownTitle?: string;
  type?: 'headerCard' | 'collapseCard';
  isCollapse?: boolean;
  setIsCollapse?: VoidCallBack;
  participants?: any[];
  onParticipantsChange?: CallBackWithParams<void, any[]>;
};

const SeparatorComponent = () => <MainView marginVertical={8} />;

const ParticipantListCard: FC<Props> = ({
  title = 'Peserta Ujian',
  dropdownTitle,
  type = 'headerCard',
  participants = [],
  isCollapse,
  setIsCollapse,
  onParticipantsChange,
}) => {
  const [tempParticipants, setTempParticipants] = useState(participants || []);
  const isSelectAll = useMemo(
    () => tempParticipants.length === participants?.length,
    [tempParticipants, participants],
  );

  useDidMountEffect(() => {
    onParticipantsChange?.(tempParticipants);
  }, [tempParticipants]);

  const onParticipantTap = (participant: any) => {
    setTempParticipants(tempParticipants.pushOrRemove(participant));
  };

  const isParticipantSelected = (participant: any) =>
    tempParticipants.some(_participant => _participant === participant);

  const onSelectAllParticipant = () => {
    if (!isSelectAll) {
      setTempParticipants(participants);
      return;
    }

    setTempParticipants([]);
  };

  return (
    <CardWrapper>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {type === 'collapseCard' && (
          <CircleIcon
            icon={isCollapse ? <IcChevronDown /> : <IcChevronUp />}
            onPress={() => setIsCollapse?.()}
          />
        )}
      </View>
      <View style={styles.dropdownContainer}>
        {type === 'collapseCard' && (
          <Checkbox
            isChecked={isSelectAll}
            containerStyle={styles.dropdownChecboxContainer}
            onPress={onSelectAllParticipant}
          />
        )}
        <PoppinsText style={styles.dropdownTitle}>{dropdownTitle}</PoppinsText>
        <MainView flex={1} />
      </View>

      <FlatList
        ItemSeparatorComponent={SeparatorComponent}
        contentContainerStyle={styles.participantContainer}
        data={!isCollapse ? participants : []}
        renderItem={({item: data}) => (
          <ParticipantItem
            data={data}
            onPress={() => onParticipantTap(data)}
            isSelected={isParticipantSelected(data)}
          />
        )}
        scrollEnabled={false}
      />
    </CardWrapper>
  );
};

export {ParticipantListCard};
