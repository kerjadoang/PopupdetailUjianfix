import React, {FC, ReactNode, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Button, MainView} from '@components/atoms';
import {FlatList} from 'react-native';
import {ParticipantListCard} from '@features/Exam';
import {ms} from 'react-native-size-matters';
import Colors from '@constants/colors';

type Props = {
  HeaderComponent: ReactNode;
  nextStep: () => void;
  prevStep: () => void;
};

const mockUsers = Array(7)
  .fill(0)
  .map((e, i) => ({
    name: 'user ' + i,
    class: i,
    isSelected: false,
  }));

const mockRombelUser = Array(2)
  .fill(0)
  .map((e, i) => ({
    name: 'Kelas ' + (i + 1),
    users: mockUsers,
  }));

const RenderHeaderComponent = ({
  HeaderComponent,
}: {
  HeaderComponent: ReactNode;
}) => (
  <>
    {HeaderComponent}
    <ParticipantListCard
      title="Kelas 8-B"
      dropdownTitle="Kelas 8-B, 8-C"
      type="headerCard"
    />
    <MainView marginVertical={12} />
  </>
);

const RenderFooterComponent = ({nextStep, prevStep}: Partial<Props>) => {
  return (
    <View
      style={{
        marginTop: ms(16),
        padding: ms(16),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Button
        label="Sebelumnya"
        background="transparent"
        borderColor={'transparent'}
        action={async () => {
          // handleSubmit(onSubmit);
          prevStep?.();
        }}
        textStyle={{color: Colors.primary.base}}
        isDisabled={false}
        style={{width: '45%'}}
      />
      <Button
        label="Berikutnya"
        action={async () => {
          // handleSubmit(onSubmit);
          nextStep?.();
        }}
        isDisabled={false}
        style={{width: '45%'}}
      />
    </View>
  );
};

const SeparatorComponent = () => <MainView marginVertical={8} />;

const ParticipantExam: FC<Props> = ({nextStep, prevStep, HeaderComponent}) => {
  const [collapsedId, setCollapsedId] = useState<string>('');

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={mockRombelUser}
        ListHeaderComponent={
          <RenderHeaderComponent HeaderComponent={HeaderComponent} />
        }
        ItemSeparatorComponent={SeparatorComponent}
        renderItem={({item}: IFlatListItem<(typeof mockRombelUser)[0]>) => {
          const isCollapse = collapsedId !== item.name;
          return (
            <ParticipantListCard
              onParticipantsChange={_ => {}}
              isCollapse={isCollapse}
              setIsCollapse={() => {
                if (!isCollapse) {
                  return setCollapsedId('');
                }
                return setCollapsedId(item.name);
              }}
              title={item.name}
              dropdownTitle="Semua Murid"
              type="collapseCard"
              participants={item?.users?.map(user => user?.name) ?? []}
            />
          );
        }}
        ListFooterComponent={
          <RenderFooterComponent nextStep={nextStep} prevStep={prevStep} />
        }
      />
    </View>
  );
};

export {ParticipantExam};
