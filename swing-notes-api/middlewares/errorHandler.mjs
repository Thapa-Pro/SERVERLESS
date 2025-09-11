import { sendResponse } from "../responses/index.mjs";

export const errorHandler = () => ({
  onError: (handler) => {
    const msg = handler.error?.message || "Bad request";
    const code =
      msg === "Invalid API Key" ? 401 : msg === "Note not found" ? 404 : 400;

    handler.response = sendResponse(code, { message: msg });
  },
});
