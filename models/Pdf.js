import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    link:{type:String, required:true}
})

const Pdf= mongoose.model('pdf',pdfSchema)
export default Pdf;