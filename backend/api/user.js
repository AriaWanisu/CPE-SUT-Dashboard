const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();

var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const userSchema = Schema({
    email:      { type: String, unique: true },
    password:   String,
    role:       String,
    firstName:  String,
    lastName:   String,
    sex:        String,
    phone:      String,
    img:        String,
},{
    collection: 'users'
});

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}

const getUser = (id) => {
    return new Promise((resolve,reject) => {
        User.findOne({email: id}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Not Found'));
                }
            }
        })
    })
}

router.route('/user/:id').get((req, res) => {
    const id = req.params.id;
    getUser(id).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router