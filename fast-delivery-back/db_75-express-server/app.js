const fsPromises = require('fs/promises')
const { PrismaClient } = require('@prisma/client')
const express = require('express')
const cors = require('cors')

const LOG_FILE = 'logs/access-log.txt'
const PORT = 3333

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

app.get('/feed', async (req, res) => {
  const { adresse } = req.query
  let streetNumber = ''
  // Clean and split query
  let address1 = adresse.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
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

  try {

    // const results = await prisma.$queryRaw`SELECT adresse,id FROM db_75 WHERE numero LIKE'%56%' LIMIT 25`
    const results = await prisma.$queryRaw`SELECT adresse,id FROM db_75 WHERE adresse ILIKE ${addressQuery} AND numero ILIKE ${streetNumber} ORDER BY numero LIMIT 25;`

    /* const results = await prisma.db_75.findMany({
    where: {
      numero: {
        contains: 'A',
        },
    },
  })
  */

    res.json(results)
    console.log(adresse, 'adresse')
    console.log(streetNumber)
    console.log(address1, 'adresse 1')
    console.log(addressQuery, 'adresse query')
    console.log(results[0].adresse, 'first adresse result')
    console.log(results, 'all addresses result')
    console.log(results.length)

  }
  catch {
    ((e) => { throw e })
  }
  finally {
    (async () => {
      await prisma.$disconnect()
    })
  }
})


const server = app.listen(PORT, () =>
  console.log(`server ready at: http://localhost:${PORT}`),
)
