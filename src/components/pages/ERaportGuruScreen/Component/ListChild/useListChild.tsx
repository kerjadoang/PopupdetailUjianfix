import {isStringContains} from '@constants/functional';
import {useEffect, useState} from 'react';

export const useListChild = (childList: any[]) => {
  const [tempChildList, setTempChildList] = useState<any[]>([]);
  const [activeStatusData, setActiveStatusData] = useState<any[]>([]);
  const [isFilterStatusOpen, setIsFilterStatusOpen] = useState(false);
  const filterStudent = (text: string) => {
    setTempChildList(
      childList.filter((value: any) =>
        isStringContains(value.user.full_name, text),
      ),
    );
  };

  const onTerapkanFilterStatus = (data: any[]) => {
    setIsFilterStatusOpen(false);
    setActiveStatusData(data);
    const listStatusString = data.join(',');
    if (data.length < 1 || data.length > 1) {
      setTempChildList(childList);
      return;
    }
    if (isStringContains(listStatusString, 'sudah dibagikan')) {
      setTempChildList(
        childList.filter(
          (value: any) => value.assessment_erapor_share_id !== 0,
        ),
      );
      return;
    }
    setTempChildList(
      childList.filter((value: any) => value.assessment_erapor_share_id === 0),
    );
  };

  const onAturUlangFilterStatus = () => {
    setActiveStatusData([]);
    setTempChildList(childList);
  };

  useEffect(() => {
    setTempChildList(childList);
  }, [childList]);
  return {
    tempChildList,
    activeStatusData,
    isFilterStatusOpen,
    setIsFilterStatusOpen,
    filterStudent,
    onTerapkanFilterStatus,
    onAturUlangFilterStatus,
  };
};
