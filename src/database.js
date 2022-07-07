const mongoose = require('mongoose')

const {NOTES_APP_MONGODB_HOST,NOTES_APPMONGODB_DATABASE} =  process.env;
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APPMONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology : true,
    useNewUrlParser:true,
    
})

.then(db => console.log('la base de datos esta conectada'))
.catch(err => console.log(err))
