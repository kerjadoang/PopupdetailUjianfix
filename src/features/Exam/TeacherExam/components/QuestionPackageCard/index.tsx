import React, {ReactNode, useState} from 'react';
import styles from './styles';
import {Button, CardWrapper, Chevron, PoppinsText} from '@components/atoms';
import {View} from 'react-native';

type Props = {
  HeaderComponent: ReactNode;
  title?: string;
  isCollapse?: boolean;
  onCollapseChange?: CallBackWithParams<void, any>;
  isSelected?: boolean;
  onSelectedChange?: CallBackWithParams<void, any>;
  nextStep: () => void;
  prevStep: () => void;
};

const QuestionPackageCard = ({
  HeaderComponent,
  // nextStep,
  // prevStep,
  title = '',
  isCollapse = false,
  isSelected = false,
}: Props) => {
  const [isPackageCollapse, _] = useState(isCollapse);
  const [isPackageSelected, setIsPackageSelected] = useState(isSelected);

  return (
    <CardWrapper style={styles.cardWrapperContainer}>
      {HeaderComponent}
      <View style={styles.headerContainer}>
        <PoppinsText style={styles.headerTitle} type="SemiBoldPoppins">
          {title}
        </PoppinsText>
        <View style={styles.headerRightContainer}>
          <Button
            label="Gunakan"
            fontSize={14}
            outline={!isPackageSelected}
            style={styles.headerUseButton}
            action={() => setIsPackageSelected(!isPackageSelected)}
          />
          <Chevron isCollapse={isPackageCollapse} />
        </View>
      </View>
    </CardWrapper>
  );
};

export {QuestionPackageCard};
