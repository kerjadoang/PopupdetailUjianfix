import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import dayjs from 'dayjs';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useSelector} from 'react-redux';

interface RootState {
  getUser: any;
}

const useAdministrativeReport = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'AdministrativeReportScreen'>
    >();
  const isFocused = useIsFocused();

  const {getUser} = useSelector((state: RootState) => state);

  const school_id = getUser?.data?.school_id ?? 11;
  const degree_id = getUser?.data?.school?.degree_id;

  //get current monthYear
  const currentDate = dayjs();
  const currentMonthString = currentDate.format('MMMM YYYY');

  const [page, setPage] = useState(0);

  const [selected, setSelected] = useState([]);
  const [filterSchoolYear, setFilterSchoolYear] = useState<any>(null);
  const [filterMonth, setFilterMonth] = useState<any>(null);
  const [filterClass, setFilterClass] = useState<any>(null);

  //data filter
  const [classes, setClasses] = useState<any>(null);
  const [monthYear, setMonthYear] = useState<any>(null);
  const [year, setYear] = useState<any>(null);

  const [isShowSchoolYearFilter, setIsShowSchoolYearFilter] =
    useState<boolean>(false);
  const [isShowMonthFilter, setIsShowMonthFilter] = useState<boolean>(false);
  const [isShowClassFilter, setIsShowClassFilter] = useState<boolean>(false);

  const [expanded, setExpanded] = useState(false);

  //fetching data
  const [initData, setInitData] = useState<any>({});
  const [data, setData] = useState<any>({});
  const [academicYearId, setAcademicYearId] = useState<number>(0);

  const schoolYearName = `Tahun ${filterSchoolYear?.years?.split('/')[0]} - ${
    filterSchoolYear?.years?.split('/')[1]
  }`;
  const initYearName = `Tahun ${initData?.years?.split('/')[0]} - ${
    initData?.years?.split('/')[1]
  }`;

  const buttonCategory = [
    {
      id: 1,
      name: initYearName ?? 'Tahun - ',
      value:
        filterSchoolYear !== null &&
        filterSchoolYear?.years?.split('/')[0] !== undefined
          ? schoolYearName
          : initData?.years?.split('/')[0] !== undefined
          ? initYearName
          : 'Semua Tahun Ajaran',
      onPress: () => {
        setIsShowSchoolYearFilter(true);
      },
      isSelected:
        filterSchoolYear !== null && filterSchoolYear?.length !== 0
          ? true
          : false,
    },
    {
      id: 2,
      name: currentMonthString,
      value:
        filterMonth?.length === 0
          ? null
          : filterMonth?.length < 2
          ? filterMonth?.map((obj: any) => obj?.name)
          : filterMonth?.length <= monthYear?.length
          ? `${dayjs(filterMonth[0].month_year_number).format('MMMM YYYY')} -
              ${dayjs(
                filterMonth[filterMonth.length - 1].month_year_number,
              ).format('MMMM YYYY')}`
          : currentMonthString,
      onPress: () => {
        setIsShowMonthFilter(true);
      },
      isSelected:
        filterMonth !== null && filterMonth?.length !== 0 ? true : false,
    },
    {
      id: 3,
      name: 'Semua Kelas',
      value:
        filterClass?.length === 0
          ? null
          : filterClass?.length < 2
          ? filterClass?.map((obj: any) => obj.name).toString()
          : filterClass?.length < classes?.length
          ? filterClass.length.toString() + ' Kelas'
          : 'Semua Kelas',
      onPress: () => {
        setIsShowClassFilter(true);
      },
      isSelected:
        filterClass !== null && filterClass?.length !== 0 ? true : false,
    },
  ];

  const getInitData = async () => {
    const res = await api.get(
      URL_PATH.get_ongoing_administrative_report(school_id),
    );
    if (res?.status === 200) {
      setInitData(res?.data?.data);
      setAcademicYearId(res?.data?.data?.id);
    }
    const resAll = await api.get(
      URL_PATH.get_all_administrative_report(school_id),
    );
    if (resAll?.status === 200) {
      const getYear = resAll?.data?.data;
      setYear(getYear);
    }
    const resClass = await api.get(URL_PATH.get_class_by_degree(degree_id));
    if (resClass?.status === 200) {
      setClasses(resClass?.data?.data);
    }
  };

  const getListMonthYear = async () => {
    const resMonth = await api.get(
      URL_PATH.get_month_year(
        filterSchoolYear ? filterSchoolYear?.id : academicYearId,
      ),
    );
    if (resMonth?.status === 200) {
      const monthData = resMonth?.data?.data?.map((obj: any) => {
        return {
          name: obj?.month_year,
          month_year_number: obj?.month_year_number,
        };
      });

      setMonthYear(monthData);
      setFilterMonth(null);
    }
  };

  useEffect(() => {
    if (academicYearId) {
      getListMonthYear();
    }
  }, [academicYearId, filterSchoolYear]);

  const getOngoingData = async () => {
    const date = dayjs();
    const yearMonth = date.format('YYYY-MM');
    const params = {
      year_month: yearMonth,
      class_id: '',
      academic_year_id: initData?.academic_phase[0]?.academic_year_id,
    };
    const res = await api.get(URL_PATH.get_administrative_report, {params});

    if (res?.status === 200) {
      setData(res?.data?.data);
    }
  };

  const getData = async (month: any, classes: any, year: any) => {
    const params = {
      start_year_month: month ? month[0]?.month_year_number : '',
      end_year_month: month ? month[month?.length - 1]?.month_year_number : '',
      class_id: classes?.map((obj: any) => obj?.id)?.toString() ?? '',
      academic_year_id: year?.id ?? '',
    };
    const res = await api.get(URL_PATH.get_administrative_report, {params});
    if (res?.status === 200) {
      setData(res?.data?.data);
    }
  };

  useEffect(() => {
    getData(filterMonth, filterClass, filterSchoolYear);
  }, [selected]);

  useLayoutEffect(() => {
    // dispatch(fetchGetUser());
    getInitData();
  }, []);

  useEffect(() => {
    if (initData && isFocused) {
      getOngoingData();
    }
  }, [initData, isFocused]);

  return {
    navigation,
    buttonCategory,
    filterClass,
    filterMonth,
    filterSchoolYear,
    setFilterClass,
    setFilterMonth,
    setFilterSchoolYear,
    isShowClassFilter,
    isShowMonthFilter,
    isShowSchoolYearFilter,
    setIsShowClassFilter,
    setIsShowMonthFilter,
    setIsShowSchoolYearFilter,
    classes,
    setClasses,
    selected,
    setSelected,
    page,
    setPage,
    expanded,
    setExpanded,

    data,
    monthYear,
    year,
  };
};
export default useAdministrativeReport;
