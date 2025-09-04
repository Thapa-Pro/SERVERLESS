import { books } from "../../data/index.mjs";
import { sendResponse } from "../../responses/index.mjs";

export async function handler(event) {
  return sendResponse(200, books);
}
