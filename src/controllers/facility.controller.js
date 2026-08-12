const facilityService = require("../services/facility.service");


// CREATE
const createFacility = async (req, res, next) => {

    try {

        const facility =
            await facilityService.createFacility(req.body);

        return res.status(201).json({
            success: true,
            message: "Facility created successfully",
            data: facility
        });

    } catch (error) {

        next(error);
    }
};


// GET ALL
const getAllFacilities = async (req, res, next) => {

    try {

        const facilities =
            await facilityService.getAllFacilities();

        return res.status(200).json({
            success: true,
            count: facilities.length,
            data: facilities
        });

    } catch (error) {

        next(error);
    }
};


// GET BY ID
const getFacilityById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const facility =
            await facilityService.getFacilityById(id);

        return res.status(200).json({
            success: true,
            data: facility
        });

    } catch (error) {

        next(error);
    }
};


// GET BY APP ID
const getFacilitiesByAppId = async (req, res, next) => {

    try {

        const { appId } = req.params;

        const facilities =
            await facilityService.getFacilitiesByAppId(appId);

        return res.status(200).json({
            success: true,
            count: facilities.length,
            data: facilities
        });

    } catch (error) {

        next(error);
    }
};


// UPDATE
const updateFacility = async (req, res, next) => {

    try {

        const { id } = req.params;

        const facility =
            await facilityService.updateFacility(
                id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Facility updated successfully",
            data: facility
        });

    } catch (error) {

        next(error);
    }
};


// DELETE
const deleteFacility = async (req, res, next) => {

    try {

        const { id } = req.params;

        await facilityService.deleteFacility(id);

        return res.status(200).json({
            success: true,
            message: "Facility deleted successfully"
        });

    } catch (error) {

        next(error);
    }
};


module.exports = {
    createFacility,
    getAllFacilities,
    getFacilityById,
    getFacilitiesByAppId,
    updateFacility,
    deleteFacility
};