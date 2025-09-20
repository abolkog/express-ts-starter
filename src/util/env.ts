/**
 * Get env variable value or throw error
 * @param name The name of the environment variable
 * @returns
 */
export function getEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw Error(`Missing env variable: ${name}`);
  }
  return value;
}

/**
 * Get env variable value or return default value
 * @param name The name of the environment variable
 * @param defaultValue The default value to return if the env variable is not set
 * @returns
 */
export function getEnvWithDefaultValue(name: string, defaultValue?: string) {
  try {
    return getEnv(name);
  } catch (_e) {
    return defaultValue;
  }
}

/**
 * get env variable as Int
 * @param name
 * @param defaultValue
 * @returns
 */
export function getEnvAsInt(name: string, defaultValue?: number) {
  try {
    return parseInt(getEnv(name));
  } catch (_e) {
    return defaultValue || 0;
  }
}
