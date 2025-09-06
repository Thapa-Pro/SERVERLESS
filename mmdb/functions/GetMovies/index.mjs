import { movies } from "../../data/movies.mjs";
import { sendResponse } from "../../responses/index.mjs";

export const handler = async (event) => {
  return sendResponse(200, { movies });
};
