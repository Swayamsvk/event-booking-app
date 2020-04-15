const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name :"";
    data.email = !isEmpty(data.email) ? data.email :"";
    data.passsword = !isEmpty(data.passsword) ? data.passsword :"";
    data.passsword2 = !isEmpty(data.passsword2) ? data.passsword2 :"";
    
    if(Validator.isEmpty(data.name)){
        errors.name="Name field is required"
    }
    
    if(Validator.isEmpty(data.email)){
        errors.email="Email field is required"
    }
    else if(!Validator.isEmail(data.email)){
        errors.email="Email is invalid"
    }
    
    if(Validator.isEmpty(data.passsword)){
        errors.passsword=" Password is required"
    }
    
    if(Validator.isEmpty(data.passsword2)){
        errors.passsword2="Confirm password field is required"
    }
    if(Validator.isLength(data.passsword,{min:6,max:30})){
        errors.passsword = "Password must be atleast 6 characters";
    }
    
    if(!Validator.equals(data.passsword,data.passsword2)){
        errors.passsword2="Passwords should match"
    }
    
    return {
        errors,
        isValid:isEmpty(errors)
    };


};

