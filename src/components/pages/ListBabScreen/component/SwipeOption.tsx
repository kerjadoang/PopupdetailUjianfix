import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon from '@assets/svg/ic24_arrange.svg';
import Icon_delete from '@assets/svg/ic_trash_red.svg';
import {styles} from '../styles';
import Edit from '@assets/svg/ic24_edit_2.svg';
import SwipeDelete from './SwipeDelete';
import {PopUpWithIcon} from '@components/atoms';
import Robot from '@assets/svg/ic_robot_hapus.svg';
type Props = {
  action?: any;
  action_delete?: any;
  action_2?: any;
  action_delete_2?: any;
  key?: any;
  data?: any;
  type?: any;
  selectedBab?: any;
  checkedItems?: any;
  handleCheckedItemsChange: any;
  showAlert: any;
  setSection: any;
  section: any;
  alert: any;
  newNameSubject: any;
  subject: any;
  submit: any;
};

const SwipeOption = ({
  action,
  data,
  action_delete,
  type,
  action_2,
  action_delete_2,
  selectedBab,
  showAlert,
  handleCheckedItemsChange,
  checkedItems,
  setSection,
  section,
  alert,
  newNameSubject,
  subject,
  submit,
}: Props) => {
  return (
    <View style={{paddingVertical: 20}}>
      {section ? (
        <SwipeDelete
          action_batal={() => setSection(false)}
          data={data}
          checkedItems={checkedItems}
          action_check={handleCheckedItemsChange}
          action={showAlert}
        />
      ) : (
        <View>
          <Pressable
            style={[styles.listRow]}
            onPress={type ? action_2 : action}>
            {type ? <Edit width={24} /> : <Icon width={24} />}
            <Text style={styles.text}>
              {type ? 'Ubah Judul Mata Pelajaran' : 'Atur Urutan Bab'}
            </Text>
          </Pressable>
          {selectedBab?.school_id === 0 ? null : (
            <Pressable
              style={[styles.listRow]}
              onPress={type ? action_delete_2 : action_delete}>
              <Icon_delete width={24} />
              <Text style={styles.text}>
                {type ? 'Hapus Mata Pelajaran' : 'Hapus Bab'}
              </Text>
            </Pressable>
          )}
        </View>
      )}
      {alert ? (
        <PopUpWithIcon
          twoButton
          action_2={showAlert}
          action={() => submit(checkedItems)}
          textButton="Hapus"
          textButton_2="Batal"
          icon
          iconName={<Robot />}
          title="Hapus Bab"
          desc={
            <Text>
              Apakah Anda yakin untuk menghapus mata pelajaran{' '}
              <Text style={[styles.title, {color: '#4D545C'}]}>
                {!newNameSubject ? subject?.name : newNameSubject}
              </Text>
              ? Seluruh detail kelas dan materi akan terhapus.
            </Text>
          }
        />
      ) : null}
    </View>
  );
};

export default SwipeOption;
