const axios = require('axios');
const express = require('express');
const { isEmpty } = require('lodash');
const router = express.Router();

/*router.post('/add', async (req, res) => {
    if (isEmpty(req.body)) {
        return res.status(403).json({
            message: 'Body should not be empty',
            statusCode: 403
        });
    }
    const { name, msgTitle, msgContent } = req.body;

    const newUser = new User({
        msgTitle,
        name,
        msgContent,
        date: Date.now()
    });
    console.log(newUser)
    try {
        await newUser.save();
        res.json({
            message: 'Data successfully saved',
            statusCode: 200,
            name,
            msgTitle,
            msgContent
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({
            message: 'Internal Server error',
            statusCode: 500
        });
    }
});
*/

router.get('/rates', async (req, res) => {
    let homeBase = req.query.base.toUpperCase();
    let currencies = req.query.currency.toUpperCase();
    currencies = currencies.split(',')
    rates = { };
    results = { };
    let today
    const init = async() => {
        try{
            const load = await axios.get(`https://api.exchangeratesapi.io/latest?base=${homeBase}`)
            let retLoad = load.data
            today = retLoad.date
            let retCurrencies = retLoad.rates
            for (let i=0; i<currencies.length; i++){
                //console.log(currencies[i])
                //console.log(retCurrencies[currencies[i]])
                rates[currencies[i]] = retCurrencies[currencies[i]]
            }
            console.log(rates)
        } catch(e) {
            console.log(e)
        }
        results["base"] = homeBase
        results["date"] = today
        results["rates"] = rates
        return res.send(results);
    };
    init();
});

/*
router.post('/delete', async (req, res) => {
    if (isEmpty(req.body)) {
        return res.status(403).json({
            message: 'Body should not be empty',
            statusCode: 403
        });
    }
    const { messageId } = req.body;
    try {
        await User.deleteOne({_id:messageId});
        res.json({
            message: 'Data successfully deleted',
            statusCode: 200
        });
        console.log('deleted')
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({
            message: 'Internal Server error',
            statusCode: 500
        });
    }
});
*/
module.exports = router;