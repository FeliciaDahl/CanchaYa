import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { darkTheme } from '../theme';
import { NearbyCourtScreen } from '../screens/discovery/NearbyCourtScreen';
import { FacilityDetailScreen } from '../screens/discovery/FacilityDetailScreen';
import { TimeSlotSelectionScreen, BookingReviewScreen } from '../screens/booking';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DiscoveryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: darkTheme.colors.surface,
          borderBottomColor: darkTheme.colors.border,
        },
        headerTintColor: darkTheme.colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        cardStyle: { backgroundColor: darkTheme.colors.surface },
      }}
    >
      <Stack.Screen
        name="NearbyCourts"
        component={NearbyCourtScreen}
        options={{
          title: 'Discover Courts',
        }}
      />
      <Stack.Screen
        name="FacilityDetail"
        component={FacilityDetailScreen}
        options={{
          title: 'Court Details',
        }}
      />
      <Stack.Screen
        name="TimeSlotSelection"
        component={TimeSlotSelectionScreen}
        options={{
          title: 'Select Time Slot',
        }}
      />
      <Stack.Screen
        name="BookingReview"
        component={BookingReviewScreen}
        options={{
          title: 'Review Booking',
        }}
      />
    </Stack.Navigator>
  );
}

// Placeholder screens - will be implemented in phases
function BookingsScreen() {
  return null;
}

function ProfileScreen() {
  return null;
}

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: darkTheme.colors.surface,
          borderTopColor: darkTheme.colors.border,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: darkTheme.colors.primary,
        tabBarInactiveTintColor: darkTheme.colors.textSecondary,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap = 'help-circle';

          if (route.name === 'DiscoveryStack') {
            iconName = 'map-search';
          } else if (route.name === 'Bookings') {
            iconName = 'calendar-check';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="DiscoveryStack"
        component={DiscoveryStack}
        options={{
          title: 'Discover',
          tabBarLabel: 'Discover',
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          title: 'My Bookings',
          tabBarLabel: 'Bookings',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
