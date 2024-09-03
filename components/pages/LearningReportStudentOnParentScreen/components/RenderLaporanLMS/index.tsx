/* eslint-disable react-hooks/exhaustive-deps */
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconUjian from '@assets/svg/ic20_ujian.svg';
import IconTugas from '@assets/svg/ic24_PR.svg';
import IconLatihan from '@assets/svg/Latihan.svg';
import {CardLMS} from '../CardLMS';
import {IStudentReportExam} from 'type/student-report-exam';
import {IStudentReportTask} from 'type/student-report-task';
import {IStudentReportAkm} from 'type/student-report-akm';
import apiWithoutToken from '@api/withoutToken';

const RenderLaporanLMS = ({data}: any) => {
  const [ujian, setUjian] = useState<IStudentReportExam>();
  const [task, setTask] = useState<IStudentReportTask>();
  const [akm, setAkm] = useState<IStudentReportAkm>();

  const fetchUjian = async () => {
    try {
      const res = await apiWithoutToken.get(
        '/lms/v1/student-report/exam?subject=',
        {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
          },
        },
      );
      if (res?.data?.code === 100) {
        return setUjian(res?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  const fetchTask = async () => {
    try {
      const res = await apiWithoutToken.get('/lms/v1/student-report/task', {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      });
      if (res?.data?.code === 100) {
        return setTask(res?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  const fetchAkm = async () => {
    try {
      const res = await apiWithoutToken.get('/lms/v1/student-report/akm', {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      });
      if (res?.data?.code === 100) {
        return setAkm(res?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    fetchUjian();
    fetchAkm();
    fetchTask();
  }, []);

  return (
    <View>
      <CardLMS
        label={'Ujian'}
        value={ujian?.total_exam || 0}
        img={<IconUjian width={24} height={24} />}
      />
      <CardLMS
        label={'Tugas dikerjakan'}
        value={task?.task_done || 0}
        img={<IconTugas width={24} height={24} />}
      />
      <CardLMS
        label={'paket soal AKM'}
        value={akm?.akm_done || 0}
        img={<IconLatihan width={24} height={24} />}
      />
    </View>
  );
};

export {RenderLaporanLMS};
