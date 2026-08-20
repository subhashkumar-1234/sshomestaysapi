const express = require("express");

const router = express.Router();

const facilityController =
    require("../controllers/facility.controller");

/**
 * @openapi
 * tags:
 *   name: Facilities
 *   description: Facilities management API
 */

/**
 * @openapi
 * /api/facilities:
 *   post:
 *     summary: Create a new facility
 *     tags: [Facilities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacilityInput'
 *     responses:
 *       201:
 *         description: Facility created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Facility created successfully" }
 *                 data: { $ref: '#/components/schemas/Facility' }
 *       500:
 *         description: Server error
 */
router.post(
    "/",
    facilityController.createFacility
);

/**
 * @openapi
 * /api/facilities:
 *   get:
 *     summary: Get all facilities
 *     tags: [Facilities]
 *     responses:
 *       200:
 *         description: List of all facilities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 count: { type: number, example: 5 }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Facility'
 */
router.get(
    "/",
    facilityController.getAllFacilities
);

/**
 * @openapi
 * /api/facilities/app/{appId}:
 *   get:
 *     summary: Get facilities by App ID
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *         description: Application Identifier (e.g. sshomestays)
 *     responses:
 *       200:
 *         description: List of facilities for the specified app ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 count: { type: number }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Facility'
 */
router.get(
    "/app/:appId",
    facilityController.getFacilitiesByAppId
);

/**
 * @openapi
 * /api/facilities/{id}:
 *   get:
 *     summary: Get facility details by ID
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Facility ID
 *     responses:
 *       200:
 *         description: Facility detail object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Facility' }
 *       404:
 *         description: Facility not found
 */
router.get(
    "/:id",
    facilityController.getFacilityById
);

/**
 * @openapi
 * /api/facilities/{id}:
 *   put:
 *     summary: Update an existing facility
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Facility ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacilityInput'
 *     responses:
 *       200:
 *         description: Facility updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Facility updated successfully" }
 *                 data: { $ref: '#/components/schemas/Facility' }
 *       404:
 *         description: Facility not found
 */
router.put(
    "/:id",
    facilityController.updateFacility
);

/**
 * @openapi
 * /api/facilities/{id}:
 *   delete:
 *     summary: Delete a facility
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Facility ID
 *     responses:
 *       200:
 *         description: Facility deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Facility deleted successfully" }
 *       404:
 *         description: Facility not found
 */
router.delete(
    "/:id",
    facilityController.deleteFacility
);

module.exports = router;