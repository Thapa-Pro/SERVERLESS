import { books } from "../../data/index.mjs";
import { sendResponse } from "../../responses/index.mjs";

export async function handler(event) {
  const newBook = JSON.parse(event.body);
  books.push(newBook);
  return sendResponse(200, {
    message: "New book added successfully",
    books,
  });
}
