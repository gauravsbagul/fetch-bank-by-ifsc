/* eslint-disable react-native/no-inline-styles */
import {
  Container,
  Input,
  Content,
  Button,
  Text,
  View,
  Row,
} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { fetchBankByIFSC } from '../../Redux/actions';

import { Details } from './Details';
import { Error } from './Error';

const initialSatte = {
  searchQuery: '',
  isError: false,
  errorMessage: '',
  bankDetailsByIfsc: null,
  isLoading: false,
};

class SearchBank extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialSatte };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      'SearchBank -> getDerivedStateFromProps -> nextProps',
      nextProps,
    );

    var newState = prevState;
    if (nextProps.navigation.isFocused()) {
      if (nextProps.bankDetails?.response) {
        if (nextProps.bankDetails?.error) {
          newState.isError = true;
          newState.errorMessage = nextProps.bankDetails?.response;
          newState.bankDetailsByIfsc = null;
          newState.isLoading = false;
        } else if (!nextProps.bankDetails?.error) {
          newState.isError = false;
          newState.errorMessage = '';
          newState.isLoading = false;
          newState.bankDetailsByIfsc = nextProps.bankDetails?.response;
        }
      }
    }
    return newState === prevState ? null : newState;
  }

  onSearch = () => {
    const { searchQuery } = this.state;
    if (searchQuery.trim()) {
      this.setState({ isLoading: true, ...initialSatte });
      this.props.fetchBankByIFSC(searchQuery);
    }
  };

  onReset = () => {
    this.setState({
      ...initialSatte,
    });
  };

  render() {
    const { bankDetailsByIfsc, isError, errorMessage, isLoading } = this.state;

    return (
      <>
        <Container style={styles.container}>
          <Content>
            <Input
              placeholder="Enter IFSC"
              onChangeText={(searchQuery) => this.setState({ searchQuery })}
              value={this.state.searchQuery}
              keyboardType="default"
              returnKeyType="next"
              style={styles.input}
              placeholderTextColor={'#000'}
            />
            <Button
              rounded
              style={styles.button}
              onPress={() => this.onSearch()}>
              {isLoading ? (
                <ActivityIndicator color={'#000'} />
              ) : (
                <Text>Search</Text>
              )}
            </Button>
            {isError ? (
              <Error onReset={this.onReset} errorMessage={errorMessage} />
            ) : (
              <Details bankDetailsByIfsc={bankDetailsByIfsc} />
            )}
          </Content>
        </Container>
      </>
    );
  }
}
const mapStateToProps = ({ bank }) => {
  const { bankDetails } = bank;
  return {
    bankDetails,
  };
};

const mapDispatchToProps = {
  fetchBankByIFSC,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBank);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: 150,
    justifyContent: 'center',
  },
});
