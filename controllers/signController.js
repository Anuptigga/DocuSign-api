import Sign from '../models/Signature.js'

//Upload
export const uploadSign = async (req,res)=>{
    try {
        const userId = req.currentUser._id
        const link = req.file ? req.file.path : undefined
        const sign = new Sign({
            userId,
            link
        })
        await sign.save()
        res.status(200).json({message:"Signature uploaded successfully", sign})
    } catch (error) {
        res.status(500).json({message:"Error uploading signature", error:error.message})
    }
}

//Get all
export const getAllSign = async (req,res)=>{
    try {
        const userId = req.currentUser._id
        const signs = await Sign.find({userId})
        if(signs.length === 0){
            return res.status(404).json({message:"No signatures found"})
        }
        res.status(200).json({message:"Signatures fetched successfully", signs})
    } catch (error) {
       res.status(500).json({message:"Error fetching signatures", error:error.message})
    }
}

//Get by id
export const getSign = async (req,res)=>{
    try {
       const signId = req.params.id
       const sign = await Sign.findById(signId)
       if(!sign){
        return res.status(404).json({message:"Signature not found"})
       }
         if(sign.userId.toString() !== req.currentUser._id.toString()){
          return res.status(403).json({message:"You are not authorized to access this signature"})
         }
         res.status(200).json({message:"Signature fetched successfully", sign}) 
    } catch (error) {
        res.status(500).json({message:"Error fetching signature", error:error.message})
    }
}

//Delete
export const deleteSign = async (req,res)=>{
    try {
        const signId = req.params.id
        const sign = await Sign.findById(signId)
        if(!sign){
            return res.status(404).json({message:"Signature not found"})
        }
        if(sign.userId.toString() !== req.currentUser._id.toString()){
            return res.status(403).json({message:"You are not authorized to delete this signature"})
        }
        await sign.remove()
        res.status(200).json({message:"Signature deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Error deleting signature", error:error.message})
    }
}