import axios from "axios";
import { redis } from "../../config/redis";
import { env } from "../../config/env";

const TOKEN_KEY = "oauth:token";
let refreshingPromise: Promise<string> | null = null;

export const getAccessToken = async (): Promise<string> => {
  const cached = await redis.get(TOKEN_KEY);
  if (cached) return cached;

  if (!refreshingPromise) {
    refreshingPromise = fetchNewToken();
    refreshingPromise.finally(() => (refreshingPromise = null));
  }

  return refreshingPromise;
};

const fetchNewToken = async (): Promise<string> => {
  try {
    const response = await axios.post(env.OAUTH_TOKEN_URL, {
      client_id: env.OAUTH_CLIENT_ID,
      client_secret: env.OAUTH_CLIENT_SECRET,
      audience: env.OAUTH_AUDIENCE,
      grant_type: "client_credentials",
    });

    const { access_token, expires_in } = response.data;
    await redis.set(TOKEN_KEY, access_token, "EX", expires_in - 30);
    return access_token;

  } catch (err: any) {
    console.error("AUTH0 ERROR:", err.response?.data || err.message);
    throw err;
  }
};

