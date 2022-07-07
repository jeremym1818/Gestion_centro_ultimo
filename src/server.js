//framework del sevidor
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
//inicialisaciones
const app= express();
require('./config/passport');
//configuraciones
app.set('port',process.env.Port || 4000);
app.set('views',path.join(__dirname,'views'));

app.engine('.hbs',exphbs.engine({
    defaultLayout:'main',
    layoutDir: path.join(app.get('views'),'layouts'),
    partialDir : path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))

app.set('view engine','.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
     secret: 'secret',
     resave: true,
     saveUninitialized:true
}));
//configuraciones para que passport funcione
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//variables globales
app.use((req,res,next)=>{
  res.locals.success_msg =  req.flash('success_msg');
  res.locals.error_msg =  req.flash('error_msg');
  res.locals.error =  req.flash('error');
  res.locals.user = req.user || null;//si el usuario ya fue validado
  
next();
});
//Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/adm.routes'));
app.use(require('./routes/rol.routes'));
app.use(require('./routes/est.routes'));
app.use(require('./routes/secret.routes'));
//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));



module.exports = app;