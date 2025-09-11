export const updateSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string", minLength: 1, maxLength: 50 },
    text: { type: "string", minLength: 1, maxLength: 300 },
  },
};
