var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

var food = new Schema(
   
    {
        foodName:String,
        foodId:String,
}
   
    );

    module.exports=mongoose.model('Food', food);