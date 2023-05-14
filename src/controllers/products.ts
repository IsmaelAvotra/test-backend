import { Request, Response } from 'express'
import { ProductModel } from './../models/product_model'
import { asyncWrapper } from './../middleware/async_wrapper'

interface QueryObject {
  featured?: boolean
}

export const getAllProducts = asyncWrapper(
  async (req: Request, res: Response) => {
    const { featured } = req.query

    const queryObject: QueryObject = {}
    if (featured) {
      queryObject.featured = featured === 'true' ? true : false
    }

    console.log(queryObject)

    const products = await ProductModel.find(queryObject)
    res.status(200).json({ products, nbHits: products.length })
  }
)

export const getAllProductsStatic = async (req: Request, res: Response) => {
  const products = await ProductModel.find({
    name: 'vase table',
  })
  res.status(200).json({ products, nbHits: products.length })
}
