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
    subject: String,
    a: Number,
    b_plus: Number,
    b: Number,
    c_plus: Number,
    c:  Number,
    d_plus: Number,
    d: Number,
    f: Number,
    p: Number,
    s: Number,
    u: Number,
    total: Number,
    avg_gpa: Number,
    stdev: Number
},{
    collection: 'subject'
});

let Subject
try {
    Subject = mongoose.model('subject')
} catch (error) {
    Subject = mongoose.model('subject', subjectSchema);
}

const getSubject = () => {
    return new Promise((resolve,reject) => {
        Subject.find({}, (err,data) =>{
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

const listSubject = (subject) => {
    return new Promise((resolve,reject) => {
        Subject.find( {subject: subject} , (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get this Subject!'));
                }
            }
        })
    })
}

const getOneSubject = (id) => {
    return new Promise((resolve,reject) => {
        Subject.findOne( {_id: id} , (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get this Subject!'));
                }
            }
        })
    })
}

const getTargeteSubject = (data) => {
    return new Promise((resolve,reject) => {
        Subject.findOne( {year: data.year, term: data.term, subject: data.subject} , (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get this Subject!'));
                }
            }
        })
    })
}

const insertSubject = (data) => {
    return new Promise ((resolve, reject) => {
        var new_subject = new Subject({
            year:       data.year,
            term:       data.term,
            subject:    data.subject,
            a:          data.a,
            b_plus:     data.b_plus,
            b:          data.b,
            c_plus:     data.c_plus,
            c:          data.c,
            d_plus:     data.d_plus,
            d:          data.d,
            f:          data.f,
            p:          data.p,
            s:          data.s,
            u:          data.u,
            total:      data.total,
            avg_gpa:    data.avg_gpa,
            stdev:      data.stdev
        });
        new_subject.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert subject to DB!'));
            }else{
                resolve({message: 'Add subject successfully'});
            }
        });
    });
}

const updateSubject = (id,data) => {
    return new Promise((resolve,reject) => {
        Subject.updateOne({_id: id}, {
            year:       data.year,
            term:       data.term,
            subject:    data.subject,
            a:          data.a,
            b_plus:     data.b_plus,
            b:          data.b,
            c_plus:     data.c_plus,
            c:          data.c,
            d_plus:     data.d_plus,
            d:          data.d,
            f:          data.f,
            p:          data.p,
            s:          data.s,
            u:          data.u,
            total:      data.total,
            avg_gpa:    data.avg_gpa,
            stdev:      data.stdev}, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

const deleteSubject = (id) => {
    return new Promise((resolve,reject) => {
        Subject.deleteOne({_id: id}, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'subject Delete'})
            }
        });
    });
}

router.route('/subjects').get(authorization, (req, res) => {
    getSubject().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/targetSubject').put(authorization, (req, res) => {
    const playload = {
        year: req.body.year,
        term: req.body.term,
        subject: req.body.subject
    }
    getTargeteSubject(playload).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/subject/:sid').get(authorization, (req, res) => {
    const id = req.params.sid;
    getOneSubject(id).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/subject').put(authorization, (req, res) => {
    const playload = req.body.subject;
    listSubject(playload).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/subject').post(authorization, (req, res) => {
    const playload = {
        year:       req.body.year,
        term:       req.body.term,
        subject:    req.body.subject,
        a:          req.body.a,
        b_plus:     req.body.b_plus,
        b:          req.body.b,
        c_plus:     req.body.c_plus,
        c:          req.body.c,
        d_plus:     req.body.d_plus,
        d:          req.body.d,
        f:          req.body.f,
        p:          req.body.p,
        s:          req.body.s,
        u:          req.body.u,
        total:      req.body.total,
        avg_gpa:    req.body.avg_gpa,
        stdev:      req.body.stdev
    }
    console.log(playload);
    insertSubject(playload).then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/subject/:id').put((req, res) => {
    const id = req.params.id;
    const playload = {
        year:       req.body.year,
        term:       req.body.term,
        subject:    req.body.subject,
        a:          req.body.a,
        b_plus:     req.body.b_plus,
        b:          req.body.b,
        c_plus:     req.body.c_plus,
        c:          req.body.c,
        d_plus:     req.body.d_plus,
        d:          req.body.d,
        f:          req.body.f,
        p:          req.body.p,
        s:          req.body.s,
        u:          req.body.u,
        total:      req.body.total,
        avg_gpa:    req.body.avg_gpa,
        stdev:      req.body.stdev
    }
    updateSubject(id,playload).then(data => {
        console.log(data);
        const status = true;
        res.status(200).json({data, status});
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/subject/:id').delete(authorization, (req, res) => {
    const id = req.params.id;
    deleteSubject(id).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router