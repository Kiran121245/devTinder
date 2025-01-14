const validator = require('validator');

const validateSignUpData = (req)=>{
    const { first_name, last_name, emailId, password } = req.body;
    if(!first_name || !last_name || !emailId || !password){
        throw new Error ("Please provide all the fields");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error ("Please provide a valid emailId");
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error ("Please provide a strong password");
    }
};

module.exports = {
    validateSignUpData,
};