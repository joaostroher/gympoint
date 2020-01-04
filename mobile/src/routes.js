import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '~/styles/theme';
import Header from '~/components/Header';

import Sign from '~/pages/Sign';
import CheckIn from '~/pages/CheckIn';
import HelpOrder from '~/pages/HelpOrder';
import HelpOrderDetail from '~/pages/HelpOrderDetail';
import HelpOrderNew from '~/pages/HelpOrderNew';

const HelpOrderSwitch = createStackNavigator(
  {
    HelpOrder,
    HelpOrderDetail,
    HelpOrderNew,
  },
  {
    headerMode: 'none',
  }
);

HelpOrderSwitch.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  // eslint-disable-next-line
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign,
        App: createStackNavigator(
          {
            App: createBottomTabNavigator(
              {
                CheckIn,
                HelpOrderSwitch,
              },
              {
                resetOnBlur: true,
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: theme.primary,
                  inactiveTintColor: '#999',
                  style: {
                    paddingTop: 15,
                    paddingBottom: 15,
                    height: 70,
                  },
                },
              }
            ),
          },
          {
            headerLayoutPreset: 'center',
            defaultNavigationOptions: {
              header: props => <Header {...props} />,
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: '#999',
              headerLeftContainerStyle: {
                marginLeft: 20,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
