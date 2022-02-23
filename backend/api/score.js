const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();
const authorization = require("../config/authorize")
var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const scoreSchema = Schema({
    year: Number,
    institute: String,
    term1: Number,
    term2: Number,
    term3: Number
},{
    collection: 'score'
});

let score
try {
    score = mongoose.model('score')
} catch (error) {
    score = mongoose.model('score', scoreSchema);
}

const getScore = () => {
    return new Promise((resolve,reject) => {
        score.find({}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get score!'));
                }
            }
        })
    })
}


router.route('/score').get(authorization, (req, res) => {
    getScore().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router