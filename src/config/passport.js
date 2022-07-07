const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

//autenticar loguiar al susuario
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done) => {
//confirmar si coiciden el correo del susuario

const user = await User.findOne({email})

   if(!user){
    return done(null,false,{message:'usuario no encontrado'});
   }else{
    //validar la contraseña
    const match = await user.matchPassword(password);

    if(match){
        return done(null,user);//termina encontramos al usuario
    }else{
        return done(null,false,{message:'contraseña incorrecta'})
    }
   }
}));
//guardar el la session de nuestro servidor
passport.serializeUser((user,done) =>{
done(null,user.id);//guardar el susuario con id
});
//hacer consulta para saber si id tiene autorizacion
passport.deserializeUser((id,done)=>{
    //comprobar si id tiene permisos y si existe
    User.findById(id,(err,user)=>{
        done(err,user);
    })
});

