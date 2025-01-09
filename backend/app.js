import express from 'express'
import cors from 'cors'
import userRouter from './src/routes/users.js'
import notesRouter from './src/routes/notes.js'

const app = express()
app.set('port', process.env.PORT || 4000)
app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/notes', notesRouter)

export default app