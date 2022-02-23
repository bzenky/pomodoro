import { initializeApp } from 'firebase/app'
import { getToken, getMessaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
}

export async function initializeFireBase() {
  initializeApp(firebaseConfig)
}

export async function requestNotificationPermission() {
  try {
    const messaging = getMessaging()
    const token = await getToken(messaging, {vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY})
  } catch (error) {
    console.error(error)
  }
}