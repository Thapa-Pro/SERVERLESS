export const sendResponse = (status, data) => {
  return {
    statusCode: status,
    body: JSON.stringify({ ...data }),
  };
};

/*
body: JSON.stringify (data), try this later and   see if it works.
*/
