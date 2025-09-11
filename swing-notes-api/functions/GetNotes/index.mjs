import middy from "@middy/core";
import { db, TABLE } from "../../services/index.mjs";
import { sendResponse } from "../../responses/index.mjs";
import { validateKey } from "../../middlewares/validateKey.mjs";
import { errorHandler } from "../../middlewares/errorHandler.mjs";

export const handler = middy(async (event) => {
  const { username } = event.pathParameters;

  const { Items } = await db.query({
    TableName: TABLE,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": username },
  });

  return sendResponse(200, { notes: Items ?? [] });
})
  .use(validateKey())
  .use(errorHandler());
