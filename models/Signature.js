import mongoose from "mongoose";

const signSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId, ref:'User', required:true },
    link:{type:String}
})

const Sign=mongoose.model('sign',signSchema)
export default Sign;