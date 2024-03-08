require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User');
const app = express()
const port = 8000;


// Connexion à la base de données
const url = process.env.MONGO_URL;
function connect(){
    try{
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database');
    }
    catch(err){
        console.log(err);
    }
}
connect();

app.use(express.json());

//Route get pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
    User.find()
    .then((users) => {
        res.json(users);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    });
});

//Route post pour ajouter un utilisateur
app.post('/users', (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then((user) => {
        res.json(user);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    });
});

// Route PUT pour modifier un utilisateur par ID
app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la modification de l\'utilisateur' });
    });
});

// Route DELETE pour supprimer un utilisateur par ID
app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((user) => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    });
});

//Démarrer le serveur
app.listen(port,
    console.log(`Server running at http://localhost:${port}`)
)