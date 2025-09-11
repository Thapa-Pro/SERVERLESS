import { db } from "../../services/index.mjs";
import { sendResponse } from "../../responses/index.mjs";

export const handler = async (event) => {
  try {
    const { Items } = await db.query({
      TableName: "blog-db",
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": event.pathParameters.user,
      },
    });
    if (Items.length === 0) {
      throw new Error("No posts found!");
    }
    return sendResponse(200, { blogs: Items });
  } catch (error) {
    return sendResponse(404, { message: error.message });
  }
};
