import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import Colors from '@constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import ListNoteItem from '../components/ListNoteItem';
import {fetchDetailNote, fetchSharedNotes} from '@redux';
import MenuItem from '../components/MenuItem';
import DetailNote from '../components/DetailNote';
import {useDeleteNote} from '@services/lpt';
import EmptyData from '@components/atoms/EmptyData';
import {RootState} from 'src/redux/rootReducer';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const SharedNotesScreen: React.FC = (props: any) => {
  const notes = useSelector((state: RootState) => state.notes);
  const [visible, setVisible] = useState<{status: boolean; note_id: string}>({
    status: false,
    note_id: '',
  });
  const [visibleDetail, setVisibleDetail] = useState<{
    status: boolean;
    note_id: string;
  }>({
    status: false,
    note_id: '',
  });
  const [filter, setFilter] = useState<IBasePaginationFilter>({
    page: 0,
    limit: 15,
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {mutate} = useDeleteNote();

  const onCloseMenuItem = useCallback(() => {
    setVisible({status: false, note_id: ''});
  }, []);
  const onCloseDetailNote = useCallback(() => {
    setVisibleDetail({status: false, note_id: ''});
    setShowConfirmDelete(false);
  }, []);
  const onOpenDetailNote = (note_id: string) => {
    dispatch(
      fetchDetailNote({note_id}, () =>
        setVisibleDetail(prevState => ({...prevState, status: true})),
      ),
    );
  };
  const onCloseConfirmDelete = useCallback(() => {
    setShowConfirmDelete(false);
  }, []);
  const onEndReached = () => {
    if (notes.sharedNotesNextPage && !notes.loadingList) {
      setFilter(prevState => ({
        ...prevState,
        page: filter.page! + filter.limit!,
      }));
    }
  };

  const deleteNote = () => {
    mutate('sharednotes', {note_id: visible.note_id}).then(() => {
      onCloseConfirmDelete();
      setVisible({status: false, note_id: ''});
      setFilter({page: 0, limit: 15});
      Toast.show({type: 'success', text1: 'Catatan berhasil dihapus'});
      dispatch(
        fetchSharedNotes({chapter_id: props.chapterId, page: 0, limit: 15}),
      );
    });
  };

  useEffect(() => {
    dispatch(fetchSharedNotes({chapter_id: props.chapterId, ...filter}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (notes.sharedNotesNextPage && filter.page! > 0 && !notes.loadingList) {
      dispatch(fetchSharedNotes({chapter_id: props.chapterId, ...filter}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const onDeleteNote = () => {
    setShowConfirmDelete(true);
  };

  const renderData = useCallback(({item, index}: any) => {
    return (
      <ListNoteItem
        data={item}
        firstIndex={index === 0}
        onPressMore={() => setVisible({status: true, note_id: item.id})}
        onPress={() => onOpenDetailNote(item.id)}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{padding: 16}}
        data={notes.sharedNotes?.data}
        renderItem={renderData}
        ListEmptyComponent={
          <EmptyData
            title="Belum Ada Catatan"
            description="Tambahkan catatan penting dari setiap materi pelajaran."
          />
        }
        onEndReached={onEndReached}
        keyExtractor={item => `${item.id}`}
      />
      <MenuItem
        type="sharednotes"
        height={100}
        visible={visible.status}
        onClose={onCloseMenuItem}
        onDelete={onDeleteNote}
        coverScreen
        show={showConfirmDelete}
        close={onCloseConfirmDelete}
        actionCancel={deleteNote}
        actionConfirm={onCloseConfirmDelete}
      />
      <DetailNote
        type="sharednotes"
        mode="detail"
        visible={visibleDetail.status}
        note_id={visibleDetail.note_id}
        onClose={onCloseDetailNote}
        onDeleteNote={onDeleteNote}
        coverScreen
        height={100}
        show={showConfirmDelete}
        close={onCloseConfirmDelete}
        actionCancel={deleteNote}
        actionConfirm={onCloseConfirmDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default SharedNotesScreen;
