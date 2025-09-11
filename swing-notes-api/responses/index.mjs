export const sendResponse = (status, data) => ({
  statusCode: status,
  body: JSON.stringify({
    ...data,
  }),
});
