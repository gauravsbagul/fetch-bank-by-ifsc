/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { DetailsRow } from './DetailsRow';

export const Details = ({ bankDetailsByIfsc }) => {
  const {
    ADDRESS,
    BANK,
    BANKCODE,
    BRANCH,
    CENTRE,
    CITY,
    CONTACT,
    IFSC,
    MICR,
  } = bankDetailsByIfsc;
  return (
    <>
      <DetailsRow title={'ADDRESS'} detail={ADDRESS} />
      <DetailsRow title={'BANK'} detail={BANK} />
      <DetailsRow title={'BANKCODE'} detail={BANKCODE} />
      <DetailsRow title={'BRANCH'} detail={BRANCH} />
      <DetailsRow title={'CENTRE'} detail={CENTRE} />
      <DetailsRow title={'CITY'} detail={CITY} />
      <DetailsRow title={'CONTACT'} detail={CONTACT} />
      <DetailsRow title={'IFSC'} detail={IFSC} />
      <DetailsRow title={'MICR'} detail={MICR} />
      <DetailsRow title={'MICR CODE'} detail={bankDetailsByIfsc['MICR CODE']} />
    </>
  );
};
