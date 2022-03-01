const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();
const authorization = require("../config/authorize")
var Schema = require('mongoose').Schema;
var uniqueValidator = require('mongoose-unique-validator');

var Schema = require('mongoose').Schema;
const genderSchema = Schema({
    term: { type: Number, unique: true },
    course: String,
    male: Number,
    female: Number,
    total: Number
},{
    collection: 'gender'
});
genderSchema.plugin(uniqueValidator)

let Gender
try {
    Gender = mongoose.model('gender')
} catch (error) {
    Gender = mongoose.model('gender', genderSchema);
}

const getGender = () => {
    return new Promise((resolve,reject) => {
        Gender.find({}, (err,data) =>{
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

const insertGender = (data) => {
    return new Promise ((resolve, reject) => {
        var new_gender = new Gender({
            term: data.term,
            course: data.course,
            male: data.male,
            female: data.female,
            total: data.total
        });
        new_gender.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert gender to DB!'));
            }else{
                resolve({message: 'Add gender successfully'});
            }
        });
    });
}

const updateGender = (id,data) => {
    return new Promise((resolve,reject) => {
        Gender.updateOne({_id: id}, {term: data.term, male: data.male, female: data.female ,  total: data.total  }, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

const deleteGender = (id) => {
    return new Promise((resolve,reject) => {
        Gender.deleteOne({_id: id}, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'Gender Delete'})
            }
        });
    });
}

router.route('/gender').post(authorization, (req, res) => {
    const playload = {
        term: req.body.term,
        course: req.body.course,
        male: req.body.male,
        female: req.body.female,
        total: req.body.total
    }
    console.log(playload);
    insertGender(playload).then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

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

router.route('/gender/:id').put((req, res) => {
    const id = req.params.id;
    const playload = {
        term: req.body.term,
        course: req.body.course,
        male: req.body.male,
        female: req.body.female,
        total: req.body.total
    }
    updateGender(id,playload).then(data => {
        console.log(data);
        const status = true;
        res.status(200).json({data, status});
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/gender/:id').delete(authorization, (req, res) => {
    const id = req.params.id;
    deleteGender(id).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router