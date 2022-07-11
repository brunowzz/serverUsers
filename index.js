const express = require('express')
const uuid = require('uuid')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3003
const users = []
app.use(express.json())
app.use(cors())

const firstMiddleware = (req, res, next) => {
    const { id } = req.params
    const i = users.findIndex(user => user.id === id)
    if(i < 0){
        return res.status(404).json({ error: "User Not Found" })
    }
    req.userIndex = i
    req.userId = id
    next()
}

app.get('/user', (req, res) => {
    return res.status(201).json(users)
})

app.post('/user', (req, res) => {
    const { name, age} = req.body
    const newUser = {id: uuid.v4(), name, age}
    users.push(newUser)
    return res.status(201).json(newUser)
})

app.delete('/user/:id', firstMiddleware, (req, res) => {
    const { name, age } = req.body
    const i = req.userIndex
    const id = req.userId
    users.splice(i , 1)
    return res.status(204).json()
})
app.listen(port, () => {
    console.log(`Servidor está rodando`)
})







