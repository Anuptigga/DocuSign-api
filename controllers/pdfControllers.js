import Pdf from "../models/Pdf.js";

//Upload
export const uploadPdf= async(req,res)=>{
    try {
        
        const userId = req.currentUser._id
        const link = req.file?req.file.path:undefined
        
        const pdf = new Pdf({
            userId,
            link
        })
        await pdf.save()
        res.status(200).json({message:"File uploaded successfully",pdf})
    } catch (error) {
        res.status(500).json({message:"Error uploading file", error:error.message})
    }
}

//Get all
export const getAllPdf = async (req,res)=>{
    try {
        const userId = req.currentUser._id;
        const pdfs= await Pdf.find({userId})
        if(pdfs.length ===0){
            res.status(404).json({message:"No pdfs found"})
        }
        res.status(200).json({message:"Pdfs fetched successfully",pdfs})
    } catch (error) {
        res.status(500).json({message:"Error fetching pdf", error:error.message})
    }
}

//Get by id
export const getPdf = async(req,res)=>{
    try {
        const pdfId = req.params.id
        const pdf = await Pdf.findById(pdfId)
        if(!pdf){
            return res.status(404).json({message:"Pdf not found"})
        }
        if(pdf.userId.toString() !== req.currentUser._id.toString()){
            return res.status(403).json({message:"You are not authorized to access this pdf"})
        }
        res.status(200).json({message:"Pdf fetched successfully",pdf})
    } catch (error) {
        res.status(500).json({message:"Error fetching pdf", error:error.message})
    }
}

//Delete
export const deletePdf = async(req,res)=>{
    try {
        const pdfId = req.params.id
        const pdf = await Pdf.findById(pdfId)
        if(!pdf){
            return res.status(404).json({message:"Pdf not found"})
        }
        if(pdf.userId.toString() !== req.currentUser._id.toString()){
            return res.status(403).json({message:"You are not authorized to delete this pdf"})
        }
        await Pdf.findByIdAndDelete(pdfId)
        res.status(200).json({message:"Pdf deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Error deleting pdf", error:error.message})
    }
}