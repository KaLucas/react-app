export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  apiKey: import.meta.env.VITE_API_KEY,
  environment: import.meta.env.VITE_ENV,
};

export function createApiHeaders(): Record<string, string> {
  return {
    'x-api-key': API_CONFIG.apiKey || '',
    'X-Reqres-Env': API_CONFIG.environment,
  };
}
