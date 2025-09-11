export const noteSchema = {
  type: "object",
  required: ["title", "text"],
  additionalProperties: false,
  properties: {
    title: { type: "string", minLength: 1, maxLength: 50 },
    text: { type: "string", minLength: 1, maxLength: 300 },
  },
};
