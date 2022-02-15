const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();
const authorization = require("../config/authorize")
var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const StudentSchema = Schema({
    term: String,
    course: String,
    year1: Number,
    year2: Number,
    year3: Number,
    year4: Number,
    year5up: Number,
    total: Number
},{
    collection: 'student'
});

let student
try {
    student = mongoose.model('student')
} catch (error) {
    student = mongoose.model('student', StudentSchema);
}

const getStudent = () => {
    return new Promise((resolve,reject) => {
        student.find({}, (err,data) =>{
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


router.route('/student').get(authorization, (req, res) => {
    getStudent().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router