import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import AddDealScreen from './src/screens/AddDealScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import CreateTeamScreen from './src/screens/CreateTeamScreen';
import EditTeamScreen from './src/screens/EditTeamScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ErrorBoundary from './src/components/ErrorBoundary';
import { theme } from './src/utils/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Create Team section
function CreateTeamStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: '#333',
        },
      }}
    >
      <Stack.Screen 
        name="CreateTeamMain" 
        component={CreateTeamScreen}
        options={{ 
          headerTitle: 'Done Deal - Manage Teams',
          headerShown: false, // Hide header for main screen since it has its own title
        }}
      />
      <Stack.Screen 
        name="EditTeam" 
        component={EditTeamScreen}
        options={{ 
          headerTitle: 'Edit Team',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style="dark" backgroundColor="#ffffff" />
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'AddDeal') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === 'Reports') {
                iconName = focused ? 'analytics' : 'analytics-outline';
              } else if (route.name === 'CreateTeam') {
                iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#2196F3',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: '#ffffff',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
              color: '#333',
            },
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopWidth: 1,
              borderTopColor: '#e0e0e0',
            },
          })}
        >
          <Tab.Screen 
            name="AddDeal" 
            component={AddDealScreen} 
            options={{ 
              title: 'Add Deal',
              headerTitle: 'Done Deal - Add Deal',
              tabBarLabel: 'Add Deal'
            }} 
          />
          <Tab.Screen 
            name="Reports" 
            component={ReportsScreen} 
            options={{ 
              title: 'Reports',
              headerTitle: 'Done Deal - Reports',
              tabBarLabel: 'Reports'
            }} 
          />
          <Tab.Screen 
            name="CreateTeam" 
            component={CreateTeamStack} 
            options={{ 
              title: 'Manage Teams',
              headerTitle: 'Done Deal - Manage Teams',
              tabBarLabel: 'Teams',
              headerShown: false, // Hide tab header since stack has its own
            }} 
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ 
              title: 'Settings',
              headerTitle: 'Done Deal - Settings',
              tabBarLabel: 'Settings'
            }} 
          />
        </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ErrorBoundary>
  );
}
