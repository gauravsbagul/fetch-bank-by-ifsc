/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const FavouriteBankCard = ({ item, removeFromFavourite }) => {
  const { BANK, BRANCH, IFSC } = item;
  return (
    <View style={styles.card}>
      <View style={{ width: '90%' }}>
        <Text>
          {BANK} {BRANCH} {IFSC}
        </Text>
      </View>
      <TouchableOpacity onPress={() => removeFromFavourite(item)}>
        <FontAwesome name={'trash'} size={25} color={'red'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: '#eee',
    borderRadius: 30,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
