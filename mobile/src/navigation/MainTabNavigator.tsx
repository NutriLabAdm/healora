import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

import DashboardScreen from '../screens/DashboardScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import PlanScreen from '../screens/Plan/PlanScreen';
import GoalsScreen from '../screens/Goals/GoalsScreen';
import DiaryScreen from '../screens/Diary/DiaryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProgressScreen from '../screens/Progress/ProgressScreen';

export type MainTabParamList = {
  DashboardTab: undefined;
  ChatTab: undefined;
  PlanTab: undefined;
  DiaryTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({ color, size }: { color: string; size: number }) {
  return <View style={[styles.dot, { backgroundColor: color, width: size, height: size }]} />;
}

// Wrap each screen in its own stack for future nested navigation
function DashboardStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardMain" component={DashboardScreen} />
    </Stack.Navigator>
  );
}

function ChatStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatMain" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function PlanStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlanMain" component={PlanScreen} />
    </Stack.Navigator>
  );
}

function DiaryStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiaryMain" component={DiaryScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
          paddingBottom: spacing.xs,
          paddingTop: spacing.xs,
          height: 60,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <TabIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => <TabIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="PlanTab"
        component={PlanStack}
        options={{
          tabBarLabel: 'Plan',
          tabBarIcon: ({ color, size }) => <TabIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="DiaryTab"
        component={DiaryStack}
        options={{
          tabBarLabel: 'Diary',
          tabBarIcon: ({ color, size }) => <TabIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <TabIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  dot: { borderRadius: 4 },
});
