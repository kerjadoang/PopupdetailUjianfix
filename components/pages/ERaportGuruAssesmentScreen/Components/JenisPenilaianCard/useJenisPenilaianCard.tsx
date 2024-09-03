import {useEffect, useState} from 'react';

export const useJenisPenilaianCard = (data: BasicCompetencyDetail[]) => {
  const [show, setShow] = useState({
    status: false,
    id: '',
  });
  const [tempData, setTempData] = useState<BasicCompetencyDetail[]>([]);

  useEffect(() => {
    if (tempData) {
      setTempData(data);
    }
    return () => {
      setTempData([]);
    };
  }, [data]);

  const _handlerOnCheck = (data: BasicCompetencyDetail) => {
    tempData.map(item => {
      if (item?.id === data.id) {
        item.choose = !item?.choose || false;
      }
    });
    setTempData([...tempData]);
  };
  const _handlerShow = (x: string) => {
    if (show?.status && show?.id === x) {
      return true;
    } else {
      false;
    }
  };
  const checkedItem: BasicCompetencyDetail[] = tempData.filter(
    (value: BasicCompetencyDetail) => value.choose,
  );
  let subItem =
    checkedItem
      ?.map((data: BasicCompetencyDetail) => 'KD ' + data?.no)
      .join(', ') || '-';

  const closeSwipeUp = () => setShow({...show, status: false, id: ''});
  const isButtonDisabled = tempData.filter(value => value.choose).length === 0;
  return {
    show,
    setShow,
    closeSwipeUp,
    _handlerOnCheck,
    _handlerShow,
    subItem,
    tempData,
    isButtonDisabled,
  };
};
