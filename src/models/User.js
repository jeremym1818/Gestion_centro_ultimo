const bcrypt = require('bcryptjs/dist/bcrypt');
const {Schema,model} = require('mongoose')
require("bcryptjs");

const UserShema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true, 
        unique: true,
    },
    password:{
        type:String ,
        required:true
    },
    rol:{
        type:String ,
        required:true
    }

},{
timestamps:true
})

//sifrar nuestra contraseñas
UserShema.methods.encryptPassword = async password =>{
const salt = await bcrypt.genSalt(10);
return await bcrypt.hash(password,salt);//nos debuelve la contraseña ya cifrada
};


UserShema.methods.matchPassword = async function(password){
 return await bcrypt.compare(password,this.password)
}

module.exports = model('User',UserShema);