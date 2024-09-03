import React, {ReactElement} from 'react';
import {ViewStyle} from 'react-native';
import SkeletonPlaceholder, {
  SkeletonPlaceholderItemProps,
  SkeletonPlaceholderProps,
} from 'react-native-skeleton-placeholder';

type SkeletonProps = {
  loading: boolean;
  children: React.ReactNode;
  itemProps?: ViewStyle[];
  customSkeletonItem?: ReactElement;
} & Omit<SkeletonPlaceholderProps, 'children'>;

const Skeleton: React.FC<SkeletonProps> & {
  Item: React.FC<SkeletonPlaceholderItemProps>;
} = ({loading, children, itemProps, customSkeletonItem, ...props}) => {
  const renderSkeletonItem: () => any = () => {
    return itemProps?.map((props, index) => (
      <SkeletonPlaceholder.Item {...props} key={index} />
    ));
  };

  if (loading) {
    return (
      <SkeletonPlaceholder {...props}>
        {customSkeletonItem || renderSkeletonItem()}
      </SkeletonPlaceholder>
    );
  }

  return <>{children}</>;
};

Skeleton.Item = ({...props}) => {
  return (
    <SkeletonPlaceholder.Item {...props}>
      {props.children}
    </SkeletonPlaceholder.Item>
  );
};

export default Skeleton;
