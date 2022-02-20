const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();
const authorization = require("../config/authorize")
var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const subjectSchema = Schema({
    year: Number,
    term: Number,
    subject: Number,
    a: Number,
    b_plus: Number,
    b: Number,
    c_plus: Number,
    d_plus: Number,
    d: Number,
    f: Number,
    p: Number,
    s: Number,
    u: Number,
    total: Number,
    avg_GPA: Number,
    STDEV: Number
},{
    collection: 'subject'
});

let subject
try {
    subject = mongoose.model('subject')
} catch (error) {
    subject = mongoose.model('subject', subjectSchema);
}

const getSubject = () => {
    return new Promise((resolve,reject) => {
        subject.find({}, (err,data) =>{
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


router.route('/subject').get(authorization, (req, res) => {
    getSubject().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router