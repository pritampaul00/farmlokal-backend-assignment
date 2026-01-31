import axios from "axios";
import CircuitBreaker from "opossum";
import { retry } from "../../utils/retry";
import { env } from "../../config/env";

const axiosCall = async (url: string) => {
  return axios.get(url, { timeout: 2000 });
};

const breaker = new CircuitBreaker(axiosCall, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 10000,
});

// ⭐ Fallback when API is down
breaker.fallback(() => {
  return {
    data: {
      message: "External API temporarily unavailable",
      fallback: true,
    },
  };
});

export const fetchFromApiA = async () => {
  return retry(() => breaker.fire(env.API_A_URL));
};
