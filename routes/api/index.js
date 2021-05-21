const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/rates', async (req, res) => {
    if((typeof req.query.base == "undefined") || (typeof req.query.currency == "undefined")){
        return res.json({ message: "Welcome to McCollins Technologies. You can make a typical request like this: 'enye-collins-api.herokuapp.com/api/rates?base=usd&currency=cny,jpy,cad' " });
    }
    let homeBase = req.query.base.toUpperCase();
    let currencies = req.query.currency.toUpperCase();
    currencies = currencies.split(',')
    let rates = { };
    let results = { };
    let today
    const init = async() => {
        try{
            const load = await axios.get(`https://api.exchangeratesapi.io/latest?base=${homeBase}`) //http://api.currencylayer.com/live?access_key=b07c399d959e819f28ec07b9724cd659
            console.log(load.status)
            if (load.status == 200){
                let retLoad = load.data
                today = retLoad.date
                let retCurrencies = retLoad.rates
                for (let i=0; i<currencies.length; i++){
                    //console.log(currencies[i])
                    //console.log(retCurrencies[currencies[i]])
                    rates[currencies[i]] = retCurrencies[currencies[i]]
                }
                console.log(rates)
                results["base"] = homeBase
                results["date"] = today
                results["rates"] = rates
                return res.send(results);
            }else{
                return res.send("Internal server error");
            }
        } catch(e) {
            console.log(e)
            return res.send("Internal server error, check that you are connected to the internet and try again");
        }

    };
    init();
});

module.exports = router;
