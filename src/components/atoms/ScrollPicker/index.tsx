import dayjs from 'dayjs';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

function isNumeric(str: string | unknown): boolean {
  if (typeof str === 'number') {
    return true;
  }
  if (typeof str !== 'string') {
    return false;
  }
  return (
    !isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

const isViewStyle = (style: ViewProps['style']): style is ViewStyle => {
  return (
    typeof style === 'object' &&
    style !== null &&
    Object.keys(style).includes('height')
  );
};

export type ScrollPickerProps = {
  style?: ViewProps['style'];
  date?: Boolean;
  dataSource: Array<string | number>;
  selectedIndex?: any;
  onValueChange?: (
    value: ScrollPickerProps['dataSource'][0],
    index: number,
  ) => void;
  renderItem?: (
    data: ScrollPickerProps['dataSource'][0],
    index: number,
    isSelected: boolean,
  ) => JSX.Element;
  highlightColor?: string;
  width?: number;
  borderRadiusRight?: number;
  borderRadiusLeft?: number;
  highlightBorderWidth?: number;
  itemHeight?: number;
  itemWidth?: number;
  wrapperHeight?: number;
  wrapperColor?: string;
  // TODO: add proper type to `scrollViewComponent` prop
  // tried using ComponentType<ScrollViewProps & { ref: React.RefObject<ScrollView> }>
  // but ScrollView component from react-native-gesture=handler is not compatible with this.
  scrollViewComponent?: any;
};

export function ScrollPicker({
  itemHeight = 30,
  style,
  scrollViewComponent,
  date,
  ...props
}: ScrollPickerProps): JSX.Element {
  const [initialized, setInitialized] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    props.selectedIndex && props.selectedIndex >= 0 ? props.selectedIndex : 0,
  );
  const sView = useRef<ScrollView>(null);
  const [isScrollTo, setIsScrollTo] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  const [momentumStarted, setMomentumStarted] = useState(false);
  const [timer, setTimer] = useState(null);

  const wrapperHeight =
    props.wrapperHeight ||
    (isViewStyle(style) && isNumeric(style.height)
      ? Number(style.height)
      : 0) ||
    itemHeight * 5;

  useEffect(
    function initialize() {
      if (initialized) {
        return;
      }
      setInitialized(true);

      setTimeout(() => {
        const y = itemHeight * selectedIndex;
        sView?.current?.scrollTo({y: y});
      }, 0);

      return () => {
        timer && clearTimeout(timer);
      };
    },
    [initialized, itemHeight, selectedIndex, sView, timer],
  );

  const renderPlaceHolder = () => {
    const h = (wrapperHeight - itemHeight) / 2;
    const header = <View style={{height: h, flex: 1}} />;
    const footer = <View style={{height: h, flex: 1}} />;
    return {header, footer};
  };

  const renderItem = (
    data: ScrollPickerProps['dataSource'][0],
    index: number,
  ) => {
    const isSelected = index === selectedIndex;
    let item;
    if (date) {
      item = (
        <Text
          numberOfLines={1}
          allowFontScaling={false}
          style={isSelected ? styles.itemTextSelected : styles.itemText}>
          {dayjs(data).locale('id').format('ddd, DD MMM')}
        </Text>
      );
    } else {
      item = (
        <Text
          numberOfLines={1}
          allowFontScaling={false}
          style={isSelected ? styles.itemTextSelected : styles.itemText}>
          {data}
        </Text>
      );
    }

    return (
      <View
        style={[
          styles.itemWrapper,
          {height: itemHeight, width: props.itemWidth},
        ]}
        key={index}>
        {item}
      </View>
    );
  };
  const scrollFix = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      let y = 0;
      const h = itemHeight;
      if (e.nativeEvent.contentOffset) {
        y = e.nativeEvent.contentOffset.y;
      }
      const _selectedIndex = Math.round(y / h);

      const _y = _selectedIndex * h;
      if (_y !== y) {
        // using scrollTo in ios, onMomentumScrollEnd will be invoked
        if (Platform.OS === 'ios') {
          setIsScrollTo(true);
        }
        sView?.current?.scrollTo({y: _y});
      }
      if (selectedIndex === _selectedIndex) {
        return;
      }
      // onValueChange
      if (props.onValueChange) {
        const selectedValue = props.dataSource[_selectedIndex];
        setSelectedIndex(_selectedIndex);
        props.onValueChange(selectedValue, _selectedIndex);
      }
    },
    [itemHeight, props, selectedIndex],
  );

  const onScrollBeginDrag = () => {
    setDragStarted(true);

    if (Platform.OS === 'ios') {
      setIsScrollTo(false);
    }
    timer && clearTimeout(timer);
  };

  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setDragStarted(false);

    // if not used, event will be garbaged
    const _e: NativeSyntheticEvent<NativeScrollEvent> = {...e};
    timer && clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        if (!momentumStarted) {
          scrollFix(_e);
        }
      }, 50),
    );
  };
  const onMomentumScrollBegin = () => {
    setMomentumStarted(true);
    timer && clearTimeout(timer);
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setMomentumStarted(false);

    if (!isScrollTo && !dragStarted) {
      scrollFix(e);
    }
  };

  const {header, footer} = renderPlaceHolder();
  // const highlightWidth = (isViewStyle(style) ? style.width : 0) || deviceWidth;
  const highlightColor = '#FFFFFF';
  const highlightBorderWidth =
    props.highlightBorderWidth || StyleSheet.hairlineWidth;

  const wrapperStyle: ViewStyle = {
    height: wrapperHeight,
    flex: 1,
    backgroundColor: props.wrapperColor || '#fafafa',
    overflow: 'hidden',
  };

  const highlightStyle: ViewStyle = {
    position: 'absolute',
    top: (wrapperHeight - itemHeight) / 2,
    height: itemHeight,
    width: props.width || 100,
    backgroundColor: '#EFF7FF',
    borderTopColor: highlightColor,
    borderTopLeftRadius: props.borderRadiusLeft,
    borderBottomLeftRadius: props.borderRadiusLeft,
    borderTopRightRadius: props.borderRadiusRight,
    borderBottomRightRadius: props.borderRadiusRight,
    borderBottomColor: highlightColor,
    borderTopWidth: highlightBorderWidth,
    borderBottomWidth: highlightBorderWidth,
  };

  const CustomScrollViewComponent = scrollViewComponent || ScrollView;

  return (
    <View style={wrapperStyle}>
      <View style={highlightStyle} />
      <CustomScrollViewComponent
        ref={sView}
        bounces={false}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        onMomentumScrollBegin={(_e: any) => onMomentumScrollBegin()}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          onMomentumScrollEnd(e)
        }
        onScrollBeginDrag={(_e: any) => onScrollBeginDrag()}
        onScrollEndDrag={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          onScrollEndDrag(e)
        }>
        {header}
        {props.dataSource.map(renderItem)}
        {footer}
      </CustomScrollViewComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: '#999',
    fontFamily: 'Poppins-Regular',
  },
  itemTextSelected: {
    color: '#0055B8',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
});
