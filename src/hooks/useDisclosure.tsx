import {useCallback, useMemo, useState} from 'react';

//T = swipeupType
//U = swipeupData
interface IUseDisclosureProps<T = any, U = any> {
  isVisible?: boolean;
  type?: T;
  data?: U;
  currentData?: U;
}

export const useDisclosure = <T, U>(props?: IUseDisclosureProps) => {
  const [disclosure, setDisclosure] = useState<IUseDisclosureProps>({
    ...props,
    isVisible: props?.isVisible ?? false,
  });
  const type: T = useMemo(() => disclosure.type, [disclosure.type]);
  const data: U = useMemo(() => disclosure.data, [disclosure.data]);
  const isVisible = useMemo(() => disclosure.isVisible, [disclosure.isVisible]);
  const currentData: U = useMemo(
    () => disclosure.currentData,
    [disclosure.currentData],
  );

  const show = useCallback(
    (currentData?: T) =>
      setDisclosure(prevState => ({
        ...prevState,
        isVisible: true,
        data: currentData || prevState.data,
      })),
    [],
  );

  const hide = useCallback(() => {
    setDisclosure(prevState => ({
      ...prevState,
      isVisible: false,
      data: undefined,
      currentData: undefined,
    }));
  }, []);

  const toggle = useCallback(
    (newDisc?: Omit<IUseDisclosureProps<T, U>, 'isVisible'>) => {
      let resState: IUseDisclosureProps = {
        ...disclosure,
        ...newDisc,
        isVisible: !isVisible,
      };
      if (newDisc?.data) {
        // setData(newDisc?.data);
        resState = {
          ...resState,
          data: newDisc?.data,
        };
      }

      if (isVisible && newDisc?.data) {
        resState = {
          ...resState,
          data: undefined,
        };
      }
      setDisclosure(resState);
    },
    [disclosure, isVisible],
  );

  const setType = useCallback((type: T) => {
    setDisclosure(prevState => ({
      ...prevState,
      type,
    }));
  }, []);

  const setData = useCallback((data: U) => {
    setDisclosure(prevState => ({
      ...prevState,
      data,
    }));
  }, []);

  const setCurrentData = useCallback((currentData: U) => {
    setDisclosure(prevState => ({
      ...prevState,
      currentData,
    }));
  }, []);

  return {
    isVisible,
    show,
    hide,
    toggle,
    type,
    setType,
    data,
    setData,
    currentData,
    setCurrentData,
  };
};
