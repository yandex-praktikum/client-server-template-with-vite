import dotenv from 'dotenv'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'

dotenv.config()

import express, { Request, Response } from 'express'
import { createClientAndConnect } from './db'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

// Раздаем всю статику нашего приложения
const pathToShared = path.join(__dirname, '../shared')
app.use(express.static(path.join(pathToShared, 'dist'), { index: false }))

app.use('/', async (_: Request, res: Response) => {
  // Берем index bз продакшн билда
  const template = await fs.readFile(
    path.join(pathToShared, 'dist/index.html'),
    'utf-8'
  )

  // Получаем путь до сбилдженого модуля клиента, чтобы не тащить средства сборки клиента на сервер
  const pathToServer = require.resolve(
    path.join(pathToShared, '/ssr-build/entry-server.cjs')
  )
  // Импортируем этот модуль и вызываем с инишл стейтом
  const appHtml = (await import(pathToServer)).render()

  // Добавляем в шаблон разметку и наш скрип с стейтом
  const html = template.replace('<!--app-html-->', appHtml)

  res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
})

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
