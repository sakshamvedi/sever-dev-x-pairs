const { default: mongoose } = require("mongoose");
const authSchema = new mongoose.Schema({
    email: String,
    displayName: String,
    photoURL: String,
    uid: String
});

const userModel = mongoose.model('authusers', authSchema);

module.exports = { userModel };
