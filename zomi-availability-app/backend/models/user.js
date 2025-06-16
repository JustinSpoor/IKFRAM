import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
    date: {type: String, required: true},
    availability: {type: Boolean, required: true}
})

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    userData: [userDataSchema]
});

const User = mongoose.model('User', userSchema);

export default User;