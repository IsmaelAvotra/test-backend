import express from 'express'
export const productsRouter = express.Router()

import { getAllProducts, getAllProductsStatic } from '../controllers/products'

productsRouter.route('/').get(getAllProducts)
productsRouter.route('/static').get(getAllProductsStatic)
