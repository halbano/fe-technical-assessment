// AirOps Configuration

// Secure function to get hashed user ID from server
const getHashedUserId = async (userId: string): Promise<string> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_USER_HASH_API_HOST}/api/hash-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.hashedUserId;
  } catch (error) {
    console.error('Error getting hashed user ID:', error);
    throw new Error('Failed to get hashed user ID');
  }
};

export const airopsConfig = {
  development: {
    userId: import.meta.env.VITE_AIROPS_USER_ID || 'dev-user-1',
    workspaceId: parseInt(import.meta.env.VITE_AIROPS_WORKSPACE_ID || '1'),
    environment: 'development' as const,
    getHashedUserId,
    hashedUserId: '',
    appId: import.meta.env.VITE_AIROPS_APP_ID,
  },
  production: {
    userId: import.meta.env.VITE_AIROPS_USER_ID || '',
    workspaceId: parseInt(import.meta.env.VITE_AIROPS_WORKSPACE_ID || '0'),
    environment: 'production' as const,
    getHashedUserId,
    hashedUserId: '',
    appId: import.meta.env.VITE_AIROPS_APP_ID,
  }
};

export const getCurrentConfig = () => {
  const env = import.meta.env.PROD ? 'production' : 'development';
  return airopsConfig[env] || airopsConfig.development;
}; 