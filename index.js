const connectToMongoDB = require('./mongodb.config');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express()
const port = 3001;
const crypto = require("crypto");
const Razorpay = require('razorpay');

const { userModel } = require('./models/user.model');
const { walletModel } = require('./models/walllet.model');
app.use(cors({
    origin: '*',
}));

app.get('/payment', (req, res) => {
    var instance = new Razorpay({
        key_id: 'rzp_test_aij1VSFIpBU1C5',
        key_secret: '9CZ9neRMXoNeEKAZiy9cdMTJ',
    });

    var options = {
        amount: 5000,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function (err, order) {
        res.send(order);
        if (err) {
            console.log(err)
        }
    });


})


connectToMongoDB();
app.use(express.json());
app.use(cors());


app.post("/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const sha = crypto.createHmac("sha256", "9CZ9neRMXoNeEKAZiy9cdMTJ");
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
        return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
    });
});

app.post('/walletModel', async (req, res) => {
    const { userid, balance } = req.body;
    const wallet = new walletModel({
        userid: userid,
        balance: balance,
    });
    const isUserPresent = await walletModel.findOne({ userid: userid });
    if (isUserPresent) {
        isUserPresent.balance = parseInt(isUserPresent.balance) + parseInt(balance);
        await isUserPresent.save();
    }
    else {
        await wallet.save();
    }
    console.log(wallet);
    res.status(200).send('Wallet added');
});


app.post('/walletmoney', async (req, res) => {
    const uid = req.body.uid;
    const wallet = await walletModel.findOne({ userid: uid });
    if (!wallet) {
        return res.status(404).send('Wallet not found');
    }
    res.status(200).send(wallet);
});



// app.post('/wallet', async (req, res) => {
//     const userId = req.body.userId;
//     const wallet = req.body.wallet;

//     try {
//         const user = await userModel.findById(userId);
//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         user.wallets.push(wallet);
//         await user.save();

//         res.status(200).send('Wallet added to user');
//     } catch (err) {
//         res.status(500).send('Error');
//     }
// });



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})