import axios, { AxiosError, type CreateAxiosDefaults } from 'axios';
import { routesConfig } from '@/shared/config/routes';
import { AccessTokenStorage } from './access-token-storage';
import { errorCatch } from './error-catch';
import { tokenService } from './token.service';

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const requester = axios.create(options);
export const requesterWithAuth = axios.create(options);

requesterWithAuth.interceptors.request.use((config) => {
  const accessToken = AccessTokenStorage.getToken();

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

requesterWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await tokenService.getNewTokens();

        if (response.data.accessToken)
          AccessTokenStorage.saveToken(response.data.accessToken);

        return requesterWithAuth.request(originalRequest);
      } catch (e) {
        if (e instanceof AxiosError)
          if (e.status === 401) {
            AccessTokenStorage.removeToken();
            window.location.href = routesConfig.LOGIN;
          }
      }
    }

    throw error;
  },
);
