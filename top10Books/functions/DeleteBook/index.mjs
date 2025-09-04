import { books } from "../../data/index.mjs";
import { sendResponse } from "../../responses/index.mjs";

export async function handler(event) {
  const id = parseInt(event.pathParameters.id);
  if (!id) return sendResponse(400, { error: "Invalid id" });

  const i = books.findIndex((b) => b.id === id);
  if (i === -1) return sendResponse(404, { error: "Book not found" });

  const removed = books.splice(i, 1)[0];
  return sendResponse(200, { deleted: removed });
}
