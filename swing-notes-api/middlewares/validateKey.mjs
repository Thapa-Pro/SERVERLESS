import { keys } from "../data/keys.mjs";

export const validateKey = () => ({
  before: (handler) => {
    const headerKey =
      handler.event.headers?.["x-api-key"] ||
      handler.event.headers?.["X-API-Key"] ||
      handler.event.queryStringParameters?.key;

    if (!headerKey || !keys.includes(headerKey)) {
      throw new Error("Invalid API Key");
    }
  },
});

/*
  This is how we used to do it - but now changed to use headers instead
  
import { keys } from "../data/keys.mjs";

export const validateKey = () => ({
  before: (handler) => {
    const { key } = handler.event.queryStringParameters;

    if (!keys.some((k) => k === key)) {
      throw new Error("Invalid API Key");
    }
    return;
  },
});
*/
