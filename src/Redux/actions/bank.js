import axios from 'axios';
import { Alert } from 'react-native';
import { ACTION_TYPE } from '../../Helpers/constants';

const url = 'https://ifsc.razorpay.com/';

// To fetch bank by IFSC Id
export const fetchBankByIFSC = (ifsc) => async (dispatch) => {
  const body = {
    method: 'GET',
    url: url + ifsc,
  };
  try {
    const response = await axios(body);

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

// To Reset Bank Details props
export const resetbankDetailsProps = () => async (dispatch) => {
  dispatch({
    type: ACTION_TYPE.GET_BANK_DETAILS,
    payload: { response: undefined, error: false },
  });
};

// To add bank to my favourite list
export const addToFavourite = (bankDetails) => async (dispatch, getState) => {
  try {
    const { bank } = getState();
    var { favouriteBanks } = bank;
    var index;
    if (Array.isArray(favouriteBanks.response)) {
      index = favouriteBanks.response.findIndex(
        (item) => item.IFSC == bankDetails.IFSC,
      );
    }
    if (index == undefined || favouriteBanks.response.length == 0) {
      dispatch({
        type: ACTION_TYPE.MARK_AS_FAVOURITE,
        payload: {
          response: [bankDetails],
          error: false,
        },
      });
    } else if (Array.isArray(favouriteBanks.response) && index < 0) {
      Alert.alert('', 'Marked as favourite', [{ text: 'OK' }], {
        cancelable: false,
      });
      dispatch({
        type: ACTION_TYPE.MARK_AS_FAVOURITE,
        payload: {
          response: [...favouriteBanks?.response, bankDetails],
          error: false,
        },
      });
    } else {
      Alert.alert('', 'Alredy Marked as favoutite', [{ text: 'OK' }], {
        cancelable: false,
      });
      dispatch({
        type: ACTION_TYPE.MARK_AS_FAVOURITE,
        payload: {
          response: [...favouriteBanks?.response],
          error: true,
        },
      });
    }
  } catch (error) {
    Alert.alert('', 'Something Went wrong', [{ text: 'OK' }], {
      cancelable: false,
    });
    dispatch({
      type: ACTION_TYPE.MARK_AS_FAVOURITE,
      payload: { response: [...favouriteBanks?.response], error: true },
    });
  }
};

export const removeFromFavourite = (deleteBank) => async (
  dispatch,
  getState,
) => {
  try {
    const { bank } = getState();
    var { favouriteBanks } = bank;

    var filteredArray = favouriteBanks?.response.filter(
      (element) => element.IFSC !== deleteBank.IFSC,
    );
    dispatch({
      type: ACTION_TYPE.MARK_AS_FAVOURITE,
      payload: { response: [...filteredArray], error: false },
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPE.MARK_AS_FAVOURITE,
      payload: { response: [...favouriteBanks?.response], error: true },
    });
  }
};
