const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://rishabhkumarsingh94:23UzpdOdVjxaJFKP@cluster0.fc7lnvw.mongodb.net/upi')

mongoose.connect('mongodb+srv://rishabhkumarsingh94:23UzpdOdVjxaJFKP@cluster0.fc7lnvw.mongodb.net/upi', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('Connection error', err));


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);

module.exports = {
    User,
    Account
}