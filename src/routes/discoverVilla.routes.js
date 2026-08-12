const express = require("express");

const router = express.Router();

const discoverVillaController =
    require("../controllers/discoverVilla.controller");


// CREATE
router.post(
    "/",
    discoverVillaController.createDiscoverVilla
);


// GET ALL
router.get(
    "/",
    discoverVillaController.getAllDiscoverVillas
);


// GET BY APP ID
router.get(
    "/app/:appId",
    discoverVillaController.getDiscoverVillasByAppId
);


// GET BY ID
router.get(
    "/:id",
    discoverVillaController.getDiscoverVillaById
);


// UPDATE
router.put(
    "/:id",
    discoverVillaController.updateDiscoverVilla
);


// DELETE
router.delete(
    "/:id",
    discoverVillaController.deleteDiscoverVilla
);


module.exports = router;