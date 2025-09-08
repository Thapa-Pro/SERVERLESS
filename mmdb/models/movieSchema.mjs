const currentYear = new Date().getFullYear(); // We created this as we are using this variable below
export const movieSchema = {
  type: "object",
  required: ["title", "year", "director", "genre", "length"],
  properties: {
    title: { type: "string" },
    year: { type: "integer", minimum: 1888, maximum: currentYear }, // Use currentYear here
    director: { type: "string" },
    genre: { type: "string" },
    length: { type: "integer", minimum: 1 },
  },
  additionalProperties: false, // Disallow properties not defined in the schema
};
