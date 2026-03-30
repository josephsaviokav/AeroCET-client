const DEFAULT_API_BASE_URL = 'https://aerocet-server.onrender.com';

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const API_BASE_URL = (configuredBaseUrl && configuredBaseUrl.length > 0
  ? configuredBaseUrl
  : DEFAULT_API_BASE_URL
).replace(/\/+$/, '');

export const toApiUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
