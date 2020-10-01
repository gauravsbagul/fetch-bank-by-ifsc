/* eslint-disable react-native/no-inline-styles */
import { Container, Text, View } from 'native-base';
import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { removeFromFavourite } from '../../Redux/actions';
import { FavouriteBankCard } from './FavouriteBankCard';
class FavouriteBanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteBanksArray: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var newState = prevState;

    newState.favouriteBanksArray = nextProps.favouriteBanks?.response;

    return newState === prevState ? null : newState;
  }

  _removeFromFavourite = (item) => {
    this.props.removeFromFavourite(item);
  };

  render() {
    const { favouriteBanksArray } = this.state;

    return (
      <>
        <Container style={styles.container}>
          <FlatList
            keyboardShouldPersistTaps={'always'}
            style={{ paddingHorizontal: 10 }}
            data={[...favouriteBanksArray]}
            ListEmptyComponent={() => (
              <View>
                <Text>Empty data</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <FavouriteBankCard
                item={item}
                removeFromFavourite={this._removeFromFavourite}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
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
  removeFromFavourite,
};
export default connect(mapStateToProps, mapDispatchToProps)(FavouriteBanks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
