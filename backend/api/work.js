const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();
const authorization = require("../config/authorize")
var Schema = require('mongoose').Schema;
var uniqueValidator = require('mongoose-unique-validator');

var Schema = require('mongoose').Schema;
const WorkSchema = Schema({
    year: { type: Number, unique: true },
    total: Number,
    answer: Number,
    percentAnswer: Number,
    getWork: Number,
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
WorkSchema.plugin(uniqueValidator)

let Work
try {
    Work = mongoose.model('work')
} catch (error) {
    Work = mongoose.model('work', WorkSchema);
}

const getWork = () => {
    return new Promise((resolve,reject) => {
        Work.find({}, (err,data) =>{
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

const insertWork = (data) => {
    return new Promise ((resolve, reject) => {
        var new_work = new Work({
            year: data.year,
            total: data.total,
            answer: data.answer,
            percentAnswer: data.percentAnswer,
            getWork: data.getWork,
            percentGetWork: data.percentGetWork,
            study: data.study,
            pecrentStudy: data.pecrentStudy,
            notWork: data.notWork,
            percentNotWork: data.percentNotWork,
            workEarly: data.workEarly,
            percentWorkEarly: data.percentWorkEarly,
            avgSalary: data.avgSalary,
            relevance: data.relevance
        });
        new_work.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert work to DB!'));
            }else{
                resolve({message: 'Add work successfully'});
            }
        });
    });
}

const updateWork = (id,data) => {
    return new Promise((resolve,reject) => {
        Work.updateOne({_id: id}, { year: data.year, total: data.total, 
                                    answer: data.answer, percentAnswer: data.percentAnswer,  
                                    getWork: data.getWork, percentGetWork: data.percentGetWork,
                                    study: data.study, pecrentStudy: data.pecrentStudy,
                                    notWork: data.notWork, percentNotWork: data.percentNotWork,
                                    workEarly: data.workEarly, percentWorkEarly: data.percentWorkEarly,
                                    avgSalary: data.avgSalary, relevance: data.relevance,
                        }, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

const deleteWork = (id) => {
    return new Promise((resolve,reject) => {
        Work.deleteOne({_id: id}, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'Work Delete'})
            }
        });
    });
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

router.route('/work').post(authorization, (req, res) => {
    const playload = {
        year:               req.body.year,
        total:              req.body.total,
        answer:             req.body.answer,
        percentAnswer:      req.body.percentAnswer,
        getWork:            req.body.getWork,
        percentGetWork:     req.body.percentGetWork,
        study:              req.body.study,
        pecrentStudy:       req.body.pecrentStudy,
        notWork:            req.body.notWork,
        percentNotWork:     req.body.percentNotWork,
        workEarly:          req.body.workEarly,
        percentWorkEarly:   req.body.percentWorkEarly,
        avgSalary:          req.body.avgSalary,
        relevance:          req.body.relevance
    }
    console.log(playload);
    insertWork(playload).then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/work/:id').put((req, res) => {
    const id = req.params.id;
    const playload = {
        year:               req.body.year,
        total:              req.body.total,
        answer:             req.body.answer,
        percentAnswer:      req.body.percentAnswer,
        getWork:            req.body.getWork,
        percentGetWork:     req.body.percentGetWork,
        study:              req.body.study,
        pecrentStudy:       req.body.pecrentStudy,
        notWork:            req.body.notWork,
        percentNotWork:     req.body.percentNotWork,
        workEarly:          req.body.workEarly,
        percentWorkEarly:   req.body.percentWorkEarly,
        avgSalary:          req.body.avgSalary,
        relevance:          req.body.relevance
    }
    updateWork(id,playload).then(data => {
        console.log(data);
        const status = true;
        res.status(200).json({data, status});
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/work/:id').delete(authorization, (req, res) => {
    const id = req.params.id;
    deleteWork(id).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router