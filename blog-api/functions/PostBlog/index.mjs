import { db } from "../../services/index.mjs";
import { sendResponse } from "../../responses/index.mjs";
import { v4 as uuid } from "uuid";

export const handler = async (event) => {
  const newBlog = JSON.parse(event.body);

  try {
    await db.put({
      TableName: "blog-db",
      Item: {
        pk: newBlog.userName,
        sk: uuid().substring(0, 5),
        content: newBlog.content,
      },
    });
    return sendResponse(201, {
      message: "New blog created successfully",
    });
  } catch (error) {
    return sendResponse(400, { message: error.message });
  }
};
