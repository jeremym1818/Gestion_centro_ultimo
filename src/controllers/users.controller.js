const { route } = require("../server");
const userCtrl = {};

const passport = require('passport');

const User = require('../models/User');


userCtrl.renderSignUpForm = (req,res) =>{
    res.render('users/signup');
};

userCtrl.signup = async (req,res) =>{
    const errors = [];

    const {name,email,password,confirm_password} = req.body;
    if(password  != confirm_password){
       errors.push({text:'Las contraseñas no coinciden'});
    }

    if(password.length < 4){
        errors.push({text:'passwords must be at least 4 characters'});
    
    }

    if(errors.length > 0 ){
       res.render('users/signup',{
           errors,
           name,
           email,
           password,
           confirm_password
       }) 
    }else{
      const emailUser = await User.findOne({email:email});
           if(emailUser){
            req.flash('error_msg','correo ya en uso');
            res.redirect('/users/signup');
           }else{
            const newUser = new User({name,email,password});
            newUser.password = await newUser.encryptPassword(password);
            newUser.rol = 'administrador'
             await newUser.save()
             req.flash('success_msg','estas Regiatrado')
             res.redirect('/users/signin');
           }
    }
};


//sigin administrador
userCtrl.renderSigninForm = (req,res) =>{
res.render('users/signin');
}

userCtrl.signin = passport.authenticate('local',{
failureRedirect:'/users/signin',
successRedirect:'/user/views',
failureFlash:true

});

userCtrl.logout = (req,res) =>{
    //borramos la secion del servidor
    
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash("success_msg", "Session Cerrada.");
    res.redirect('/users/signin');
  });
}

module.exports = userCtrl;