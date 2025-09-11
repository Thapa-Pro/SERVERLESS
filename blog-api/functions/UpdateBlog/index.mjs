import { db } from "../../services/index.mjs";
import { sendResponse } from "../../responses/index.mjs";

export const handler = async (event) => {
  const newBlog = JSON.parse(event.body);
  try {
    await db.update({
      TableName: "blog-db",
      Key: { pk: "jesper", sk: event.pathParameters.id },
      ReturnValues: "ALL_NEW",
      UpdateExpression: "set content = :content",
      ExpressionAttributeValues: {
        ":content": newBlog.content,
      },
    });

    return sendResponse(200, { message: "Blog updated successfully" });
  } catch (error) {
    return sendResponse(404, { message: error.message });
  }
};
