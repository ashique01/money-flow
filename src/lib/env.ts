const requiredEnv = {
  apiUrl: process.env.GOOGLE_SCRIPT_URL,

  apiKey: process.env.GOOGLE_SCRIPT_KEY,
};

Object.entries(requiredEnv).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

export const env = {
  apiUrl: requiredEnv.apiUrl!,

  apiKey: requiredEnv.apiKey!,
};
