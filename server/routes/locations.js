import express from 'express'
import { getAllLocations, getLocationById } from '../controllers/locationsController.js'

const router = express.Router()

// GET /api/locations - Get all locations
router.get('/', getAllLocations)

// GET /api/locations/:id - Get location by ID
router.get('/:id', getLocationById)

export default router

