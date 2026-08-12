const express = require("express");

const router = express.Router();

const facilityController =
    require("../controllers/facility.controller");


// CREATE
router.post(
    "/",
    facilityController.createFacility
);


// GET ALL
router.get(
    "/",
    facilityController.getAllFacilities
);


// GET BY APP ID
router.get(
    "/app/:appId",
    facilityController.getFacilitiesByAppId
);


// GET BY ID
router.get(
    "/:id",
    facilityController.getFacilityById
);


// UPDATE
router.put(
    "/:id",
    facilityController.updateFacility
);


// DELETE
router.delete(
    "/:id",
    facilityController.deleteFacility
);


module.exports = router;