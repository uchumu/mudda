export const environment = import.meta.env.NODE_ENV;
export const isDev = environment === "development";
export const isPrd = environment === "production";
export const isTest = environment === "test";

export const domain = import.meta.env.VITE_DOMAIN;

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
