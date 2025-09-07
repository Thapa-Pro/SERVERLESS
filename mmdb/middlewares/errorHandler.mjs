import { sendResponse } from "../responses/index.mjs";

export const errorHandler = () => ({
  onError: (handler) => {
    handler.response = sendResponse(401, { message: handler.error.message });
  },
});
