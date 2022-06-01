const express = require('express')
const uuid = require('uuid')
const app = express()
const users = []
app.use(express.json())

// verificar usuário
app.get('/user', (req, res) => {
    return res.status(201).json(users)
})
// criar usuário
app.post('/user', (req, res) => {
    const {name, age} = req.body
    const user = {id: uuid.v4(), name, age}
    users.push(user) 
    return  res.status(201).json(users)
})
// atualizar usuário
app.put('/user/:id', (req, res) => {
    const { id } = req.params
    const { name, age } = req.body
    const updateUsers = { id, name, age }
    const i = users.findIndex(user => user.id === id)
    if(i < 0) {
        return res.status(404).json({message: "User Not Found"})
    }
    users[i] = updateUsers
    return res.json(updateUsers)
})
// deletar usuário
app.delete('/user/:id' ,(req, res) => {
    const { id } = req.params
    const i = users.findIndex(user => user.id === id)
    if(i < 0){
        return res.status(404).json({message : "User Not Found"})
    }
    users.splice( i, 1 )
    return res.status(204).json()
})
app.listen(3003)