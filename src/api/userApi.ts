import axiosClient from './axiosClient';
import {jwtDecode} from 'jwt-decode';
import { IResponse } from './axiosClient';
import { fetchSatellites } from './satellites';

interface RegisterRequest {
  username: string;
  full_name: string;
  phone: string;
  email: string;
  country: string;
  password_visible: string;
}

interface TokenResponse {
  access: string;
  refresh: string;
}

interface DecodedToken {
  user_id: number;
}

export async function registerClient(data: RegisterRequest): Promise<IResponse> {
  try {
    const response = await axiosClient.post('/api/frontend/client/register/', data);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function authenticateUser(username: string, password: string): Promise<IResponse> {
  try {
    const response = await axiosClient.post<TokenResponse>('/api/frontend/token/client', {
      username,
      password,
    });

    const { access, refresh } = response.data;

    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    const decoded = jwtDecode<DecodedToken>(access);
    const userId = decoded.user_id;
    localStorage.setItem('userId', String(userId));

    const satelliteResponse = await fetchSatellites();

    if (satelliteResponse.data) {
      return { data: response, error: null };
    } else {
      return { data: null, error: satelliteResponse.error };
    }

  } catch (error) {
    return { data: null, error };
  }
}

export const startEmailVerification = async (email: string) => {
  if (!email) {
    throw new Error('Email is required');
  }

  try {
    // axiosClient interceptor автоматически добавит токен из localStorage
    const response = await axiosClient.post(
      '/api/frontend/client/send-email-verification/',
      {}
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const startVerificationSession = async () => {
  const satelliteData = JSON.parse(localStorage.getItem('satellite') || '{}');
  const accessToken = satelliteData?.tokens?.access;

  if (!accessToken) {
    throw new Error('No access token found');
  }

  try {
    const response = await axiosClient.post(
      '/api/frontend/client/start-verification-session/',
      { lang: 'en' },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};