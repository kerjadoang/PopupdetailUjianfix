/* eslint-disable react-hooks/exhaustive-deps */
import {Button, InputText, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import {useCreatePaketSoalUjian} from '@services/lms';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, Text} from 'react-native';

type CreatePaketSoalProps = {
  class_id: any;
  subject_id: any;
  chapter_id: any;
  onSuccessCreate?: (packageId: any) => void;
} & SwipeUpProps;

const CreatePaketSoal: React.FC<CreatePaketSoalProps> = props => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: {errors},
  } = useForm<{name: ''}>({
    defaultValues: {
      name: '',
    },
  });
  const {mutate} = useCreatePaketSoalUjian();

  const onSubmit = async (data: any) => {
    mutate({
      name: data.name,
      class_id: props.class_id,
      chapter_id: props.chapter_id,
      subject_id: props.subject_id,
    })
      .then((res: any) => {
        props.onSuccessCreate?.(res?.data?.id ?? 0);
        reset();
      })
      .catch(e => {
        setError('name', {
          type: 'required',
          message: e?.response?.data?.message ?? 'Terjadi Kesalahan',
        });
      });
  };

  const watchName = watch('name');

  useEffect(() => {
    if (props.visible) {
      reset();
    }
  }, [props.visible]);

  return (
    <SwipeUp {...props}>
      <View style={{padding: 16, gap: 16}}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            color: Colors.dark.neutral100,
            textAlign: 'center',
          }}>
          Tambah Paket Soal
        </Text>
        <Controller
          name="name"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputText
              label="Judul Paket Soal"
              placeholder="Masukkan Judul Paket Soal"
              backgroundColor={Colors.dark.neutral10}
              value={value}
              onChangeText={onChange}
              error={!!errors?.name?.message}
              errorMessage={
                errors.name?.message
                  ? 'Sudah ada paket soal dengan judul yang sama. Silakan gunakan judul lain.'
                  : ''
              }
            />
          )}
        />
        <Button
          action={handleSubmit(onSubmit)}
          label="Simpan"
          isDisabled={!watchName}
        />
      </View>
    </SwipeUp>
  );
};

export default CreatePaketSoal;
