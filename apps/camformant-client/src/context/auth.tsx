'use client'

import axiosInstance from "@/utils/axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { LoginRequest, SignupRequest, VerifyUserRequest } from "@/utils/types/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: ({ email, phone_number, password }: LoginRequest) => Promise<void>;
  signup: ({ sur_name, last_name, email, phone_number, password }: SignupRequest) => Promise<void>;
  verify: ({ email, phone_number, code }: VerifyUserRequest) => Promise<void>;
  siginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // TODO: use router from redirect job
  const router = useRouter();

  const login = async ({ email, phone_number, password }: LoginRequest) => {
    setLoading(true);
    try {
      await axiosInstance.post(`${API_ENDPOINTS.SIGN_IN}`, {
        [email ? 'email' : 'phone_number']: email || phone_number,
        password
      })

      setIsAuthenticated(true);
      router.push('/profile');
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const signup = async ({ sur_name, last_name, email, phone_number, password }: SignupRequest) => {
    setLoading(true);
    try {
      await axiosInstance.post(`${API_ENDPOINTS.SIGN_UP}`, {
        sur_name,
        last_name,
        [email ? 'email' : 'phone_number']: email || phone_number,
        password
      })

      // TODO: redirect to verify page with contact and method (email or phone_number)
      router.push(`/verify?contact=${email || phone_number}&method=${email ? 'email' : 'phone_number'}`);
    } catch (error) {
      console.log('This error: ', error)
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const verify = async ({ email, phone_number, code }: VerifyUserRequest) => {
    setLoading(true);
    try {
      await axiosInstance.post(`${API_ENDPOINTS.VERIFY}`, {
        [email ? 'email' : 'phone_number']: email || phone_number,
        code
      })

      router.push('/login');
    } catch (error) {
      console.error('Verify failed:', error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const siginWithGoogle = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.SIGN_IN_WITH_GOOGLE}?state=user`);

      setIsAuthenticated(true);
      window.location.href = response.data.data;
    } catch (error) {
      console.error('Signin with Google failed:', error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, signup, verify, siginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}