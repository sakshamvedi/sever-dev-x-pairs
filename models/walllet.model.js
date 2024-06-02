const { default: mongoose } = require("mongoose")

const walletSchema = new mongoose.Schema({
    userid: String,
    balance: String || Number,
    count: String || Number,
})
const walletModel = mongoose.model('wallet', walletSchema);
module.exports = { walletModel };