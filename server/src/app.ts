import express, { Request, Response } from 'express'
import chalk from 'chalk'
import cors from 'cors'
import { check, validationResult } from 'express-validator'

// import mongoose from 'mongoose'
// import { config } from 'dotenv'

import usersList from './mock/users.json'
import timeOut from './middleware/timeout.middleware'
// import ResultController from './controllers/resultController'
// import initializeData from './start/initDatabase'
// import User from './models/user'

// config()

const app = express()

const PORT: number = 8083

app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())

app.post('/api', timeOut, [
  check('email', 'Некорректный email').isEmail(),
  check('number', 'Введите число или оставьте поле пустым').matches(/^\d*$/),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
          },
        })
      }

      const { email, number } = req.body

      const result = usersList.filter((user) => {
        if (number) {
          return user.email === email && user.number === number
        }
        return user.email === email
      })

      return res.status(200).json(result)
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!',
      })
    }
  },
])

async function start(): Promise<void> {
  try {
    //  mongoose.connect(
    //   process.env.MONGO_URI
    // )
    // console.log(chalk.green(`MongoDB connected`))

    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}`))
    )
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.red(error.message))
      process.exit(1)
    } else {
      console.log('Unexpected error', error)
    }
  }
}

start()
