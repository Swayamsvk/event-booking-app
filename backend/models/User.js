const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
})

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password,this.password);
};

module.exports = User = mongoose.model('users',UserSchema);
