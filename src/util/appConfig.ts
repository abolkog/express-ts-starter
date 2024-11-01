import { getEnvWithDefaultValue } from './env';

export const AppConfig = {
  useApiMiddleware: getEnvWithDefaultValue('USE_API_MIDDLEWARE', 'false') === 'true'
};
