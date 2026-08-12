const facilityModel = require("../models/facility.model");

// Create Facility
const createFacility = async (data) => {
  if (!data.icon) {
    throw new Error("Icon is required");
  }

  if (!data.name) {
    throw new Error("Name is required");
  }

  const appId = String(data.app_id || "101").trim();

  const facility = {
    icon: String(data.icon).trim(),
    name: String(data.name).trim(),
    app_id: appId,
  };

  if (!facility.icon) {
    throw new Error("Icon cannot be empty");
  }

  if (!facility.name) {
    throw new Error("Name cannot be empty");
  }

  return await facilityModel.createFacility(facility);
};

// Get All Facilities
const getAllFacilities = async () => {
  return await facilityModel.getAllFacilities();
};

// Get Facility By ID
const getFacilityById = async (id) => {
  if (!id) {
    throw new Error("Invalid facility ID");
  }

  const facility = await facilityModel.getFacilityById(String(id));

  if (!facility) {
    throw new Error("Facility not found");
  }

  return facility;
};

// Get Facilities By App ID
const getFacilitiesByAppId = async (appId) => {
  if (!appId) {
    throw new Error("Invalid app ID");
  }

  return await facilityModel.getFacilitiesByAppId(String(appId));
};

// Update Facility
const updateFacility = async (id, data) => {
  if (!id) {
    throw new Error("Invalid facility ID");
  }

  const existingFacility = await facilityModel.getFacilityById(String(id));

  if (!existingFacility) {
    throw new Error("Facility not found");
  }

  if (!data.icon) {
    throw new Error("Icon is required");
  }

  if (!data.name) {
    throw new Error("Name is required");
  }

  const appId = String(data.app_id || existingFacility.app_id || "101").trim();

  const facility = {
    icon: String(data.icon).trim(),
    name: String(data.name).trim(),
    app_id: appId,
  };

  if (!facility.icon) {
    throw new Error("Icon cannot be empty");
  }

  if (!facility.name) {
    throw new Error("Name cannot be empty");
  }

  return await facilityModel.updateFacility(String(id), facility);
};

// Delete Facility
const deleteFacility = async (id) => {
  if (!id) {
    throw new Error("Invalid facility ID");
  }

  const existingFacility = await facilityModel.getFacilityById(String(id));

  if (!existingFacility) {
    throw new Error("Facility not found");
  }

  return await facilityModel.deleteFacility(String(id));
};

module.exports = {
  createFacility,
  getAllFacilities,
  getFacilityById,
  getFacilitiesByAppId,
  updateFacility,
  deleteFacility,
};