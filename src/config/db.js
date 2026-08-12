require("dotenv").config();
const { ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const { dynamoClient } = require("./aws");

const connectDB = async () => {
  try {
    const command = new ListTablesCommand({});
    const response = await dynamoClient.send(command);
    console.log("AWS DynamoDB Connected Successfully. Available Tables:", response.TableNames || []);
  } catch (error) {
    console.warn("AWS DynamoDB Initial Check Warning:", error.message);
  }
};

module.exports = {
  connectDB,
};