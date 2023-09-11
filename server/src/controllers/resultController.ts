import { Request, Response } from 'express'
import { userModel } from '../models/user'
import { validationResult } from 'express-validator'

const ResultController = {
  getResult: async function (req: Request, res: Response) {
    try {
      const errors = validationResult(req.body)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array(),
          },
        })
      }

      // const { email, number } = req.body

      // let results = await User.find({ number })

      // if (results.length === 0) {
      //   results = await User.find({ $or: [{ email }, { number }] })
      // }

      // return res.status(200).json(results)

      const transformedObject: { [key: string]: any } = Object.entries(
        req.body
      ).reduce((acc: { [key: string]: any }, [k, v]: [string, any]) => {
        if (v) acc[k] = v
        return acc
      }, {})

      const result = await userModel.find(transformedObject)

      return res.status(200).json(result)
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!',
      })
    }
  },
}

export default ResultController
