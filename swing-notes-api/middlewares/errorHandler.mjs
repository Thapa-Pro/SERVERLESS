import { sendResponse } from "../responses/index.mjs";

export const errorHandler = () => ({
  onError: (handler) => {
    const message = handler.error?.message || "Bad request";

    // Map specific error messages to HTTP codes
    const statusByMessage = {
      "Invalid API Key": 401,
      "Note not found": 404,
    };

    const status = statusByMessage[message] ?? 400;
    handler.response = sendResponse(status, { message });
  },
});

/* from mmdb style guide

import { sendResponse } from "../responses/index.mjs";

export const errorHandler = () => ({
  onError: (handler) => {
    handler.response = sendResponse(401, { message: handler.error.message });
  },
});


*/
