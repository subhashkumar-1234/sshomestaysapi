const { docClient } = require("../config/aws");
const {
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const TABLE_NAME = process.env.DYNAMODB_USERS_TABLE || "users";

// Helper function to hash password securely
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Helper function to match password securely
const matchPassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

// Create User
const createUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);

  const item = {
    id: crypto.randomUUID(),
    name: userData.name || "",
    email: (userData.email || "").toLowerCase().trim(),
    password: hashedPassword,
    role: userData.role || "user",
    phone: userData.phone || "",
    avatar: userData.avatar || "",
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

// Get User By Email
const getUserByEmail = async (email) => {
  const command = new ScanCommand({
    TableName: TABLE_NAME,
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": String(email).toLowerCase().trim(),
    },
  });

  const response = await docClient.send(command);
  const items = response.Items || [];
  return items[0] || null;
};

// Get User By ID
const getUserById = async (id) => {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id: String(id) },
  });

  const response = await docClient.send(command);
  return response.Item || null;
};

// Update User Profile
const updateUser = async (id, updateData) => {
  let updateExp = "set updated_at = :updatedAt";
  const expAttrValues = {
    ":updatedAt": new Date().toISOString(),
  };
  const expAttrNames = {};

  if (updateData.name) {
    updateExp += ", #name = :name";
    expAttrNames["#name"] = "name";
    expAttrValues[":name"] = updateData.name;
  }
  if (updateData.phone !== undefined) {
    updateExp += ", phone = :phone";
    expAttrValues[":phone"] = updateData.phone;
  }
  if (updateData.avatar !== undefined) {
    updateExp += ", avatar = :avatar";
    expAttrValues[":avatar"] = updateData.avatar;
  }
  if (updateData.password) {
    updateExp += ", #pass = :password";
    expAttrNames["#pass"] = "password";
    expAttrValues[":password"] = await hashPassword(updateData.password);
  }

  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id: String(id) },
    UpdateExpression: updateExp,
    ...(Object.keys(expAttrNames).length > 0 && { ExpressionAttributeNames: expAttrNames }),
    ExpressionAttributeValues: expAttrValues,
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);
  return response.Attributes;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  matchPassword,
  hashPassword,
};
