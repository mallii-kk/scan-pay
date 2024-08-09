import { ClerkLoaded, ClerkProvider, useSignUp } from "@clerk/clerk-expo";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Stack, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}

export default function RootLayout() {

  const router = useRouter()
  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('SecureStore get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value)
      } catch (err) {
        return
      }
    },
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }
  return (

    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache} >
      <ClerkLoaded>
        <ActionSheetProvider>
          <GestureHandlerRootView>
            <StatusBar style="light" />
            <InitialLayout />
          </GestureHandlerRootView>
        </ActionSheetProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
