const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();
const authorization = require("../config/authorize")
var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const WorkSchema = Schema({
    year: Number,
    total: Number,
    answer: Number,
    percentAnswer: Number,
    percentGetWork: Number,
    study: Number,
    pecrentStudy: Number,
    notWork: Number,
    percentNotWork: Number,
    workEarly: Number,
    percentWorkEarly: Number,
    avgSalary: Number,
    relevance: Number
},{
    collection: 'work'
});

let work
try {
    work = mongoose.model('work')
} catch (error) {
    work = mongoose.model('work', WorkSchema);
}

const getWork = () => {
    return new Promise((resolve,reject) => {
        work.find({}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get work!'));
                }
            }
        })
    })
}


router.route('/work').get(authorization, (req, res) => {
    getWork().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router