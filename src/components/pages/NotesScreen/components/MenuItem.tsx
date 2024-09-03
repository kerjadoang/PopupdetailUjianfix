import {Button, PopUpProps, SwipeUp, SwipeUpProps} from '@components/atoms';
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import IconShare from '@assets/svg/ic24_share.svg';
import IconEdit from '@assets/svg/ic24_edit_2.svg';
import IconDelete from '@assets/svg/ic24_trash.svg';
import Colors from '@constants/colors';
import ConfirmDelete from './ConfirmDelete';

type ItemProps = {
  id: string;
  icon: React.ReactNode;
  title: string;
  onPress: TouchableOpacityProps['onPress'];
  types: string[];
};

const Item: React.FC<ItemProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.itemContainer}>
      {props.icon}
      <Text style={styles.itemLabel}>{props.title}</Text>
    </TouchableOpacity>
  );
};

type MenuItemProps = {
  type: 'mynotes' | 'sharednotes';
  onShare?: TouchableOpacityProps['onPress'];
  onEdit?: TouchableOpacityProps['onPress'];
  onDelete?: TouchableOpacityProps['onPress'];
} & SwipeUpProps &
  PopUpProps;

const MenuItem: React.FC<MenuItemProps> = props => {
  const menus = [
    {
      id: '1',
      icon: <IconShare />,
      title: 'Bagikan',
      onPress: props.onShare,
      types: ['mynotes'],
    },
    {
      id: '2',
      icon: <IconEdit />,
      title: 'Edit',
      onPress: props.onEdit,
      types: ['mynotes'],
    },
    {
      id: '3',
      icon: <IconDelete />,
      title: 'Hapus',
      onPress: props.onDelete,
      types: ['mynotes', 'sharednotes'],
    },
  ];

  return (
    <SwipeUp {...props}>
      <View style={{padding: 16, gap: 24}}>
        {menus.map(item => {
          return (
            item.types.includes(props.type) && <Item key={item.id} {...item} />
          );
        })}
        <Button label="Kembali" action={props.onClose} />
      </View>
      <ConfirmDelete {...props} />
    </SwipeUp>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {flexDirection: 'row', alignItems: 'center', gap: 12},
  itemLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
});

export default MenuItem;
