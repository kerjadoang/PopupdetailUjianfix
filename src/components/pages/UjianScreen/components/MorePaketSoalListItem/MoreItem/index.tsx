import React, {FC, ReactElement} from 'react';
import {
  MainView,
  MainText,
  CheckboxInput,
  CheckboxInputProps,
} from '@components/atoms';

export type MoreItemProps = {
  id: number;
  icon: ReactElement;
  text: string;
} & CheckboxInputProps;

const MoreItem: FC<MoreItemProps> = ({icon, text, ...props}) => {
  return (
    <MainView
      flexDirection="row"
      gap={4}
      alignItems="center"
      justifyContent="space-between">
      <MainView flexDirection="row" alignItems="center" gap={6}>
        {icon}
        <MainText>{text}</MainText>
      </MainView>
      <CheckboxInput
        checkboxHeight={18}
        checkboxWidth={18}
        containerStyle={{
          flex: undefined,
          marginLeft: 4,
        }}
        {...props}
      />
    </MainView>
  );
};

export default MoreItem;
