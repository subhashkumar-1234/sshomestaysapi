const discoverVillaModel = require("../models/discoverVilla.model");

// Create
const createDiscoverVilla = async (data) => {
  if (!data.image) {
    throw new Error("Image is required");
  }

  if (!data.title) {
    throw new Error("Title is required");
  }

  if (!data.description) {
    throw new Error("Description is required");
  }

  if (data.app_id === undefined || data.app_id === null) {
    throw new Error("App ID is required");
  }

  const appId = String(data.app_id).trim();

  const discoverVilla = {
    image: String(data.image).trim(),
    title: String(data.title).trim(),
    description: String(data.description).trim(),
    app_id: appId,
  };

  if (!discoverVilla.image) {
    throw new Error("Image cannot be empty");
  }

  if (!discoverVilla.title) {
    throw new Error("Title cannot be empty");
  }

  if (!discoverVilla.description) {
    throw new Error("Description cannot be empty");
  }

  return await discoverVillaModel.createDiscoverVilla(discoverVilla);
};

// Get All
const getAllDiscoverVillas = async () => {
  return await discoverVillaModel.getAllDiscoverVillas();
};

// Get By ID
const getDiscoverVillaById = async (id) => {
  if (!id) {
    throw new Error("Invalid Discover Villa ID");
  }

  const discoverVilla = await discoverVillaModel.getDiscoverVillaById(String(id));

  if (!discoverVilla) {
    throw new Error("Discover Villa not found");
  }

  return discoverVilla;
};

// Get By App ID
const getDiscoverVillasByAppId = async (appId) => {
  if (!appId) {
    throw new Error("Invalid App ID");
  }

  return await discoverVillaModel.getDiscoverVillasByAppId(String(appId));
};

// Update
const updateDiscoverVilla = async (id, data) => {
  if (!id) {
    throw new Error("Invalid Discover Villa ID");
  }

  const existingVilla = await discoverVillaModel.getDiscoverVillaById(String(id));

  if (!existingVilla) {
    throw new Error("Discover Villa not found");
  }

  if (!data.image) {
    throw new Error("Image is required");
  }

  if (!data.title) {
    throw new Error("Title is required");
  }

  if (!data.description) {
    throw new Error("Description is required");
  }

  const appId = String(data.app_id || existingVilla.app_id || "101").trim();

  const discoverVilla = {
    image: String(data.image).trim(),
    title: String(data.title).trim(),
    description: String(data.description).trim(),
    app_id: appId,
  };

  return await discoverVillaModel.updateDiscoverVilla(String(id), discoverVilla);
};

// Delete
const deleteDiscoverVilla = async (id) => {
  if (!id) {
    throw new Error("Invalid Discover Villa ID");
  }

  const existingVilla = await discoverVillaModel.getDiscoverVillaById(String(id));

  if (!existingVilla) {
    throw new Error("Discover Villa not found");
  }

  return await discoverVillaModel.deleteDiscoverVilla(String(id));
};

module.exports = {
  createDiscoverVilla,
  getAllDiscoverVillas,
  getDiscoverVillaById,
  getDiscoverVillasByAppId,
  updateDiscoverVilla,
  deleteDiscoverVilla,
};