/* eslint-disable no-useless-escape */
const fsPromises = require('fs/promises')
const { PrismaClient } = require('@prisma/client')
const express = require('express')
const cors = require('cors')

const LOG_FILE = 'logs/access-log.txt'
const port = process.env.PORT || 3333

const prisma = new PrismaClient()
const app = express()

// timer middleware
const timer = (req, res, next) => {
  const date = new Date()
  req.requestDate = date.toUTCString()
  next()
}

// logger middleware
const logger = async (req, res, next) => {
  try {
    const log = `${req.requestDate} ${req.method} "${req.originalUrl}" from ${req.ip} ${req.headers['user-agent']}\n`
    await fsPromises.appendFile(LOG_FILE, log, 'utf-8')
  } catch (e) {
    console.error(`Error: can't write in ${LOG_FILE}`)
  } finally {
    next()
  }
}

// shower middleware
const shower = async (req, res, next) => {
  const log = `${req.requestDate} ${req.method} "${req.originalUrl}" from ${req.ip} ${req.headers['user-agent']}`
  console.log(log)
  next()
}

app.use(cors())
app.use(express.urlencoded({ extended: false })) // to support URL-encoded bodies
app.use(express.json()) // to support JSON-encoded bodies
app.use(timer)
app.use(logger)
app.use(shower)

app.get('/address', async (req, res) => {
  const { address } = req.query
  let streetNumber = ''
  // Clean and split request
  let address1 = address.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+°,\-.\/:;<=>?@\[\]^_`{|}~]/g, " ")
    .replace(/\s{2,}/g, " ")
    .toUpperCase()
    .split(' ')
  // Check if request start with a street number to use parameter for quering database
  if (!isNaN(Number(address1[0]))) {
    streetNumber = address1[0]
    address1.shift()
  } else {
    streetNumber = '%%'
  }
  // Format address request array for quering db_75 database using LIKE parameter
  address1.unshift('%')
  address1.push('%')
  let addressQuery = address1.join('%')

  const main = async () => {
    const results = await prisma.$queryRaw`SELECT id,adresse,lon,lat FROM db_75 WHERE adresse ILIKE ${addressQuery} AND numero ILIKE ${streetNumber} ORDER BY numero LIMIT 25;`
    console.log(results)
    console.log(results.length)
    res.json(results)
  }

  main()
    .catch((e) => {
      console.error(e)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
})

app.post('/addressforxy', async (req, res) => {
  const { x, y } = req.body
  console.log(x, 'x')
  console.log(y, 'y')

  const main = async () => {
    const results = await prisma.$queryRaw`SELECT adresse FROM db_75 WHERE lon = ${x} AND lat = ${y};`
    console.log(results)
    res.json(results)
  }

  main()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
})

app.listen(port, () =>
  console.log(`server ready at: http://localhost:${port}`),
)
