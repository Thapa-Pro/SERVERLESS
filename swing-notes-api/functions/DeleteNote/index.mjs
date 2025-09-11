import middy from "@middy/core";
import { db, TABLE } from "../../services/index.mjs";
import { sendResponse } from "../../responses/index.mjs";
import { validateKey } from "../../middlewares/validateKey.mjs";
import { errorHandler } from "../../middlewares/errorHandler.mjs";

export const handler = middy(async (event) => {
  const { id } = event.pathParameters;

  // Find by id via GSI
  const q = await db.query({
    TableName: TABLE,
    IndexName: "GSI1",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: { ":id": id },
    Limit: 1,
  });
  const found = q.Items?.[0];
  if (!found) throw new Error("Note not found");

  await db.delete({
    TableName: TABLE,
    Key: { pk: found.pk, sk: found.sk },
  });

  return sendResponse(200, { message: "Deleted", id });
})
  .use(validateKey())
  .use(errorHandler());
