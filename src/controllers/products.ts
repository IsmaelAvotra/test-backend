import { Request, Response } from 'express'
import { ProductModel } from './../models/product_model'
import { asyncWrapper } from './../middleware/async_wrapper'

interface QueryObject {
  featured?: boolean
  company?: string
  name?: string
}

type OperatorMap = {
  [key: string]: string
}

export const getAllProducts = asyncWrapper(
  async (req: Request, res: Response) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query

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

    if (numericFilters) {
      const operatorMap: OperatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
      }
      const regEx = /\b(<|>|>=|=|<|<=)\b/g
      let filters = (numericFilters as string).replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
      )
      console.log(filters)
    }

    // console.log(queryObject)

    let result = ProductModel.find(queryObject)
    // sort
    if (sort) {
      const sortList = (sort as string).split(',').join(' ')
      result = result.sort(sortList)
    } else {
      result = result.sort('createdAt')
    }

    if (fields) {
      const fieldsList = (fields as string).split(',').join(' ')
      result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({ products, nbHits: products.length })
  }
)

export const getAllProductsStatic = async (req: Request, res: Response) => {
  const products = await ProductModel.find({
    price: { $gt: 30, $lt: 50 },
  })
    .sort('price')
    .select('name price')
  res.status(200).json({ products, nbHits: products.length })
}
