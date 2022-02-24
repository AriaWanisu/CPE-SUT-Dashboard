const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();
const authorization = require("../config/authorize")
var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const analysisSchema = Schema({
    index: String,
    text: String,
    editor: String
},{
    collection: 'analysis'
});

let Analysis
try {
    Analysis = mongoose.model('analysis')
} catch (error) {
    Analysis = mongoose.model('analysis', analysisSchema);
}

const getAnalysis = (index) => {
    return new Promise((resolve,reject) => {
        Analysis.findOne({index: index}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get analysis!'));
                }
            }
        })
    })
}

const getAllAnalysis = (index) => {
    return new Promise((resolve,reject) => {
        Analysis.find({}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get analysis!'));
                }
            }
        })
    })
}

const createAnalysis = (data) => {
    return new Promise ((resolve, reject) => {
        var new_analysis = new Analysis({
            index: data.index,
            text: data.text,
            editor: data.editor
        });
        new_analysis.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert cart to DB!'));
            }else{
                resolve({message: 'Add Analysis successfully'});
            }
        });
    });
}

const updateAnalysis = (index,data) => {
    return new Promise((resolve,reject) => {
        Analysis.updateOne({index: index}, {text: data.text, editor: data.editor }, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

router.route('/analysis').get(authorization, (req, res) => {
    getAllAnalysis().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/analysis/:id').get(authorization, (req, res) => {
    const index = req.params.id;
    getAnalysis(index).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/analysis/:id').get(authorization, (req, res) => {
    const index = req.params.id;
    getAnalysis(index).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/analysis').post(authorization, (req, res) => {
    const playload = {
        index: req.body.index,
        text: req.body.text,
        editor: req.body.editor
    }
    console.log(playload);
    createAnalysis(playload).then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/analysis/:index').put((req, res) => {
    const index = req.params.index;
    const playload = {
        text: req.body.text,
        editor: req.body.editor,
    }
    updateAnalysis(index,playload).then(data => {
        console.log(data);
        const status = true;
        res.status(200).json({data, status});
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router