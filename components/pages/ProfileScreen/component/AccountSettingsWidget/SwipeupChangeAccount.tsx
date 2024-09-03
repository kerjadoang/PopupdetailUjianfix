import React, {useCallback} from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import {styles} from './style';
import {Button} from '@components/atoms';
import jwtDecode from 'jwt-decode';
import Avatar from '@components/atoms/Avatar';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

interface SwipeupChangeAccountProps {
  allChildrenData?: any;
  onPressAddChildren?: VoidCallBack;
  onPressChangeAccount?: CallBackWithParams<void, string>;
}

const SwipeupChangeAccount: React.FC<SwipeupChangeAccountProps> = ({
  allChildrenData,
  onPressAddChildren,
  onPressChangeAccount,
}) => {
  const renderChildrenCard = useCallback(({item: value, index}: any) => {
    const {rombel_name, school_name, full_name, access_token} = value;
    const user = jwtDecode<IBaseUser>(access_token);
    return (
      <Pressable
        key={value?.id || index}
        onPress={() => onPressChangeAccount?.(access_token)}>
        <View style={styles.swipeUpCard}>
          <View style={styles.row}>
            {/* <Image source={{uri: path_url}} style={styles.swipeUpCardIcon} /> */}
            <Avatar id={user.avatar || ''} style={styles.swipeUpCardIcon} />

            <View>
              <Text style={styles.swipeUpTitle}>{full_name}</Text>
              <View style={styles.row}>
                <Text style={styles.swipeUpDescription}>
                  {`${rombel_name || '-'} • ${school_name || '-'}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {index !== allChildrenData.length - 1 ? (
          <View style={styles.swipeUpLine} />
        ) : null}
      </Pressable>
    );
  }, []);

  return (
    <View style={styles.swipeUpContainer}>
      <Text style={styles.swipeUpHeadTitle}>{'Pindah Akun'}</Text>
      <FlatList
        style={{height: WINDOW_HEIGHT * 0.5}}
        data={allChildrenData}
        renderItem={renderChildrenCard}
      />
      <Button
        top={16}
        outline
        action={onPressAddChildren}
        label={'+ Tambah Akun Anak'}
      />
    </View>
  );
};

export default SwipeupChangeAccount;
