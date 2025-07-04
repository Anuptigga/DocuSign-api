import mongoose from "mongoose";

const signSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId, ref:'User', required:true },
    link:{type:String, required:true}
})

const Sign=mongoose.model('sign',signSchema)
export default Sign;