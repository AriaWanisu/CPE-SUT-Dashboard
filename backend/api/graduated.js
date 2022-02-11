const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();
const authorization = require("../config/authorize")
var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const graduatedSchema = Schema({
    year: String,
    early: Number,
    normal: Number,
    over: Number,
    other: Number
},{
    collection: 'graduated'
});

let graduated
try {
    graduated = mongoose.model('graduated')
} catch (error) {
    graduated = mongoose.model('graduated', graduatedSchema);
}

const getGraduated = () => {
    return new Promise((resolve,reject) => {
        graduated.find({}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get graduated!'));
                }
            }
        })
    })
}


router.route('/graduated').get((req, res) => {
    getGraduated().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router