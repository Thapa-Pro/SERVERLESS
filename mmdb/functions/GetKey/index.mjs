import { keys } from "../../data/keys.mjs";
import { sendResponse } from "../../responses/index.mjs";

export const handler = async (event) => {
  return sendResponse(200, {
    key: keys[Math.floor(Math.random() * keys.length)],
  });
};
