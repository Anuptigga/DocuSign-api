import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
})

const saltRounds= parseInt(process.env.SALT_ROUNDS);

//hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, saltRounds);
})

//compare password
userSchema.methods.comparePassword = async function (userPassword){
    return await bcrypt.compare(userPassword,this.password)
}

const User = mongoose.model('user',userSchema)
export default User;