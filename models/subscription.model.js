import mongoose  from "mongoose";
const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    minLength: [2, 'Subscription name must be at least 3 characters long'],
    maxLength: [100, 'Subscription name must be at most 50 characters long'],
  },
  price: {
    type: Number,
    required: [true, 'Subscription price is required'],
    minLength: [0, 'Subscription price must be at least 1 character long'],
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP', 'NGN'],
    default: 'NGN',
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    
  },
  category: {
    type: String,
    enum: ['sports', 'entertainment', 'education', 'health'],
    required: [true, 'Subscription category is required'],
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled'],
    default: 'active',
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
        validator: (value) => value <= new Date(),
        message: 'Start date must be less than or equal to the current date',
    },
    default: Date.now,
  },
  renewalDate: {
    type: Date,
    required: false,
    validate: {
        validator: (value) => value >= new Date(),
        message: 'Renewal date must be greater than or equal to the current date',
    },
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  }
  
 }, { timestamps: true });

//Autocalculate renewal date if not provided
  subscriptionSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    const renewalperiods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalperiods[this.frequency]);
  }
  if(this.renewalDate < new Date()){
    this.status = 'expired';
  }
  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
  
