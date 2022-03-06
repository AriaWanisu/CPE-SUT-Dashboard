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
    term3: Number,
    avg: Number
},{
    collection: 'score'
});

let Score
try {
    Score = mongoose.model('score')
} catch (error) {
    Score = mongoose.model('score', scoreSchema);
}

const getScore = () => {
    return new Promise((resolve,reject) => {
        Score.find({}, (err,data) =>{
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

const insertScore = (data) => {
    return new Promise ((resolve, reject) => {
        var new_score = new Score({
            year: data.year,
            institute: data.institute,
            term1: data.term1,
            term2: data.term2,
            term3: data.term3,
            avg: data.avg
        });
        new_score.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert score to DB!'));
            }else{
                resolve({message: 'Add score successfully'});
            }
        });
    });
}

const updateScore = (id,data) => {
    return new Promise((resolve,reject) => {
        Score.updateOne({_id: id}, {year: data.year, institute: data.institute, term1: data.term1 ,  term2: data.term2,  term3: data.term3,  avg: data.avg  }, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

const deleteScore = (id) => {
    return new Promise((resolve,reject) => {
        Score.deleteOne({_id: id}, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'score Delete'})
            }
        });
    });
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

router.route('/score').post(authorization, (req, res) => {
    const playload = {
        year: req.body.year,
        institute: req.body.institute,
        term1: req.body.term1,
        term2: req.body.term2,
        term3: req.body.term3,
        avg: req.body.avg
    }
    console.log(playload);
    insertScore(playload).then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/score/:id').put((req, res) => {
    const id = req.params.id;
    const playload = {
        year: req.body.year,
        institute: req.body.institute,
        term1: req.body.term1,
        term2: req.body.term2,
        term3: req.body.term3,
        avg: req.body.avg
    }
    updateScore(id,playload).then(data => {
        console.log(data);
        const status = true;
        res.status(200).json({data, status});
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/score/:id').delete(authorization, (req, res) => {
    const id = req.params.id;
    deleteScore(id).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router