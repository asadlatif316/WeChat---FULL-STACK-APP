import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    avatar: String,
    avatarPublicId: String
}, { timeStamp: true })

export default mongoose.Model('User',UserSchema)