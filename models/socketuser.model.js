const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    socketid: String,
    username: String,
    userid: String,

})
const socketModel = mongoose.model('SocketUser', userSchema);
module.exports = { socketModel };