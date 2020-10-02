/* eslint-disable react-native/no-inline-styles */
import { Button, Container, Content, Input, Text } from 'native-base';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import {
  addToFavourite,
  fetchBankByIFSC,
  resetbankDetailsProps,
} from '../../Redux/actions';
import { Details } from './Details';
import { Error } from './Error';
import { isIos } from '../../Helpers';
const initialSatte = {
  searchQuery: '',
  isError: false,
  errorMessage: '',
  bankDetailsByIfsc: null,
  isLoading: false,
  markedAsFavourite: false,
};

class SearchBank extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialSatte };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var newState = prevState;
    if (nextProps.navigation.isFocused()) {
      if (nextProps.bankDetails?.response) {
        if (nextProps.bankDetails?.error) {
          newState.isError = true;
          newState.errorMessage = nextProps.bankDetails?.response;
          newState.bankDetailsByIfsc = null;
          newState.isLoading = false;
          newState.markedAsFavourite = false;
        } else if (!nextProps.bankDetails?.error) {
          if (
            nextProps.bankDetails?.IFSC !== newState.bankDetailsByIfsc?.IFSC
          ) {
            newState.isLoading = false;
          }

          newState.isError = false;
          newState.errorMessage = '';

          newState.bankDetailsByIfsc = nextProps.bankDetails?.response;
          newState.markedAsFavourite = false;
        }
      }
    }
    return newState === prevState ? null : newState;
  }

  _onSearch = () => {
    const { searchQuery } = this.state;
    if (searchQuery.trim()) {
      this.setState({ ...initialSatte, isLoading: true });
      this.props.fetchBankByIFSC(searchQuery);
    }
  };

  _onReset = () => {
    this.props.resetbankDetailsProps();
    this.setState({
      ...initialSatte,
    });
  };

  _addToFavourite = () => {
    this.props.addToFavourite(this.state.bankDetailsByIfsc);
  };

  render() {
    const {
      bankDetailsByIfsc,
      isError,
      errorMessage,
      isLoading,
      markedAsFavourite,
    } = this.state;

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
              onPress={() => this._onSearch()}>
              {isLoading ? (
                <ActivityIndicator color={'#000'} />
              ) : (
                <Text>Search</Text>
              )}
            </Button>
            {isError ? (
              <Error
                onReset={this._onReset}
                errorMessage={errorMessage}
                buttonText={'Reset'}
              />
            ) : bankDetailsByIfsc ? (
              <>
                <Details bankDetailsByIfsc={bankDetailsByIfsc} />
                <Button
                  rounded
                  style={styles.button}
                  disabled={markedAsFavourite}
                  onPress={() => this._addToFavourite()}>
                  <Text>
                    {markedAsFavourite ? 'Favourite' : 'Add to Favourite'}
                  </Text>
                </Button>
              </>
            ) : null}
          </Content>
        </Container>
      </>
    );
  }
}
const mapStateToProps = ({ bank }) => {
  const { bankDetails, favouriteBanks } = bank;
  return {
    bankDetails,
    favouriteBanks,
  };
};

const mapDispatchToProps = {
  fetchBankByIFSC,
  addToFavourite,
  resetbankDetailsProps,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBank);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    marginTop: isIos(20, StatusBar.currentHeight + 10),
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
//ADCB0000001
//HDFC0000039
//HDFC0009077
//CBIN0281400
