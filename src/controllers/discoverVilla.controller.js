const discoverVillaService =
    require("../services/discoverVilla.service");


// CREATE
const createDiscoverVilla = async (req, res, next) => {

    try {

        const discoverVilla =
            await discoverVillaService.createDiscoverVilla(
                req.body
            );

        return res.status(201).json({
            success: true,
            message: "Discover Villa created successfully",
            data: discoverVilla
        });

    } catch (error) {

        next(error);
    }
};


// GET ALL
const getAllDiscoverVillas = async (req, res, next) => {

    try {

        const discoverVillas =
            await discoverVillaService
                .getAllDiscoverVillas();

        return res.status(200).json({
            success: true,
            count: discoverVillas.length,
            data: discoverVillas
        });

    } catch (error) {

        next(error);
    }
};


// GET BY ID
const getDiscoverVillaById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const discoverVilla =
            await discoverVillaService
                .getDiscoverVillaById(id);

        return res.status(200).json({
            success: true,
            data: discoverVilla
        });

    } catch (error) {

        next(error);
    }
};


// GET BY APP ID
const getDiscoverVillasByAppId = async (req, res, next) => {

    try {

        const { appId } = req.params;

        const discoverVillas =
            await discoverVillaService
                .getDiscoverVillasByAppId(appId);

        return res.status(200).json({
            success: true,
            count: discoverVillas.length,
            data: discoverVillas
        });

    } catch (error) {

        next(error);
    }
};


// UPDATE
const updateDiscoverVilla = async (req, res, next) => {

    try {

        const { id } = req.params;

        const discoverVilla =
            await discoverVillaService
                .updateDiscoverVilla(
                    id,
                    req.body
                );

        return res.status(200).json({
            success: true,
            message: "Discover Villa updated successfully",
            data: discoverVilla
        });

    } catch (error) {

        next(error);
    }
};


// DELETE
const deleteDiscoverVilla = async (req, res, next) => {

    try {

        const { id } = req.params;

        await discoverVillaService
            .deleteDiscoverVilla(id);

        return res.status(200).json({
            success: true,
            message: "Discover Villa deleted successfully"
        });

    } catch (error) {

        next(error);
    }
};


module.exports = {
    createDiscoverVilla,
    getAllDiscoverVillas,
    getDiscoverVillaById,
    getDiscoverVillasByAppId,
    updateDiscoverVilla,
    deleteDiscoverVilla
};