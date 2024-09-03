import {useState} from 'react';
import {useSelector} from 'react-redux';

interface RootState {
  getUser: any;
}

const useGetFilteredData = () => {
  const {getUser} = useSelector((state: RootState) => state);

  const [selected, setSelected] = useState([]);

  const [status, setStatus] = useState([]);
  const [paymentFor, setPaymentFor] = useState([]);
  const [paymentForName, setPaymentForName] = useState([]);
  const [date, setDate] = useState('');

  return {
    status,
    paymentFor,
    setStatus,
    setPaymentFor,
    selected,
    setSelected,
    getUser,
    date,
    setDate,
    paymentForName,
    setPaymentForName,
  };
};

export default useGetFilteredData;
