import {Button, CCheckBox, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import {IMAGES} from '@constants/image';
import {IPhoneBookResponse, IPhoneBookResponseData} from '@services/uaa/type';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Pressable,
  PressableProps,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

type ContactListItemProps = {
  data?: IPhoneBookResponseData;
  onPress?: PressableProps['onPress'] | any;
  isFirstIndex?: boolean;
  checked: boolean;
};

const ContactListItem: React.FC<ContactListItemProps> = props => {
  return (
    <>
      {!props.isFirstIndex && (
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: Colors.dark.neutral20,
          }}
        />
      )}
      <Pressable
        onPress={props.onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          gap: 12,
          flexGrow: 1,
        }}>
        <View
          style={{width: 24, height: 24, borderRadius: 12, overflow: 'hidden'}}>
          <Image
            source={{uri: props.data?.path_url}}
            defaultSource={IMAGES.imgPlaceHolder}
            style={{width: 24, height: 24}}
            resizeMode="contain"
          />
        </View>
        <View style={{flexGrow: 1}}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              color: Colors.dark.neutral100,
            }}>
            {props.data?.phone_number}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              color: Colors.dark.neutral60,
            }}>
            {props.data?.full_name} • {props.data?.role_name}
          </Text>
        </View>
        <CCheckBox isChecked={props.checked} onPressCheck={props.onPress} />
      </Pressable>
    </>
  );
};

type ContactListProps = {
  data?: IPhoneBookResponse | undefined;
  shareNote?: (usersId: string[]) => void;
} & SwipeUpProps;

const ContactList: React.FC<ContactListProps> = props => {
  const [usersId, setUserId] = useState<string[]>([]);

  useEffect(() => {
    if (props.visible) {
      setUserId([]);
    }
  }, [props.visible]);

  const onUserSelected = (id: string) => {
    let newData = [...usersId];
    if (usersId.includes(id)) {
      newData = newData.filter(item => item !== id);
    } else {
      newData = [...newData, id];
    }

    setUserId(newData);
  };

  const renderItem = useCallback(
    ({item, index}: any) => {
      return (
        <ContactListItem
          data={item}
          isFirstIndex={index === 0}
          onPress={() => onUserSelected(item.id)}
          checked={usersId.includes(item.id)}
        />
      );
    },
    [props.data, usersId],
  );

  const renderButtonLabel = (): string => {
    return usersId.length < 1
      ? 'Bagikan'
      : `Bagikan ke ${usersId.length} penerima`;
  };

  return (
    <SwipeUp {...props}>
      <View style={{paddingHorizontal: 16, paddingBottom: 16}}>
        <Text style={styles.titleModal}>Bagikan Catatan</Text>
        <Text
          style={{
            marginBottom: 8,
            fontFamily: 'Poppins-Regular',
            color: Colors.dark.neutral100,
            fontSize: 14,
            marginLeft: 12,
          }}>
          Pilih penerima
        </Text>
        <FlatList
          data={props.data?.data}
          renderItem={renderItem}
          style={{
            paddingHorizontal: 12,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.dark.neutral20,
            maxHeight: 300,
          }}
          keyExtractor={item => `${item.id}`}
        />
        <View style={{marginTop: 20, gap: 12}}>
          <Button
            label={renderButtonLabel()}
            isDisabled={usersId.length < 1}
            action={() => props.shareNote?.(usersId)}
          />
          <Button outline label="Batal" action={props.onClose} />
        </View>
      </View>
    </SwipeUp>
  );
};

const styles = StyleSheet.create({
  titleModal: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default ContactList;
