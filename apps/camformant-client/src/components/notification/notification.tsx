'use client';

import { useAuth } from "@/context/auth";
import { useNotification } from "@/hooks/user-notification";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { useEffect, useState } from "react";
import { MdCircleNotifications } from "react-icons/md";

export default function Notification({ addNotification }: { addNotification: (message: string, type: "success" | "info" | "error") => void }) {
  const { isAuthenticated } = useAuth();
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isVisible, setIsVisible] = useState(false); // For popup visibility
  const [loading, setLoading] = useState(false);

  console.log('isAuthentication', isAuthenticated)
  console.log('sub:::', subscription)

  // Register Notification When User Login
  useEffect(() => {
    if (isAuthenticated) {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        setIsSupported(true);
        registerServiceWorker();
      }
    }
  }, [isAuthenticated]);

  // Show Popup when browser is not support push notification
  useEffect(() => {
    if (isSupported) {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 8000); // Hide after 5s
    }
  }, [isSupported]);

  async function registerServiceWorker() {
    // Check if service worker is already registered
    let registration = await navigator.serviceWorker.getRegistration('/');

    if (!registration) {
      // Register service worker if not registered
      registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
    }
  }

  async function subscribeToPush() {
    setLoading(true); // Set loading state
    const registration = await navigator.serviceWorker.ready;

    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);

    const subscriptionObject = sub.toJSON();
    // @ts-ignore
    const { p256dh, auth } = subscriptionObject.keys;

    try {
      // Send the subscription to your backend
      await axiosInstance.post(API_ENDPOINTS.SUBSCRIBE, {
        endpoint: subscriptionObject.endpoint,
        keys: {
          p256dh,
          auth,
        },
      });
    } catch (error) {
      console.log('Subscribe Notification Error:::', error)
    } finally {
      setLoading(false); // Unset loading state
    }
  }

  async function unsubscribeFromPush() {
    setLoading(true); // Set loading state

    try {
      await subscription?.unsubscribe();
    } catch (error) {
      console.log('Unsubscribe Notification Error:::', error)
    } finally {
      setSubscription(null);
      setLoading(false); // Unset loading state
    }

  }

  const handleToggle = async () => {
    if (subscription) {
      await unsubscribeFromPush();
    } else {
      if (!isAuthenticated) {
        console.log('hey')
        addNotification('Please login to enable notification!', 'error')
      } else {
        await subscribeToPush();

      }
    }
  };

  if (!isSupported && isAuthenticated) {
    return <div
      className={`fixed top-4 right-4 left-4 bg-gray-800 text-white p-4 rounded-lg shadow-md transition-all transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      style={{ transition: 'all 0.5s ease', zIndex: 9999 }} // Smooth transition and ensure z-index is high
    >
      <p>Push notifications are not supported in this browser.</p>
    </div>;
  }

  return (
    <div className="w-full flex items-center justify-between bg-gray-100 rounded-lg shadow-sm">
      {/* Left Section: Icon and Text */}
      <div className="flex w-full text-lg gap-5 items-center">
        <MdCircleNotifications size={22} />
        <span>
          Notification
        </span>
      </div>

      {/* Right Section: Toggle Switch */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={!!subscription}
          onChange={handleToggle}
          disabled={loading} // Disable during loading state
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
      </label>
    </div>
  );
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return new Uint8Array(rawData.split('').map((char) => char.charCodeAt(0)));
}
