import mongoose from "mongoose";

import { Password } from "../services/password";

//an interface that describe the properties
// that are requried to create a new User

interface UserAttrs {
    email: string;
    password: string;
}
//an interface that describe  the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc;
}

// an interface that describe the properties that a User Document has

interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
}
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{
    //we do not want the password property, _id and __v to show up inside of any JSON representation.
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
}
);

//to hash password.
//middleware function implemented in mongoose 
//any time we attempt to save a document to our database
//we are going to execute this function right here.
userSchema.pre('save', async function(done) {
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export {User};