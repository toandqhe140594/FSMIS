import "dotenv/config";

export default ({ config }) => {
  const { API_URL, GOOGLE_API_KEY } = process.env;

  return {
    ...config,
    android: {
      ...config.android,
      config: {
        googleMaps: {
          apiKey: GOOGLE_API_KEY,
        },
      },
    },
    extra: {
      API_URL,
      GOOGLE_API_KEY,
    },
  };
};
