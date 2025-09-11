import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import { v4 as uuid } from "uuid";
import { db, TABLE } from "../../services/index.mjs";
import { sendResponse } from "../../responses/index.mjs";
import { validateKey } from "../../middlewares/validateKey.mjs";
import { errorHandler } from "../../middlewares/errorHandler.mjs";
import { noteSchema } from "../../models/noteSchema.mjs";

const eventSchema = transpileSchema({
  type: "object",
  required: ["body"],
  properties: { body: noteSchema },
});

export const handler = middy(async (event) => {
  const { username } = event.pathParameters;
  const { title, text } = event.body;

  const id = uuid().slice(0, 8);
  const now = new Date().toISOString();

  const item = {
    pk: username,
    sk: `note-${id}`,
    id,
    username, // <-- store username field
    title,
    text,
    createdAt: now,
    modifiedAt: now,
  };

  await db.put({ TableName: TABLE, Item: item });
  return sendResponse(200, { note: item });
})
  .use(validateKey())
  .use(httpJsonBodyParser())
  .use(validator({ eventSchema }))
  .use(errorHandler());
