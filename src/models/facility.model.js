const { docClient } = require("../config/aws");
const {
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const crypto = require("crypto");

const TABLE_NAME = process.env.DYNAMODB_FACILITIES_TABLE || "facilities";

// Create Facility
const createFacility = async (facility) => {
  const item = {
    id: String(facility.id || crypto.randomUUID()),
    icon: facility.icon || "",
    name: facility.name || "",
    app_id: String(facility.app_id || "101"),
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

// Get All Facilities
const getAllFacilities = async () => {
  const command = new ScanCommand({
    TableName: TABLE_NAME,
  });

  const response = await docClient.send(command);
  const items = response.Items || [];
  return items.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
};

// Get Facility By ID
const getFacilityById = async (id) => {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id: String(id) },
  });

  const response = await docClient.send(command);
  return response.Item || null;
};

// Get Facilities By App ID
const getFacilitiesByAppId = async (appId) => {
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

// Update Facility
const updateFacility = async (id, facility) => {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id: String(id) },
    UpdateExpression:
      "set icon = :icon, #name = :name, app_id = :appId, updated_at = :updatedAt",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":icon": facility.icon,
      ":name": facility.name,
      ":appId": String(facility.app_id),
      ":updatedAt": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);
  return response.Attributes;
};

// Delete Facility
const deleteFacility = async (id) => {
  const command = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { id: String(id) },
    ReturnValues: "ALL_OLD",
  });

  const response = await docClient.send(command);
  return response.Attributes;
};

module.exports = {
  createFacility,
  getAllFacilities,
  getFacilityById,
  getFacilitiesByAppId,
  updateFacility,
  deleteFacility,
};