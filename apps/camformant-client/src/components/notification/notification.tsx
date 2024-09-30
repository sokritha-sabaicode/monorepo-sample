'use client'

import { useAuth } from "@/context/auth";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { useEffect } from "react";

export default function Notification() {
  const { isAuthenticated } = useAuth();
  console.log('isAuth', isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    // Register the service worker first
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);

        // Wait until the service worker is ready
        navigator.serviceWorker.ready.then(() => {
          // Request notification permission
          requestNotificationPermission().catch((error) => {
            console.error('Error requesting notification permission:', error);
          });
        });

        // Handle updates to the service worker
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;

          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // A new service worker is available, prompt the user to refresh
                  console.log('New service worker available. Please refresh.');

                  if (confirm('New update available. Do you want to reload the page?')) {
                    window.location.reload();
                  }
                }
              }
            };
          }
        };
      }).catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
    }
  }, [isAuthenticated]);


  return null
}

async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.error('This browser does not support notifications.');
    return;
  }

  try {
    const permission = await window.Notification.requestPermission();
    if (permission !== 'granted') {
      console.error('Notification permission denied.');
      return;
    } else {
      await subscribeUser();
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return;
  }
}

async function subscribeUser() {
  const registration = await navigator.serviceWorker.ready;

  const existingSubscription = await registration.pushManager.getSubscription();
  if (existingSubscription) {
    console.log('User is already subscribed:', existingSubscription);
    return existingSubscription;
  }

  const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY; // Replace with your VAPID public key
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey!),
  });

  // Convert the subscription to a plain object
  const subscriptionObject = subscription.toJSON();
  // @ts-ignore
  const { p256dh, auth } = subscriptionObject.keys;

  // Send the subscription to your backend
  await axiosInstance.post(API_ENDPOINTS.SUBSCRIBE, {
    endpoint: subscriptionObject.endpoint,
    keys: {
      p256dh: p256dh,
      auth: auth,
    }
  });

  return subscription;
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return new Uint8Array(rawData.split('').map((char) => char.charCodeAt(0)));
}

