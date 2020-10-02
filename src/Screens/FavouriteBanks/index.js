/* eslint-disable react-native/no-inline-styles */
import { Container } from 'native-base';
import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { removeFromFavourite } from '../../Redux/actions';
import { Error } from '../SearchBank/Error';
import { FavouriteBankCard } from './FavouriteBankCard';
class FavouriteBanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteBanksArray: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var newState = prevState;

    newState.favouriteBanksArray = nextProps.favouriteBanks?.response || [];

    return newState === prevState ? null : newState;
  }

  _removeFromFavourite = (item) => {
    this.props.removeFromFavourite(item);
  };

  _onReset = () => {
    this.props.navigation.navigate('SearchBank');
  };

  render() {
    const { favouriteBanksArray } = this.state;

    return (
      <Container style={styles.container}>
        <FlatList
          style={{ paddingHorizontal: 10 }}
          data={[...favouriteBanksArray]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item, index }) => (
            <FavouriteBankCard
              item={item}
              removeFromFavourite={this._removeFromFavourite}
            />
          )}
          ListEmptyComponent={() => (
            <Error
              onReset={this._onReset}
              errorMessage={'No bank Listed'}
              buttonText={'Go to search'}
            />
          )}
        />
      </Container>
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
  removeFromFavourite,
};
export default connect(mapStateToProps, mapDispatchToProps)(FavouriteBanks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
