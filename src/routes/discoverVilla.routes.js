const express = require("express");

const router = express.Router();

const discoverVillaController =
    require("../controllers/discoverVilla.controller");

/**
 * @openapi
 * tags:
 *   name: Discover Villas
 *   description: Discover Villas listing and management API
 */

/**
 * @openapi
 * /api/discover-villas:
 *   post:
 *     summary: Create a new discover villa listing
 *     tags: [Discover Villas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscoverVillaInput'
 *     responses:
 *       201:
 *         description: Villa created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Discover Villa created successfully" }
 *                 data: { $ref: '#/components/schemas/DiscoverVilla' }
 *       500:
 *         description: Server error
 */
router.post(
    "/",
    discoverVillaController.createDiscoverVilla
);

/**
 * @openapi
 * /api/discover-villas:
 *   get:
 *     summary: Get all discover villas
 *     tags: [Discover Villas]
 *     responses:
 *       200:
 *         description: List of all discover villas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 count: { type: number, example: 10 }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DiscoverVilla'
 */
router.get(
    "/",
    discoverVillaController.getAllDiscoverVillas
);

/**
 * @openapi
 * /api/discover-villas/app/{appId}:
 *   get:
 *     summary: Get discover villas by App ID
 *     tags: [Discover Villas]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *         description: Application Identifier (e.g. sshomestays)
 *     responses:
 *       200:
 *         description: List of villas for specified app ID
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
 *                     $ref: '#/components/schemas/DiscoverVilla'
 */
router.get(
    "/app/:appId",
    discoverVillaController.getDiscoverVillasByAppId
);

/**
 * @openapi
 * /api/discover-villas/{id}:
 *   get:
 *     summary: Get discover villa details by ID
 *     tags: [Discover Villas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Villa ID
 *     responses:
 *       200:
 *         description: Villa details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/DiscoverVilla' }
 *       404:
 *         description: Villa not found
 */
router.get(
    "/:id",
    discoverVillaController.getDiscoverVillaById
);

/**
 * @openapi
 * /api/discover-villas/{id}:
 *   put:
 *     summary: Update an existing discover villa
 *     tags: [Discover Villas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Villa ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscoverVillaInput'
 *     responses:
 *       200:
 *         description: Villa updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Discover Villa updated successfully" }
 *                 data: { $ref: '#/components/schemas/DiscoverVilla' }
 *       404:
 *         description: Villa not found
 */
router.put(
    "/:id",
    discoverVillaController.updateDiscoverVilla
);

/**
 * @openapi
 * /api/discover-villas/{id}:
 *   delete:
 *     summary: Delete a discover villa
 *     tags: [Discover Villas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Villa ID
 *     responses:
 *       200:
 *         description: Villa deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Discover Villa deleted successfully" }
 *       404:
 *         description: Villa not found
 */
router.delete(
    "/:id",
    discoverVillaController.deleteDiscoverVilla
);

module.exports = router;