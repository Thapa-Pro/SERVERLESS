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
  const { user, id } = event.pathParameters;

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

  try {
    const out = await db.update({
      TableName: TABLE,
      Key: { pk: user, sk: `note-${id}` },
      UpdateExpression: "SET " + sets.join(", "),
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)", // don't upsert
      ReturnValues: "ALL_NEW",
    });
    return sendResponse(200, { note: out.Attributes });
  } catch (e) {
    if (e.name === "ConditionalCheckFailedException")
      throw new Error("Note not found");
    throw e;
  }
})
  .use(validateKey())
  .use(httpJsonBodyParser())
  .use(validator({ eventSchema }))
  .use(errorHandler());
