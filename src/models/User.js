const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
      },
      password : {
        type : String,
        required : true 
      }
})
const User = module.exports = mongoose.model('User', userSchema)
// userSchema.pre('save', async function (next) {
//     const user = this;
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;
//     next();
// });
// userSchema.methods.isValidPassword  = async function() {
//     // Generate an auth token for the user
//     const user = this;
//     const compare = await bcrypt.compare(password, user.password);
//     return compare;
// }

// userSchema.statics.findByCredentials = async (email, password) => {
//     // Search for a user by email and password.
//     const user = await User.findOne({ email} )
//     if (!user) {
//         throw new Error({ error: 'Invalid login credentials' })
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password)
//     if (!isPasswordMatch) {
//         throw new Error({ error: 'Invalid login credentials' })
//     }
//     return user
// }
module.exports.addUser=function(newUser, callback){
    bcrypt.genSalt(10, (error, salt)=>{
        bcrypt.hash(newUser.password, salt, (error,hash)=>{
            if(error){
                throw error;
            }
            newUser.password= hash;
            newUser.save(callback);
        })
    })
}
module.exports.getUserById = function(id, callback){
    User.findById(id,callback);
}
module.exports.getUserByEmail= function(email, callback){
    const query= {email:email}
    User.findOne(query, callback);

}
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword,hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    })
}
module.exports = User;