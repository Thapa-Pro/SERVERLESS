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
