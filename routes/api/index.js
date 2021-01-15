const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/rates', async (req, res) => {
    let homeBase = req.query.base.toUpperCase();
    let currencies = req.query.currency.toUpperCase();
    currencies = currencies.split(',')
    let rates = { };
    let results = { };
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

module.exports = router;