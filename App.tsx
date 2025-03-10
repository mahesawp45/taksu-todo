import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from 'app/navigation/AppNavigation';
import { Colors } from 'constants/Colors';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer
      theme={{
        dark: false,
        fonts: {
          bold: {
            fontFamily: '',
            fontWeight: 'bold',
          },
          regular: {
            fontFamily: '',
            fontWeight: 'bold',
          },
          medium: {
            fontFamily: '',
            fontWeight: 'bold',
          },
          heavy: {
            fontFamily: '',
            fontWeight: 'bold',
          },
        },
        colors: {
          background: Colors.primary.background,
          primary: Colors.primary.background,
          card: Colors.primary.card,
          text: Colors.dark.text,
          border: Colors.dark.tabIconDefault,
          notification: Colors.primary.background,
        },
      }}>
      <StatusBar style="auto" />
      <AppNavigation />
    </NavigationContainer>
  );
}
