const { docClient } = require("../config/aws");
const {
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const crypto = require("crypto");

const TABLE_NAME = process.env.DYNAMODB_DISCOVER_VILLAS_TABLE || "discover_villas";

// Create Discover Villa
const createDiscoverVilla = async (discoverVilla) => {
  const item = {
    id: crypto.randomUUID(),
    image: discoverVilla.image || "",
    title: discoverVilla.title || "",
    description: discoverVilla.description || "",
    app_id: String(discoverVilla.app_id || "101"),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    })
  );

  return item;
};

// Get All Discover Villas
const getAllDiscoverVillas = async () => {
  const command = new ScanCommand({
    TableName: TABLE_NAME,
  });

  const response = await docClient.send(command);
  const items = response.Items || [];
  return items.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
};

// Get Discover Villa By ID
const getDiscoverVillaById = async (id) => {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id: String(id) },
  });

  const response = await docClient.send(command);
  return response.Item || null;
};

// Get Discover Villas By App ID
const getDiscoverVillasByAppId = async (appId) => {
  const command = new ScanCommand({
    TableName: TABLE_NAME,
    FilterExpression: "app_id = :appId",
    ExpressionAttributeValues: {
      ":appId": String(appId),
    },
  });

  const response = await docClient.send(command);
  return response.Items || [];
};

// Update Discover Villa
const updateDiscoverVilla = async (id, discoverVilla) => {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id: String(id) },
    UpdateExpression:
      "set image = :image, #title = :title, #desc = :desc, app_id = :appId, updated_at = :updatedAt",
    ExpressionAttributeNames: {
      "#title": "title",
      "#desc": "description",
    },
    ExpressionAttributeValues: {
      ":image": discoverVilla.image,
      ":title": discoverVilla.title,
      ":desc": discoverVilla.description,
      ":appId": String(discoverVilla.app_id),
      ":updatedAt": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);
  return response.Attributes;
};

// Delete Discover Villa
const deleteDiscoverVilla = async (id) => {
  const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { id: String(id) },
    ReturnValues: "ALL_OLD",
  });

  const response = await docClient.send(command);
  return response.Attributes;
};

module.exports = {
  createDiscoverVilla,
  getAllDiscoverVillas,
  getDiscoverVillaById,
  getDiscoverVillasByAppId,
  updateDiscoverVilla,
  deleteDiscoverVilla,
};