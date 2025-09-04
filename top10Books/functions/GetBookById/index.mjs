import { books } from "../../data/index.mjs";
import { sendResponse } from "../../responses/index.mjs";

export async function handler(event) {
  const id = parseInt(event.pathParameters.id);
  const book = books.find((i) => i.id === id);

  if (book) {
    return sendResponse(200, book);
  } else {
    return sendResponse(404, { message: "No book found!" });
  }
}
