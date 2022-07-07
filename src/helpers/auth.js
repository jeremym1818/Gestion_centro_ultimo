const helpers = {};

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }//verificar la ssesion del susuario
    req.flash('error_msg','No estas AUtorizado');
    res.redirect('/users/signin');
}

module.exports = helpers;