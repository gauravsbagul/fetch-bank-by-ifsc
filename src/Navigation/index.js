import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { Icon } from 'native-base';
import React from 'react';
import { FavouriteBanks, SearchBank, Splash } from '../Screens';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  cardStyle: {
    backgroundColor: 'transparent', // prevent white flash on Android
  },
  headerShown: false,
};

// Tab Navigation
const Tab = createBottomTabNavigator();
const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          switch (route.name) {
            case 'SearchBank':
              return <FontAwesome name={'bank'} size={30} color={color} />;
            case 'FavouriteBanks':
              return (
                <MaterialIcons
                  name={focused ? 'favorite' : 'favorite-border'}
                  size={30}
                  color={color}
                />
              );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: 'grey',
        showLabel: false,
        tabStyle: {
          backgroundColor: '#fff',
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'flex-start',
        },
      }}>
      <Tab.Screen name="SearchBank" component={SearchBank} />
      <Tab.Screen name="FavouriteBanks" component={FavouriteBanks} />
    </Tab.Navigator>
  );
};

// Root Stacks
const RootStack = createStackNavigator();

const RootStackNav = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          ...screenOptions,
        }}>
        <RootStack.Screen name="Splash" component={Splash} />
        <RootStack.Screen name="TabNav" component={TabNav} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNav;
