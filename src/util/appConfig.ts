import { getEnvWithDefaultValue } from './env';

export const AppConfig = {
  useApiMiddleware: getEnvWithDefaultValue('USE_API_KEY_MIDDLEWARE', 'false') === 'true'
};
