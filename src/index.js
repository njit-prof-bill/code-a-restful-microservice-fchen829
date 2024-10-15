const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let users = [];
let currentId = 1;

// POST
app.post('/users', (req, res) =>{
    const{name, email} = req.body;
    if(!name){
        return res.status(400).json({ error: 'Name is required' });
    }
    if(!email){
        return res.status(400).json({ error: 'Email is required' });
    }    
    const user ={id: currentId++, name, email};
    users.push(user);
    res.status(201).json(user); 
});

// GET
app.get('/users/:id', (req, res) =>{
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if(user){
        res.json(user); 
    } 
    else{
        res.status(404).json({ error: 'User not found' }); 
    }
});

// PUT 
app.put('/users/:id', (req, res) =>{
    const userId = parseInt(req.params.id, 10);
    const{ name, email } = req.body;
    
    if(!name){
        return res.status(400).json({ error: 'Name is required' });
    }
    if(!email){
        return res.status(400).json({ error: 'Email is required' });
    }
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1){
        users[userIndex] ={ id: userId, name, email }; 
        res.json(users[userIndex]); 
    } 
    else{
        res.status(404).json({ error: 'User not found' }); 
    }
});

// DELETE 
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        users = users.filter(u => u.id !== userId);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test'){
    app.listen(port, () =>{
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing