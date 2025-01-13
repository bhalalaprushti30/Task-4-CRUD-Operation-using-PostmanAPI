const express = require('express');
const bodyParser = require('body-parser');
const app = express();

console.log('Starting server...');

app.use(bodyParser.json());

let users = [
    { id: 1, name: "Prushti", email: "prushti@gmail.com", age: 19 },
    { id: 2, name: "Nirav", email: "nirav@gmail.com", age: 15 }
];

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.get('/users', (req, res) => {
    console.log('GET /users called');
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    console.log(`GET /users/${req.params.id} called`);
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
});

app.post('/users', (req, res) => {
    console.log('POST /users called');
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    const newUser = { id: users.length + 1, name, email, age };
    users.push(newUser);

    res.status(201).send(newUser);
});

app.put('/users/:id', (req, res) => {
    console.log(`PUT /users/${req.params.id} called`);
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    const { name, email, age } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.age = age || user.age;

    res.send(user);
});

app.delete('/users/:id', (req, res) => {
    console.log(`DELETE /users/${req.params.id} called`);
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).send({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
