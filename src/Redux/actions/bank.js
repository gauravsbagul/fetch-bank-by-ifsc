import AsyncStorage from '@react-native-community/async-storage';
import { ACTION_TYPE } from '../../Helpers/constants';
import axios from 'axios';

const url = 'https://ifsc.razorpay.com/';

export const fetchBankByIFSC = (ifsc) => async (dispatch) => {
  const body = {
    method: 'GET',
    url: url + ifsc,
  };
  try {
    const response = await axios(body);
    console.log('fetchBankByIFSC -> response', response);

    if (response.status == 200 && typeof response.data == 'object') {
      dispatch({
        type: ACTION_TYPE.GET_BANK_DETAILS,
        payload: { response: response?.data, error: false },
      });
    } else {
      dispatch({
        type: ACTION_TYPE.GET_BANK_DETAILS,
        payload: { response: 'Something Went wrong', error: true },
      });
    }
  } catch (error) {
    dispatch({
      type: ACTION_TYPE.GET_BANK_DETAILS,
      payload: { response: error?.response?.data, error: true },
    });
  }
};
