const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json();
};
