import { NextFunction, Request, Response } from 'express'

const timeOut = (req: Request, res: Response, next: NextFunction) => {
  setTimeout(function () {
    next()
  }, 5000)
}
export default timeOut
