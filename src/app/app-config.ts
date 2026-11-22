import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiEndpoint: string;
}

export const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'https://mi-api.com'
};

export const APP_CONFIG = new InjectionToken<AppConfig>(
  'APP_CONFIG'
);