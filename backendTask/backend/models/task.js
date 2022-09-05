var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

var task = new Schema(
   
    {
        title:String,
        description:String,
}
   
    );

    module.exports=mongoose.model('Task', task);