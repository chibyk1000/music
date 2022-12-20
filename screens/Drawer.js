import React from 'react'
import { View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {MaterialIcons} from '@expo/vector-icons'
import Music from './Music'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Video from './Video'
const Tab = createMaterialBottomTabNavigator()
const Drawer = () => {
  return (

      <Tab.Navigator
        activeColor="orange"
        inactiveColor="black"
        sceneAnimationEnabled
          barStyle={{ backgroundColor: "gold" }}
          
      >
        <Tab.Screen
          name="Music"
          component={Music}
                  options={{
                    tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                  
              <MaterialCommunityIcons 
                name="music"
                color={color}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Video"
          component={Video}
                  options={{
                    tabBarLabel: "Video",
              tabBarIcon: ({ color }) => (
                  
              <MaterialCommunityIcons 
                name="video"
                color={color}
                size={25}
              />
            ),
          }}
        />
      </Tab.Navigator>

  );
}

export default Drawer