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

let Graduated
try {
    Graduated = mongoose.model('graduated')
} catch (error) {
    Graduated = mongoose.model('graduated', graduatedSchema);
}

const getGraduated = () => {
    return new Promise((resolve,reject) => {
        Graduated.find({}, (err,data) =>{
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

const insertGraduated = (data) => {
    return new Promise ((resolve, reject) => {
        var new_Graduated = new Graduated({
            year: data.year,
            early: data.early,
            normal: data.normal,
            over: data.over,
            other: data.other
        });
        new_Graduated.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert Graduated to DB!'));
            }else{
                resolve({message: 'Add Graduated successfully'});
            }
        });
    });
}

const updateGraduated = (id,data) => {
    return new Promise((resolve,reject) => {
        Graduated.updateOne({_id: id}, {year: data.year, early: data.early, normal: data.normal ,  over: data.over,  other: data.other  }, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

const deleteGraduated = (id) => {
    return new Promise((resolve,reject) => {
        Graduated.deleteOne({_id: id}, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'Graduated Delete'})
            }
        });
    });
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

router.route('/graduated').post(authorization, (req, res) => {
    const playload = {
        year: req.body.year,
        early: req.body.early,
        normal: req.body.normal,
        over: req.body.over,
        other: req.body.other
    }
    console.log(playload);
    insertGraduated(playload).then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/graduated/:id').put((req, res) => {
    const id = req.params.id;
    const playload = {
        year: req.body.year,
        early: req.body.early,
        normal: req.body.normal,
        over: req.body.over,
        other: req.body.other
    }
    updateGraduated(id,playload).then(data => {
        console.log(data);
        const status = true;
        res.status(200).json({data, status});
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/graduated/:id').delete(authorization, (req, res) => {
    const id = req.params.id;
    deleteGraduated(id).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router