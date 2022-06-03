const express = require('express')
const uuid = require('uuid')
const app = express()
const users = []
app.use(express.json())

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

// verificar usuário
app.get('/user', (req, res) => {
    return res.status(201).json(users)
})
// criar usuário
app.post('/user', (req, res) => {
    const { name, age} = req.body
    const newUser = {id: uuid.v4(), name, age}
    users.push(newUser)
    return res.status(201).json(newUser)
})
// atualizar usuário
app.put('/user/:id', firstMiddleware, (req, res) => {
    const { name, age } = req.body
    const i = req.userIndex
    const id = req.userId
    const upUsers = { id, name, age}
    users[i] = upUsers
    return res.json(upUsers)
})
// deletar usuário
app.delete('/user/:id', firstMiddleware, (req, res) => {
    const { name, age } = req.body
    const i = req.userIndex
    const id = req.userId
    users.splice(i , 1)
    return res.status(204).json()
})
app.listen(3003)







