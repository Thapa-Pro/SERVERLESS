export function sendResponse(status, data) {
  const response = {
    statusCode: status,
    body: JSON.stringify(data),
  };
  return response;
}
