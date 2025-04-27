import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Keyboard } from 'react-native';

const CustomBottomNavigator = ({ state, navigation }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const activeColor = '#1BB040'; // greenish when focused
  const inactiveColor = '#9E9E9E'; // gray when not focused

  const iconMap = {
    Home: require('../../assets/icons/Home.png'),
    Learn: require('../../assets/icons/learn.png'),
    ' ': require('../../assets/icons/quiz.png'),
    Insights: require('../../assets/icons/Insights.png'),
    Profile: require('../../assets/icons/profile.png'),
  };

  if (keyboardVisible) return null; // 👈 hides bottom bar when keyboard shows

  return (
    <View style={styles.bottomNavBar}>
      {state.routes.map((tab, index) => {
        const focused = state.index === index;
        return (
          <TouchableOpacity
            key={index}
            style={styles.navItems}
            onPress={() => navigation.navigate(tab.name)}
          >
            <Image
              source={iconMap[tab.name]}
              style={{
                width:
                  tab.name === 'Home'
                    ? 27
                    : tab.name === 'Learn'
                    ? 26
                    : tab.name === ' '
                    ? 28
                    : tab.name === 'Insights'
                    ? 28
                    : 24,
                height: 28,
                transform: [{ scale: tab.name === ' ' ? 1.5 : 1 }],
                tintColor: focused ? activeColor : inactiveColor,
              }}
            />
            <Text style={{ color: focused ? activeColor : inactiveColor }}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomNavigator;

const styles = StyleSheet.create({
  bottomNavBar: {
    width: '100%',
    flexDirection: 'row',
    height: 83,
    backgroundColor: '#ffffff',
    borderTopColor: 'grey',
    borderTopWidth: 0.3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItems: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
