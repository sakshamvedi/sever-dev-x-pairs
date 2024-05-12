const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: mongoose.Schema.Types.Mixed,
})
const userModel = mongoose.model('User', userSchema);
module.exports = { userModel };