/* eslint-disable react-native/no-inline-styles */
import { Container, Input } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class FavouriteBanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  render() {
    const {} = this.state;

    return (
      <>
        <Container style={styles.container}>
          <Input
            placeholder="Username"
            onChangeText={(searchQuery) => this.setState({ searchQuery })}
            value={this.state.searchQuery}
            keyboardType="default"
            returnKeyType="next"
            style={styles.input}
            placeholderTextColor={'#000'}
          />
        </Container>
      </>
    );
  }
}
const mapStateToProps = ({ bank }) => {
  console.log('mapStateToProps -> bank', bank);
  return {};
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(FavouriteBanks);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
