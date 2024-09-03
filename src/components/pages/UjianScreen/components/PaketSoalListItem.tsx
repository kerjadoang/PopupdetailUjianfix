import {Button, ButtonProps, MainView} from '@components/atoms';
import Colors from '@constants/colors';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
  Pressable,
} from 'react-native';
import IcDownload from '@assets/svg/ic_download.svg';
import IcMoreGray from '@assets/svg/ic24_more_gray2.svg';
import {useDisclosure} from '@hooks/useDisclosure';
import MorePaketSoalListItem from './MorePaketSoalListItem';
import {downloadFile, showErrorToast} from '@constants/functional';
import {getHeaders} from '@api/utils';
import {URL_PATH} from '@constants/url';

type PaketSoalListItem = {
  data: IBasePackage;
  onPress?: TouchableWithoutFeedbackProps['onPress'];
  onPressDetail?: TouchableOpacityProps['onPress'];
  onPressSelect?: ButtonProps['action'];
  selectLabel?: string;
  isBankSoal?: boolean;
  fromCreateJadwal?: boolean;
  type?: 'more' | 'default';
  showDownloadButton?: boolean;
  moreData?: IPaketSoalMore;
  setMoreData?: ISetPaketSoalMore;
  showSelectButtonWhenNoSoal?: boolean;
};

const PaketSoalListItem: React.FC<PaketSoalListItem> = props => {
  const isNoSoal =
    (props.data.multiple_choice_count || 0) < 1 &&
    (props.data.multiple_choice_complex_count || 0) < 1 &&
    (props.data.essay_count || 0) < 1;
  const isDisabled = isNoSoal && props.isBankSoal; //actual
  const {
    type = 'default',
    moreData,
    setMoreData,
    showDownloadButton,
    onPress,
    data,
    showSelectButtonWhenNoSoal,
  } = props;
  const {
    isVisible: isShowMore,
    toggle: toggleShowMore,
    hide: hideIsShowMore,
  } = useDisclosure();

  const onDownloadPaketSoal = async () => {
    try {
      const header = await getHeaders();
      downloadFile({
        headers: header,
        fileExt: 'pdf',
        fileNameWithExt: `${data.name}.pdf`,
        full_path: URL_PATH.download_paket_soal(data.id || 0),
      });
    } catch (error) {
      showErrorToast('Gagal download paket soal');
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={e => {
        type === 'more' && hideIsShowMore();
        onPress?.(e);
      }}>
      <View
        style={[styles.mainContainer, isDisabled && styles.noActiveContainer]}>
        <MainView flexDirection="row" justifyContent="space-between">
          <Text
            style={[
              {
                fontFamily: 'Poppins-SemiBold',
                fontSize: 14,
                color: Colors.dark.neutral100,
                flex: 1,
              },
              isDisabled && styles.noActiveText,
            ]}>
            {props.data.name}
          </Text>
          {type === 'more' && (
            <Pressable
              onPress={toggleShowMore}
              style={({pressed}) => ({
                opacity: pressed ? 0.3 : 1,
              })}>
              <IcMoreGray height={14} width={18} />
            </Pressable>
          )}
        </MainView>
        <View style={{flexDirection: 'row', alignItems: 'flex-start', gap: 20}}>
          <View style={{flex: 1, paddingBottom: 4}}>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: Colors.dark.neutral60,
                }}>
                Pilihan Ganda
              </Text>
              <Text
                style={[
                  {
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                    color: Colors.dark.neutral80,
                  },
                  isDisabled && styles.noActiveText,
                ]}>
                {props.data.multiple_choice_count ?? 0} Soal
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: Colors.dark.neutral60,
                }}>
                Pilihan Ganda Kompleks
              </Text>
              <Text
                style={[
                  {
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                    color: Colors.dark.neutral80,
                  },
                  isDisabled && styles.noActiveText,
                ]}>
                {props.data.multiple_choice_complex_count ?? 0} Soal
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                color: Colors.dark.neutral60,
              }}>
              Uraian
            </Text>
            <Text
              style={[
                {
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: Colors.dark.neutral80,
                },
                isDisabled && styles.noActiveText,
              ]}>
              {props.data.essay_count ?? 0} Soal
            </Text>
          </View>
          {showDownloadButton && (
            <MainView>
              <Pressable
                onPress={onDownloadPaketSoal}
                style={({pressed}) => ({
                  opacity: pressed ? 0.3 : 1,
                })}>
                <IcDownload height={30} width={30} />
              </Pressable>
            </MainView>
          )}
        </View>
        {(!isNoSoal || showSelectButtonWhenNoSoal) && ( //actual !isNoSoal
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={
                (type !== 'more' || !isShowMore) && !isNoSoal
                  ? props.onPressDetail
                  : undefined
              }>
              <Text
                style={!isNoSoal ? styles.labelSeeDetail : styles.noActiveText}>
                Lihat Detail
              </Text>
            </TouchableOpacity>
            {props.fromCreateJadwal && !isShowMore && (
              <Button
                label={props.selectLabel ?? 'Pilih'}
                action={
                  type !== 'more' || !isShowMore
                    ? props.onPressSelect
                    : undefined
                }
                style={{
                  alignSelf: 'flex-end',
                  paddingHorizontal: 34,
                  paddingVertical: 4,
                }}
              />
            )}
          </View>
        )}
        {/* MARK: START MoreContainer */}
        {isShowMore && (
          <MorePaketSoalListItem
            shuffleAnswersSelected={moreData?.shuffleAnswersSelected}
            shuffleQuestionSelected={moreData?.shuffleQuestionSelected}
            setShuffleAnswersSelected={setMoreData?.setShuffleAnswersSelected}
            setShuffleQuestionSelected={setMoreData?.setShuffleQuestionSelected}
          />
        )}
        {/* MARK: END MoreContainer */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  noActiveContainer: {
    backgroundColor: Colors.dark.neutral20,
  },
  noActiveText: {
    color: Colors.dark.neutral60,
  },
  labelSeeDetail: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.base,
    fontSize: 14,
  },
  moreContainer: {
    backgroundColor: Colors.white,
    elevation: 4,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  mainContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    elevation: 4,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
});

PaketSoalListItem.defaultProps = {type: 'default'};

export default PaketSoalListItem;
