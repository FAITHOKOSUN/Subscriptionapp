import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minLength: [3, 'User name must be at least 3 characters long'],
    maxLength: [50, 'User name must be at most 50 characters long'],
  },
  email: { 
    type: String,
    required: [true,'User email is required'],
    trim: true,
    lowercase: true,
    maxLength: [100, 'User email must be at most 100 characters long'],
    minLength: [5, 'User email must be at least 5 characters long'],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
    },
    unique: true,
  },
  password: {
    type: String,
    required:[true, 'User password is required'],
    minLength: [6, 'User password must be at least 6 characters long'],
     
  }
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

export default User;
