import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import Colors from '@constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import ListNoteItem from '../components/ListNoteItem';
import {fetchAllNotesPancasila, fetchDetailNotePancasila} from '@redux';
import MenuItem from '../components/MenuItem';
import PancasilaDetailNote from '../components/PancasilaDetailNote';
import SnackbarResult from '@components/atoms/SnackbarResult';
import {RootState} from 'src/redux/rootReducer';
import {useDeleteNote} from '@services/lms';
import Contacts from 'react-native-contacts';
import {
  askGetContactPermission,
  convertPhoneNumber,
} from '@constants/functional';
import {useCheckPhonebook, useShareNote} from '@services/uaa';
import ContactList from '../components/ContactList';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {EmptyState} from '@components/atoms';

const MyNotesScreen: React.FC = (props: any) => {
  const route = props.route;
  const {service_type} = route.params;
  const [visible, setVisible] = useState<{status: boolean; note_id: string}>({
    status: false,
    note_id: '',
  });
  const [visibleDetail, setVisibleDetail] = useState<{
    status: boolean;
    note_id: string;
    mode: 'edit' | 'create' | 'detail';
  }>({
    status: false,
    note_id: '',
    mode: 'detail',
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [showConfirmDeleteOnDetail, setShowConfirmDeleteOnDetail] =
    useState<boolean>(false);
  const [showContactList, setShowContactList] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<{
    status: boolean;
    message: string;
  }>({status: false, message: ''});
  const [filter, setFilter] = useState<IBasePaginationFilter>({
    page: 0,
    limit: 15,
  });
  const {mutate} = useDeleteNote();
  const {mutate: checkPhonebook, data: phoneBookData} = useCheckPhonebook();
  const {mutate: shareNote} = useShareNote();

  const notes = useSelector((state: RootState) => state.pancasilaNotes);

  const dispatch = useDispatch();

  const onCloseMenuItem = useCallback(() => {
    setVisible(prevState => ({...prevState, status: false}));
  }, []);
  const onCloseDetailNote = useCallback(() => {
    setShowConfirmDeleteOnDetail(false);
    setVisibleDetail(prevState => ({
      ...prevState,
      status: false,
      mode: 'detail',
    }));
  }, []);
  const onCloseConfirmDelete = useCallback(() => {
    setShowConfirmDelete(false);
    setShowConfirmDeleteOnDetail(false);
    setVisibleDetail(prevState => ({...prevState, status: false}));
  }, []);
  const onCloseConfirmDeleteOnDetail = useCallback(() => {
    setShowConfirmDeleteOnDetail(false);
  }, []);
  const onCloseContactList = useCallback(() => {
    setShowContactList(false);
  }, []);
  const onOpenDetailNote = (note_id: string) => {
    dispatch(
      fetchDetailNotePancasila({note_id}, () =>
        setVisibleDetail(prevState => ({...prevState, status: true, note_id})),
      ),
    );
  };
  const onSuccessProcessNote = (
    context: 'disimpan' | 'dihapus' | 'dibagikan',
  ) => {
    Toast.show({type: 'success', text1: `Catatan berhasil ${context}`});
  };
  const onEndReached = () => {
    if (notes.allNotesNextPage && !notes.loadingList) {
      setFilter(prevState => ({
        ...prevState,
        page: filter.page! + filter.limit!,
      }));
    }
  };
  const onDeleteNote = () => {
    setShowConfirmDelete(true);
  };
  const onDeleteNoteOnDetail = () => {
    setShowConfirmDeleteOnDetail(true);
  };
  const onShareNote = async () => {
    try {
      let contacts;
      const permission = await askGetContactPermission();
      setVisible(prevState => ({...prevState, status: false}));
      setVisibleDetail(prevState => ({...prevState, status: false}));
      if (permission) {
        contacts = await Contacts.getAll();
        let bodyPayload = contacts
          .filter(item => item.phoneNumbers.length > 0)
          .map(contact => {
            return {
              phone_number: convertPhoneNumber(
                contact.phoneNumbers?.[0]?.number,
              ),
            };
          });
        await checkPhonebook({list: bodyPayload});
        setTimeout(() => {
          setShowContactList(true);
        }, 500);
      }
    } catch (e) {}
  };
  const sendShareNote = (usersId: string[]) => {
    shareNote({
      id: visible.note_id ?? visibleDetail.note_id,
      users_id: usersId,
    }).then(() => {
      onCloseContactList();
      onCloseDetailNote();
      onCloseMenuItem();
      onSuccessProcessNote('dibagikan');
    });
  };
  const successUpdateCallback = () => {
    setVisible(prevState => ({...prevState, status: false}));
    setVisibleDetail(prevState => ({
      ...prevState,
      status: false,
      mode: 'detail',
    }));
    setFilter({page: 0, limit: 15});
    dispatch(fetchAllNotesPancasila({page: 0, limit: 15}));
  };
  const deleteNote = () => {
    mutate('mynotes', {
      note_id: visibleDetail.status ? visibleDetail.note_id : visible.note_id,
    })
      .then(() => {
        onSuccessProcessNote('dihapus');
        successUpdateCallback();
      })
      .finally(() => {
        onCloseConfirmDelete();
      });
  };

  useEffect(() => {
    dispatch(fetchAllNotesPancasila({...filter}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (notes.allNotesNextPage && filter.page! > 0 && !notes.loadingList) {
      dispatch(fetchAllNotesPancasila({...filter}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const renderData = useCallback(({item, index}: any) => {
    return (
      <ListNoteItem
        key={index}
        data={item}
        firstIndex={index === 0}
        onPressMore={() => setVisible({status: true, note_id: item.id})}
        onPress={() => onOpenDetailNote(item.id)}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEdit = () => {
    dispatch(
      fetchDetailNotePancasila({note_id: visible.note_id}, () => {
        setVisible(prevState => ({...prevState, status: false}));
        setTimeout(() => {
          setVisibleDetail(prevState => ({
            ...prevState,
            status: true,
            note_id: visible.note_id,
            mode: 'edit',
          }));
        }, 500);
      }),
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={notes.allNotes?.data}
        renderItem={renderData}
        onEndReached={onEndReached}
        ListEmptyComponent={
          <EmptyState
            title={'Belum Ada Catatan Dibagikan'}
            subTitle={
              'Catatan yang dibagikan pengguna lain akan tampil di sini.'
            }
            type={'empty_search'}
          />
        }
        keyExtractor={(item, number) => `${item.id}${number}`}
      />
      <MenuItem
        type="mynotes"
        height={100}
        service_type={service_type}
        visible={visible.status}
        onClose={onCloseMenuItem}
        onDelete={onDeleteNote}
        onEdit={onEdit}
        onShare={onShareNote}
        coverScreen
        show={showConfirmDelete}
        close={onCloseConfirmDelete}
        actionCancel={deleteNote}
        actionConfirm={onCloseConfirmDelete}
      />
      <PancasilaDetailNote
        type="mynotes"
        mode={visibleDetail.mode}
        service_type={service_type}
        visible={visibleDetail.status}
        note_id={visibleDetail.note_id}
        onSuccessSubmit={() => {
          successUpdateCallback();
          onSuccessProcessNote('disimpan');
        }}
        onClose={onCloseDetailNote}
        onDeleteNote={onDeleteNoteOnDetail}
        onShareNote={onShareNote}
        coverScreen
        height={100}
        show={showConfirmDeleteOnDetail}
        close={onCloseConfirmDeleteOnDetail}
        actionCancel={deleteNote}
        actionConfirm={onCloseConfirmDeleteOnDetail}
      />
      <ContactList
        visible={showContactList}
        onClose={onCloseContactList}
        shareNote={sendShareNote}
        height={100}
        coverScreen
        data={phoneBookData}
      />
      <SnackbarResult
        label={showSnackbar.message}
        visible={showSnackbar.status}
        onPressClose={() => setShowSnackbar({status: false, message: ''})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    padding: 16,
  },
});

export default MyNotesScreen;
