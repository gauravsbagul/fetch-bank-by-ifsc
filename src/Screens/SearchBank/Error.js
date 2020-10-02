/* eslint-disable react/react-in-jsx-scope */
import { Button, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export const Error = ({ onReset, errorMessage, buttonText }) => {
  return (
    <View style={styles.erorWrapper}>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Button rounded style={styles.button} onPress={() => onReset()}>
        <Text>{buttonText}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  erorWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: 150,
    justifyContent: 'center',
  },
});
