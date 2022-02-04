const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();
const authorization = require("../config/authorize")
var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const dataSchema = Schema({
    year: Number,
    retire: Number,
    entrance: Number
},{
    collection: 'data'
});

let data
try {
    data = mongoose.model('data')
} catch (error) {
    data = mongoose.model('data', dataSchema);
}

const getData = () => {
    return new Promise((resolve,reject) => {
        data.find({}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get products!'));
                }
            }
        })
    })
}

router.route('/data').get(authorization , (req, res) => {
    console.log("getData")
    getData().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router