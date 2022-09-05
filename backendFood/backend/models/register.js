var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

var student = new Schema(
   
    {
        name:String,
        address:String,
        email:String,
        password:String
       
}
   
    );

    module.exports=mongoose.model('Student', student);