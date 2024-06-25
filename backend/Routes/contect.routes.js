import exprees from 'express'
import { contect } from '../Controller/contect.controller.js'

export const contectRoute = exprees.Router()

contectRoute.post("/contect", contect)

