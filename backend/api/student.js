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

let Student
try {
    Student = mongoose.model('student')
} catch (error) {
    Student = mongoose.model('student', StudentSchema);
}

const getStudent = () => {
    return new Promise((resolve,reject) => {
        Student.find({}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get student!'));
                }
            }
        })
    })
}

const insertStudent = (data) => {
    return new Promise ((resolve, reject) => {
        var new_student = new Student({
            term: data.term,
            course: data.course,
            year1: data.year1,
            year2: data.year2,
            year3: data.year3,
            year4: data.year4,
            year5up: data.year5up,
            total: data.total
        });
        new_student.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert student to DB!'));
            }else{
                resolve({message: 'Add student successfully'});
            }
        });
    });
}

const updateStudent = (id,data) => {
    return new Promise((resolve,reject) => {
        Student.updateOne({_id: id}, {term: data.term, course: data.course, year1: data.year1 , year2: data.year2 , year3: data.year3 , year4: data.year4 , year5up: data.year5up , total: data.total  }, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

const deleteStudent = (id) => {
    return new Promise((resolve,reject) => {
        Student.deleteOne({_id: id}, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'Cart Delete'})
            }
        });
    });
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

router.route('/student').post(authorization, (req, res) => {
    const playload = {
        term: req.body.term,
        course: req.body.course,
        year1: req.body.year1,
        year2: req.body.year2,
        year3: req.body.year3,
        year4: req.body.year4,
        year5up: req.body.year5up,
        total: req.body.total
    }
    console.log(playload);
    insertStudent(playload).then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/student/:id').put((req, res) => {
    const id = req.params.id;
    const playload = {
        term: req.body.term,
        course: req.body.course,
        year1: req.body.year1,
        year2: req.body.year2,
        year3: req.body.year3,
        year4: req.body.year4,
        year5up: req.body.year5up,
        total: req.body.total
    }
    updateStudent(id,playload).then(data => {
        console.log(data);
        const status = true;
        res.status(200).json({data, status});
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/student/:id').delete(authorization, (req, res) => {
    const id = req.params.id;
    deleteStudent(id).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router