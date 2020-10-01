/* eslint-disable react/react-in-jsx-scope */
import { Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import React from 'react';

export const DetailsRow = ({ title, detail }) => {
  return (
    <View style={styles.rowWrapper}>
      <View style={styles.titleWrapper}>
        <Text>{title}</Text>
      </View>
      <View style={{ width: '45%' }}>
        <Text style={styles.detail}>{detail}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#bbb',
  },
  titleWrapper: {
    width: '25%',
  },
  detailWrapper: {
    width: '60%',
  },
  detail: {
    textAlign: 'right',
  },
});
