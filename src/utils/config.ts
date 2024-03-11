const config = {
  ENV: import.meta.env.VITE_ENV || "local",
  SHA: import.meta.env.VITE_SHA || "local",
};

export default config;
