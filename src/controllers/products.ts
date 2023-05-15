import { Request, Response } from 'express'
import { ProductModel } from './../models/product_model'
import { asyncWrapper } from './../middleware/async_wrapper'

interface QueryObject {
  featured?: boolean
  company?: string
  name?: string
}

export const getAllProducts = asyncWrapper(
  async (req: Request, res: Response) => {
    const { featured, company, name, sort } = req.query

    const queryObject: QueryObject = {}
    if (featured) {
      queryObject.featured = featured === 'true' ? true : false
    }

    if (company) {
      queryObject.company = company as string
    }

    if (name) {
      queryObject.name = {
        $regex: name as string,
        $options: 'i',
      } as unknown as string
    }

    // console.log(queryObject)

    let result = ProductModel.find(queryObject)
    if (sort) {
      console.log(sort)
      const sortList = (sort as string).split(',').join(' ')
      console.log(sortList)
      result = result.sort(sortList)
    } else {
      result = result.sort('createdAt')
    }
    const products = await result
    res.status(200).json({ products, nbHits: products.length })
  }
)

export const getAllProductsStatic = async (req: Request, res: Response) => {
  const products = await ProductModel.find({}).sort('-name price')
  res.status(200).json({ products, nbHits: products.length })
}
