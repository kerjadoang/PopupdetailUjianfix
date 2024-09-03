import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {InputText} from '@components/atoms';
import Colors from '@constants/colors';
import {Control, Controller} from 'react-hook-form';
import {IMediaType} from '@api/types';
import FileCard from '../FileCard';

type Props = {
  control: Control<{score: string}>;
  studentTaskMedia?: IMediaType;
  formErrors?: any;
};

const InputScoreLkpd: FC<Props> = ({control, studentTaskMedia, formErrors}) => {
  return (
    <View style={styles.container}>
      <FileCard file={studentTaskMedia} />
      <Controller
        control={control}
        name="score"
        rules={{
          validate: value => {
            if (!value) {
              return 'Nilai wajib diisi.';
            }
            if (Number(value) > 100) {
              return 'Nilai tidak boleh lebih dari 100';
            }
          },
        }}
        render={({field: {onChange}}) => (
          <InputText
            label="Beri Nilai"
            top={10}
            placeholder="Masukkan Nilai"
            labelColor={Colors.dark.neutral100}
            backgroundColor={Colors.dark.neutral20}
            maxLength={undefined}
            errorMessage={formErrors?.score?.message}
            onChangeText={onChange}
            leftOnPressIcon={undefined}
            leftIconColor={Colors.primary.base}
            keyboardType="numeric"
            inputMode={undefined}
          />
        )}
      />
    </View>
  );
};

export default InputScoreLkpd;
