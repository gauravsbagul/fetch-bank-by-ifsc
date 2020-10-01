/* eslint-disable react/react-in-jsx-scope */
import { Text, View, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import React from 'react';

export const Error = ({ onReset, errorMessage }) => {
  return (
    <View style={styles.erorWrapper}>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Button rounded style={styles.button} onPress={() => onReset()}>
        <Text>Reset</Text>
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
