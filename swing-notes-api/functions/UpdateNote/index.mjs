import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { db, TABLE } from "../../services/index.mjs";
import { sendResponse } from "../../responses/index.mjs";
import { validateKey } from "../../middlewares/validateKey.mjs";
import { errorHandler } from "../../middlewares/errorHandler.mjs";
import { updateSchema } from "../../models/updateSchema.mjs";

const eventSchema = transpileSchema({
  type: "object",
  required: ["body"],
  properties: { body: updateSchema },
});

export const handler = middy(async (event) => {
  const { id } = event.pathParameters;

  // Find the item by id via GSI
  const q = await db.query({
    TableName: TABLE,
    IndexName: "GSI1",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: { ":id": id },
    Limit: 1,
  });
  const found = q.Items?.[0];
  if (!found) throw new Error("Note not found");

  const { title, text } = event.body;

  const names = {};
  const values = { ":modifiedAt": new Date().toISOString() };
  const sets = ["modifiedAt = :modifiedAt"];

  if (title !== undefined) {
    names["#title"] = "title";
    values[":title"] = title;
    sets.push("#title = :title");
  }
  if (text !== undefined) {
    names["#text"] = "text";
    values[":text"] = text;
    sets.push("#text = :text");
  }

  const out = await db.update({
    TableName: TABLE,
    Key: { pk: found.pk, sk: found.sk },
    UpdateExpression: "SET " + sets.join(", "),
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: values,
    ReturnValues: "ALL_NEW",
  });

  return sendResponse(200, { note: out.Attributes });
})
  .use(validateKey())
  .use(httpJsonBodyParser())
  .use(validator({ eventSchema }))
  .use(errorHandler());
