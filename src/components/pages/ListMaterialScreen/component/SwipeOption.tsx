import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon from '@assets/svg/ic24_arrange.svg';
import Icon_delete from '@assets/svg/ic_trash_red.svg';
import {styles} from '../styles';
import SwipeDelete from './SwipeDelete';
import {PopUpWithIcon} from '@components/atoms';
import Robot from '@assets/svg/ic_robot_hapus.svg';
type Props = {
  action?: any;
  action_delete?: any;
  key?: any;
  data?: any;
  section?: any;
  checkedItems?: any;
  handleCheckedItemsChange: any;
  showAlert: any;
  Alert: any;
  submit: any;
  setSection: any;
  selectedBab?: any;
};

const SwipeOption = ({
  action,
  data,
  section,
  showAlert,
  handleCheckedItemsChange,
  checkedItems,
  Alert,
  submit,
  setSection,
  selectedBab,
}: Props) => {
  return (
    <View style={{paddingVertical: 20}}>
      {section ? (
        <SwipeDelete
          action_cancel={() => setSection(false)}
          data={data}
          checkedItems={checkedItems}
          action_check={handleCheckedItemsChange}
          action={showAlert}
        />
      ) : (
        <View>
          <Pressable style={[styles.listRow]} onPress={action}>
            <Icon width={24} />
            <Text style={styles.text}>Atur Urutan Materi</Text>
          </Pressable>
          {selectedBab?.school_id !== 0 ? (
            <Pressable
              style={[styles.listRow]}
              onPress={() => setSection(true)}>
              <Icon_delete width={24} />
              <Text style={styles.text}>Hapus Materi</Text>
            </Pressable>
          ) : null}
        </View>
      )}
      {Alert ? (
        <PopUpWithIcon
          twoButton
          action_2={showAlert}
          action={() => submit(checkedItems)}
          textButton="Hapus"
          textButton_2="Batal"
          icon
          iconName={<Robot />}
          title="Hapus Material"
          desc="Apakah Anda yakin untuk menghapus materi ini?"
        />
      ) : null}
    </View>
  );
};

export default SwipeOption;
