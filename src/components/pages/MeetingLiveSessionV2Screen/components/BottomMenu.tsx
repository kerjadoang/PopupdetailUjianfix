import Colors from '@constants/colors';
import React from 'react';
import {View, Text, StyleSheet, Pressable, PressableProps} from 'react-native';

interface IMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onPress: PressableProps['onPress'];
  disabled: boolean;
}

const BottomMenuItem: React.FC<IMenuItem> = props => {
  return (
    <Pressable
      style={styles.itemContainer}
      onPress={props?.onPress}
      disabled={props?.disabled}>
      {props?.icon}
      <Text style={styles.itemLabel}>{props?.label}</Text>
    </Pressable>
  );
};

type BottomMenuProps = {
  menus: IMenuItem[];
};

const BottomMenu: React.FC<BottomMenuProps> = props => {
  return (
    <View style={styles.container}>
      {props?.menus?.map(menu => {
        return <BottomMenuItem key={menu?.id} {...menu} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    padding: 12,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  itemLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.dark.neutral80,
  },
});

export default BottomMenu;
