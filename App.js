import React from 'react';
import { Animated, Easing, Text } from "react-native";
import {
  createStackNavigator
} from "react-navigation";

import SelectTestScreen from "./src/selecttest";
import ButtonLatencyScreen from "./src/buttonlatency";
import HeavyComputationScreen from "./src/heavycomputation";
import { LocalListItemsScreen, NetworkListItemsScreen } from "./src/listitems";
import VibrationLatency from "./src/vibrationlatency";

class NotImplemented extends React.Component {
  render() {
    return <Text>Not implemented</Text>;
  }
}

//transitionConfig to remove animations from:
//https://github.com/react-navigation/react-navigation/issues/1254#issuecomment-346319921
const App = createStackNavigator(
  {
    Landing: {
      screen: SelectTestScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Thesis benchmarking"
      })
    },
    ButtonLatency: {
      screen: ButtonLatencyScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Button latency"
      })
    },
    LocalListView: {
      screen: LocalListItemsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Local listview"
      })
    },
    NetworkListView: {
      screen: NetworkListItemsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Network listview"
      })
    },
    HeavyComputation: {
      screen: HeavyComputationScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Heavy computation"
      })
    },
    VibrationLatency: {
      screen: VibrationLatency,
      navigationOptions: ({ navigation }) => ({
        title: "Vibration latency"
      })
    },
    ThirdPartyNotices: {
      screen: NotImplemented,
      navigationOptions: ({ navigation }) => ({
        title: "Third party notices"
      })
    }
  }, {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0],
        });
        if (index <= 1) {
          return {};
        }

        return { transform: [{ translateX }] };
      }
    })
  });

export default App;