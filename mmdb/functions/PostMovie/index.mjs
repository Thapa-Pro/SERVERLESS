import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile"; // Import transpileSchema
import { movies } from "../../data/movies.mjs";
import { sendResponse } from "../../responses/index.mjs";
import { validateKey } from "../../middlewares/validateKey.mjs";
import { errorHandler } from "../../middlewares/errorHandler.mjs";
import { movieSchema } from "../../models/movieSchema.mjs";

const eventSchema = transpileSchema({
  type: "object",
  required: ["body"], // The body is required
  properties: {
    body: movieSchema, // Use the imported movieSchema here
  },
});

export const handler = middy(async (event) => {
  const movie = event.body;
  movies.push(movie);

  return sendResponse(200, {
    message: "A new movie successfully added",
    movies,
  });
})
  .use(validateKey())
  .use(httpJsonBodyParser())
  .use(validator({ eventSchema })) // Use eventSchema here
  .use(errorHandler());
