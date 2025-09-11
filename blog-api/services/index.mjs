// Här skapar vi vår databasuppkoppling och exporterar den
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDB();
export const db = DynamoDBDocument.from(client);
