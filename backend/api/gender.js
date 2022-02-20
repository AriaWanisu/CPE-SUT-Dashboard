const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();
const authorization = require("../config/authorize")
var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const genderSchema = Schema({
    term: Number,
    course: String,
    male: Number,
    female: Number,
    total: Number
},{
    collection: 'gender'
});

let gender
try {
    gender = mongoose.model('gender')
} catch (error) {
    gender = mongoose.model('gender', genderSchema);
}

const getGender = () => {
    return new Promise((resolve,reject) => {
        gender.find({}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get gender!'));
                }
            }
        })
    })
}


router.route('/gender').get(authorization, (req, res) => {
    getGender().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router