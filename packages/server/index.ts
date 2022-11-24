import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
dotenv.config()

// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'

import express from 'express'
import { createClientAndConnect } from './db'

const app = express()
app.use(cors())

const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.get('/ssr-example', (_, res) => {
  const result = render()
  const template = path.resolve(__dirname, '../client/dist/client/index.html')
  const htmlString = fs.readFileSync(template, 'utf-8')
  const newString = htmlString.replace('<!--ssr-outlet-->', result)
  res.send(newString)
})

app.use(express.static(path.resolve(__dirname, '../client/dist/client')))

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
