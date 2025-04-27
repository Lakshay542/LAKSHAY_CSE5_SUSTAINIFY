import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import P1 from './HomePage';
import P2 from './P2';
import P3 from './P3';
import P4 from './P4';
import P5 from './P5';
import { Image } from 'react-native';
import CustomBottomNavigator from './CustomBottomNavigator';

const TabNavigator = createBottomTabNavigator();
const activeColor = '#1BB040';
const inactiveColor = '#9E9E9E';

const BottomNavigator = () => {
  return (
    <TabNavigator.Navigator tabBar={(props) => <CustomBottomNavigator {...props} />}>
      <TabNavigator.Screen
        name="Home"
        component={P1}
        options={{ headerShown: false }}
      />
      <TabNavigator.Screen
        name="Learn"
        component={P2}
        options={{ headerShown: false }}
      />
      <TabNavigator.Screen
        name=" "
        component={P3}
        options={{ headerShown: false }}
      />
      <TabNavigator.Screen
        name="Insights"
        component={P4}
        options={{ headerShown: false }}
      />
      <TabNavigator.Screen
        name="Profile"
        component={P5}
        options={{ headerShown: false }}
      />
    </TabNavigator.Navigator>
  );
};

export default BottomNavigator;
