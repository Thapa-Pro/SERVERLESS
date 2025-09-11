import middy from "@middy/core";
import { db, TABLE } from "../../services/index.mjs";
import { sendResponse } from "../../responses/index.mjs";
import { validateKey } from "../../middlewares/validateKey.mjs";
import { errorHandler } from "../../middlewares/errorHandler.mjs";

export const handler = middy(async (event) => {
  const { user, id } = event.pathParameters;

  const res = await db.delete({
    TableName: TABLE,
    Key: { pk: user, sk: `note-${id}` },
    ReturnValues: "ALL_OLD",
  });

  if (!res.Attributes) throw new Error("Note not found");
  return sendResponse(200, { message: "Deleted", id });
})
  .use(validateKey())
  .use(errorHandler());
