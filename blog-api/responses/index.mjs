export const sendResponse = (status, body) => {
  return {
    statusCode: status,
    body: JSON.stringify({
      ...body,
    }),
  };
};
