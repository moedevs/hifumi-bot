export const isProduction = process.env.NODE_ENV === "production";

export const AUTH_URL = process.env.VUE_APP_AUTH_URL;
export const DISCORD_OAUTH_URL = process.env.VUE_APP_OAUTH_URL;
export const API_URL = process.env.VUE_APP_GRAPHQL_HTTP;
export const PROXY_URL = "https://proxy.hifumi.io";

export const proxy = url => `${PROXY_URL}/150/${url}`;