import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Colors from '@constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import ListNoteItem from '../components/ListNoteItem';
import {fetchDetailNotePancasila, fetchSharedNotesPancasila} from '@redux';
import MenuItem from '../components/MenuItem';
import PancasilaDetailNote from '../components/PancasilaDetailNote';
import {useDeleteNote} from '@services/lpt';
import {RootState} from 'src/redux/rootReducer';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {EmptyState} from '@components/atoms';

const SharedNotesScreen: React.FC = (props: any) => {
  const route = props.route;
  const {service_type} = route.params;
  const notes = useSelector((state: RootState) => state.pancasilaNotes);
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
      fetchDetailNotePancasila({note_id}, () =>
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
        fetchSharedNotesPancasila({
          page: 0,
          limit: 15,
          type: 'others',
        }),
      );
    });
  };

  useEffect(() => {
    dispatch(
      fetchSharedNotesPancasila({
        project_id: props.projectId,
        ...filter,
        type: 'others',
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (notes.sharedNotesNextPage && filter.page! > 0 && !notes.loadingList) {
      dispatch(
        fetchSharedNotesPancasila({
          project_id: props.projectId,
          ...filter,
          type: 'others',
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const onDeleteNote = () => {
    setShowConfirmDelete(true);
  };

  const renderData = useCallback(({item, index}: any) => {
    return (
      <ListNoteItem
        key={index}
        data={item}
        firstIndex={index === 0}
        onPress={() => onOpenDetailNote(item.id)}
        isSharedNote
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={notes.sharedNotes?.data}
        renderItem={renderData}
        ListEmptyComponent={
          <EmptyState
            title={'Belum Ada Catatan Dibagikan'}
            subTitle={
              'Catatan yang dibagikan pengguna lain akan tampil di sini.'
            }
            type={'empty_search'}
          />
        }
        onEndReached={onEndReached}
        keyExtractor={(item, number) => `${item.id}${number}`}
      />
      <MenuItem
        type="sharednotes"
        height={100}
        service_type={service_type}
        visible={visible.status}
        onClose={onCloseMenuItem}
        onDelete={onDeleteNote}
        coverScreen
        show={showConfirmDelete}
        close={onCloseConfirmDelete}
        actionCancel={deleteNote}
        actionConfirm={onCloseConfirmDelete}
      />
      <PancasilaDetailNote
        type="sharednotes"
        mode="detail"
        service_type={service_type}
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
  contentContainerStyle: {
    flexGrow: 1,
    padding: 16,
  },
});

export default SharedNotesScreen;
