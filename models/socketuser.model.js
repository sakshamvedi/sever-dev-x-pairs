const { default: mongoose } = require("mongoose")

const socketSchema = new mongoose.Schema({
    socketid: String,
    username: String,
    userid: String,
})
const socketModel = mongoose.model('SocketUser', socketSchema);
module.exports = { socketModel };