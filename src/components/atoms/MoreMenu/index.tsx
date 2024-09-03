import {SwipeUp, SwipeUpProps} from '@components/atoms';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import Colors from '@constants/colors';

export type MenuItemButtonType = {
  icon?: React.ReactNode;
  label: string;
  onPress?: TouchableOpacityProps['onPress'];
};

const MenuItemButton: React.FC<MenuItemButtonType> = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
        {props.icon}
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            flexGrow: 1,
            color: Colors.dark.neutral100,
          }}>
          {props.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

type MoreMenuProps = {
  menus: MenuItemButtonType[];
} & SwipeUpProps;

const MoreMenu: React.FC<MoreMenuProps> = props => {
  return (
    <SwipeUp {...props}>
      <View style={{padding: 16, gap: 20}}>
        {props.menus.map((menu, index) => {
          return <MenuItemButton {...menu} key={`${index}`} />;
        })}
      </View>
      {props.children}
    </SwipeUp>
  );
};

export {MoreMenu};
