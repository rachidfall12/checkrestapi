const mongoose = require('mongoose')

//définir un schéma pour les users
var userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

//exporter le schéma
const User = mongoose.model('User', userSchema);
module.exports = User