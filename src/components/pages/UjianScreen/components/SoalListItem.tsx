import Colors from '@constants/colors';
import React from 'react';
import {View, Text, PressableProps, Pressable, Dimensions} from 'react-native';
import ChevronRightIcon from '@assets/svg/ic16_chevron_right.svg';
import SelectedCheckBoxIcon from '@assets/svg/Checkbox_selected.svg';
import UnselectCheckBoxIcon from '@assets/svg/Checkbox_unselect.svg';
import {capitalizeEachWord, parseHtml} from '@constants/functional';
import IconDrag from '@assets/svg/ic24_drag.svg';
import {useDetailSoalListActions} from '../zustand';
import RenderHtmlView from '@components/organism/RenderHtmlView';
import {Button} from '@components/atoms';

type CheckBoxProps = {
  selected: boolean;
};

const CheckBox: React.FC<CheckBoxProps> = props => {
  if (props.selected) {
    return <SelectedCheckBoxIcon />;
  }
  return <UnselectCheckBoxIcon />;
};

type SoalListItemProps = {
  data: IBasePackageQuestion;
  index: number;
  selected: boolean;
  onPress?: PressableProps['onPress'];
  onSelectQuestion?: () => void;
  onSeeDetails?: () => void;
  listMode?: DetailPaketSoalListMode;
  isAddMode?: boolean;
  isActive?: boolean;
  isSearchQuestionId?: boolean;
  onLongPress?: VoidCallBack;
  soalList?: IBasePackageQuestion[];
};

const SoalListItem: React.FC<SoalListItemProps> = ({
  listMode = 'detail',
  soalList = [],
  ...props
}) => {
  const {updateSoalList} = useDetailSoalListActions();

  return (
    <Pressable
      style={{
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: Colors.white,
        borderRadius: 10,
        elevation: 1,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }}
      onLongPress={() => listMode === 'reorder' && props.onLongPress?.()}
      onPress={event => {
        if (listMode === 'reorder') {
          return;
        }
        if (listMode === 'delete') {
          updateSoalList(props.data);
          return;
        }
        props.onPress?.(event);
      }}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: Colors.primary.base,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: Colors.primary.base,
            fontSize: 14,
          }}>
          {props.data.order ?? props.index + 1}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Colors.dark.neutral60,
              fontSize: 12,
            }}>
            {capitalizeEachWord(
              props.data.question_detail?.question_type?.question_type ??
                props.data.question_type?.question_type ??
                '',
            )}{' '}
            {'\u2022'} ID: {props.data.question_id ?? props.data.id}
          </Text>
        </View>
        <RenderHtmlView
          baseStyle={{color: Colors.black, fontWeight: 'bold'}}
          contentWidth={Dimensions.get('screen').width * 0.5}
          source={{
            html: parseHtml(
              (props.data.question_detail?.question as string) ??
                props.data.question,
            ),
          }}
        />
        {props.isSearchQuestionId ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/* <Pressable onPress={props.onSeeDetails}>
              <Text style={{color: Colors.primary.base, fontWeight: '600'}}>
                Lihat Detail
              </Text>
            </Pressable> */}
            <View />
            <Button
              label="Pilih Soal"
              padding={12}
              action={props.onSelectQuestion}
            />
          </View>
        ) : null}
      </View>
      {props.isAddMode || listMode === 'delete' ? (
        <CheckBox
          selected={
            listMode == 'delete'
              ? soalList.some(item => item.id === props.data.id)
              : props.selected
          }
        />
      ) : listMode === 'reorder' ? (
        <IconDrag onPressIn={props.onLongPress} />
      ) : !props.isSearchQuestionId ? (
        <ChevronRightIcon />
      ) : null}
    </Pressable>
  );
};

export default SoalListItem;
