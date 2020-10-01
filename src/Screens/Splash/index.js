/* eslint-disable react-native/no-inline-styles */
import { Container } from 'native-base';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

const Splash = (props) => {
  console.log('Splash -> props', props);

  useEffect(() => {
    setTimeout(() => {
      props.navigation.dispatch(StackActions.replace('TabNav'));
    }, 500);
    return () => {
      clearTimeout();
    };
  }, []);

  return (
    <>
      <Container style={styles.container}>
        <ActivityIndicator color={'#000'} />
      </Container>
    </>
  );
};
export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
